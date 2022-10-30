import { User } from '../domain/User';

export interface UserViewModel extends User {
  isEdited: boolean
}
