import { UserGender } from './UserGender';

export interface User {
  _id: string
  firstname: string
  lastname: string
  email: string
  age: number
  gender: UserGender
}

export function getDefaultId(): string {
  return 'tempId_' + Math.random();
}

export function isDefaultUser(userId: string): boolean {
  return userId.startsWith('tempId_');
}
