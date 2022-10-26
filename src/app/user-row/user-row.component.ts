import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { User, UserGender } from '../../domain/User'

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css']
})
export class UserRowComponent implements OnInit, OnDestroy {
  @Input() user!: User;
  @Input() onUpdatedSuccess!: Observable<void>;
  @Input() onCreatedBegin!: Observable<void>;
  @Input() onCreatedSuccess!: Observable<void>;

  @Output() create = new EventEmitter<User>();
  @Output() update = new EventEmitter<User>();
  @Output() delete = new EventEmitter<string>();

  isReadOnly: boolean = true;

  private onUpdatedSubscription!: Subscription;
  private onCreatedBeginSubscription!: Subscription;
  private onCreatedSubscription!: Subscription;

  ngOnInit() {
    this.onUpdatedSubscription = this.onUpdatedSuccess.subscribe(
      () => this.isReadOnly = true
    );
    this.onCreatedBeginSubscription = this.onCreatedBegin.subscribe(
      () => {
        if (this.user._id === '') {
          this.isReadOnly = false
        }
      }
    );
    this.onCreatedSubscription = this.onCreatedSuccess.subscribe(
      () => this.isReadOnly = true
    );
  }

  ngOnDestroy() {
    this.onUpdatedSubscription.unsubscribe();
    this.onCreatedBeginSubscription.unsubscribe();
    this.onCreatedSubscription.unsubscribe();
  }

  changeGender(value: string) {
    switch (value) {
      case UserGender.male:
        this.user.gender = UserGender.male;
        break;
      case UserGender.female:
        this.user.gender = UserGender.female;
        break;
      default:
        this.user.gender = UserGender.unknown;
      }
  }

  editUser() {
    this.isReadOnly = false;
  }

  saveUser() {
    if (this.user._id === '') {
      this.create.emit({...this.user});
      return;
    }

    this.update.emit({...this.user})
  }

  deleteUser() {
    this.delete.emit(this.user._id)
  }
}
