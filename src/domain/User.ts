export interface User {
  _id: string
  firstname: string
  lastname: string
  email: string
  age: number
  gender: 'male' | 'female' | 'unknown'
}

export enum UserGender {
  male = 'male',
  female = 'female',
  unknown = 'unknown'
}
