import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { UserViewModel } from 'src/viewModel/UserViewModel';
import { isDefaultUser } from 'src/domain/User';
import { UserGender } from 'src/domain/UserGender';
import { RequestStatus } from 'src/providers/RequestStatus';

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css']
})
export class UserRowComponent implements OnInit, OnDestroy {
  @Input() user!: UserViewModel;

  @Input() onChangedRequestStatus!: Observable<RequestStatus>;
  @Input() onUpdatedSuccess!: Observable<string>;
  @Input() onCreatedSuccess!: Observable<string>;

  @Output() create = new EventEmitter<UserViewModel>();
  @Output() update = new EventEmitter<UserViewModel>();
  @Output() delete = new EventEmitter<string>();

  genderOptions: UserGender[] = [];
  isLoading: boolean = false;

  private onChangedRequestStatusSubscription!: Subscription;
  private onUpdatedSubscription!: Subscription;
  private onCreatedSubscription!: Subscription;

  ngOnInit(): void {
    this.onChangedRequestStatusSubscription = this.onChangedRequestStatus.subscribe(
      (status: RequestStatus) => {
        this.isLoading = (status === 'loading');
      }
    );
    this.onUpdatedSubscription = this.onUpdatedSuccess.subscribe(
      (userId) => this.toggleEditedStatus(userId)
    );
    this.onCreatedSubscription = this.onCreatedSuccess.subscribe(
      (userId) => this.toggleEditedStatus(userId)
    );

    this.genderOptions = Object.values(UserGender);
  }

  ngOnDestroy(): void {
    this.onUpdatedSubscription.unsubscribe();
    this.onCreatedSubscription.unsubscribe();
  }

  onEdit() {
    this.user.isEdited = true;
  }

  onDelete() {
    this.delete.emit(this.user._id)
  }

  onSubmit(profile: NgForm) {
    if (!profile.valid) {
      return;
    }

    if (isDefaultUser(this.user._id)) {
      this.create.emit({...this.user});
      return;
    }

    this.update.emit({...this.user})
  }

  onChangeGender(value: UserGender) {
    this.user.gender = value;
  }

  private toggleEditedStatus(userId: string) {
    if (this.user._id === userId) {
      this.user.isEdited = !this.user.isEdited;
    }
  }
}
