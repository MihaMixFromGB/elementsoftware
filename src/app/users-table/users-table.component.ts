import { Component, OnInit } from '@angular/core';
import { filter, Subject } from 'rxjs';

import { User } from '../../domain/User';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from '../../api/crudcrud';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  users: User[] = [];

  onUpdatedSuccess: Subject<void> = new Subject<void>();
  onCreatedBegin: Subject<void> = new Subject<void>();
  onCreatedSuccess: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    getUsers()
      .then(users => {
        if (users) {
          this.users = users
        }
      });
  }

  addUser() {
    this.users.push({
      _id: '',
      firstname: 'FirstName',
      lastname: 'LastName',
      email: 'email',
      age: 30,
      gender: 'male'
    })

    setTimeout(() => { this.onCreatedBegin.next() }, 500);
    // this.onCreatedBegin.next()
  }

  onCreated(user: User) {
    createUser(user)
      .then((newUser) => {
        if (newUser) {
          const userWithoutId = this.users.find(user => user._id === '');
          if (userWithoutId) {
            userWithoutId._id = newUser._id
          }
          this.onCreatedSuccess.next();
          alert('A new User Profile has been successfully created !');
          return;
        }

        alert('Receiving Error when Creating a User Profile!');
      })
  }

  onUpdated(user: User) {
    updateUser(user)
      .then(async (res) => {
        if (res) {
          this.onUpdatedSuccess.next();
          return;
        }

        alert('Receiving Error when Updating a User Profile!');
    })
  }

  async onDeleted(userId: string) {
    if (userId === '') {
      this.users = this.users.filter(user => user._id !== '');
      return;
    }

    deleteUser(userId)
      .then(async (res) => {
        if (res) {
          this.users = this.users.filter(user => user._id !== userId);
          return;
        }

      alert('Receiving Error when Deleting a User Profile!');
    })
  }
}
