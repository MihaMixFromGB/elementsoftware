import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { UserViewModel } from 'src/viewModel/UserViewModel';
import { getDefaultId, isDefaultUser } from 'src/domain/User';
import { UserGender } from 'src/domain/UserGender';

import { Provider } from 'src/providers/Provider';
import { ProviderService } from 'src/providers/ProviderService';
import { RequestStatus } from 'src/providers/RequestStatus';

interface Message {
  type: 'success' | 'error',
  text: string
}

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
  providers: [ProviderService]
})
export class UsersTableComponent implements OnInit {
  private provider: Provider;

  users: UserViewModel[] = [];
  serviceMessage: Message | null = null;
  status: RequestStatus = 'idle';

  onChangedRequestStatus: Subject<RequestStatus> = new Subject<RequestStatus>();
  onUpdatedSuccess: Subject<string> = new Subject<string>();
  onCreatedSuccess: Subject<string> = new Subject<string>();

  constructor(private providerService: ProviderService) {
    this.provider =providerService.getProvider();
  }

  ngOnInit(): void {
    this.status = 'loading';
    this.provider.getUsers()
      .then(users => {
        this.status = 'succeeded';
        if (users) {
          this.users = users.map(user => {
            const userVM: UserViewModel = {
              ...user,
              isEdited: false
            }
            return userVM;
          })
        }
      });
  }

  addUser() {
    this.users.push(this.getDefaultUser());
  }

  onCreated(user: UserViewModel) {
    const tempId = user._id;
    this.changeStatus('loading');
    this.provider.createUser(user)
      .then((newUser) => {
        if (newUser) {
          console.log('tempId: ', tempId);
          const userWithTempId = this.users.find(user => user._id === tempId);
          if (userWithTempId) {
            userWithTempId._id = newUser._id
          }
          this.changeStatus('succeeded');
          this.onCreatedSuccess.next(newUser._id);
          this.setServiceMessage({
            type: 'success',
            text: 'A new User Profile has been successfully created!'
          })
          return;
        }

        this.changeStatus('failed');
        this.setServiceMessage({
          type: 'error',
          text: 'Receiving Error when Creating a User Profile!'
        })
      })
  }

  onUpdated(user: UserViewModel) {
    this.changeStatus('loading');
    this.provider.updateUser(user)
      .then(async (res) => {
        if (res) {
          this.changeStatus('succeeded');
          this.onUpdatedSuccess.next(user._id);
          return;
        }

        this.changeStatus('failed');
        this.serviceMessage = {
          type: 'error',
          text: 'Receiving Error when Updating a User Profile!'
        }
    })
  }

  async onDeleted(userId: string) {
    if (isDefaultUser(userId)) {
      this.users = this.users.filter(user => user._id !== userId);
      return;
    }

    this.changeStatus('loading');
    this.provider.deleteUser(userId)
      .then(async (res) => {
        if (res) {
          this.changeStatus('succeeded');
          this.users = this.users.filter(user => user._id !== userId);
          return;
        }

        this.changeStatus('failed');
        this.serviceMessage = {
          type: 'error',
          text: 'Receiving Error when Deleting a User Profile!'
        }
    })
  }

  private getDefaultUser(): UserViewModel {
    const userVM: UserViewModel = {
      _id: getDefaultId(),
      firstname: '',
      lastname: '',
      email: '',
      age: 0,
      gender: UserGender.unknown,
      isEdited: true
    };
    return userVM;
  }

  private changeStatus(status: RequestStatus) {
    this.status = status;
    this.onChangedRequestStatus.next(status);
  }

  private setServiceMessage(message: Message) {
    this.serviceMessage = message;
    setTimeout(() => {
      this.serviceMessage = null;
    }, 5000)
  }
}
