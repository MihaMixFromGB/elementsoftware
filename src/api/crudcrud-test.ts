import { User } from '../domain/User.js'

let initialState: User[] = [
  {
    _id: '1',
    firstname: 'Homer',
    lastname: 'Simpson',
    email: 'homer.s@gmail.com',
    age: 52,
    gender: 'male'
  },
  {
    _id: '2',
    firstname: 'Marge',
    lastname: 'Simpson',
    email: 'marge.s@gmail.com',
    age: 50,
    gender: 'female'
  }
]

export async function getUsers() {
  return Promise.resolve(initialState)
}

export async function getUserById(id: string) {
  return initialState.find(user => user._id === id)
}

export async function createUser(user: User) {
  // initialState is updating automatically while ADD button's been clicked
  const newUser = initialState.find(item => item._id === '');
  if (newUser) {
    newUser._id = Math.random().toString();
  }

  return {...user}
}

export async function updateUser(user: User) {
  const currentUser = initialState.find(
    item => item._id === user._id
  );
  if (!currentUser) {
    return false;
  }
  initialState = [
    ...initialState,
    {...user}
  ]

  return true
}

export async function deleteUser(id: string) {
  initialState = initialState.filter(user => user._id !== id)
  return true
}
