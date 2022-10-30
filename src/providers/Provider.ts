import { User } from '../domain/User';

export interface Provider {
  getUsers(): Promise<User[]>
  getUser(userId: string): Promise<User | null>
  createUser(user: User): Promise<User | null>
  updateUser(user: User): Promise<boolean>
  deleteUser(userId: string): Promise<boolean>
}
