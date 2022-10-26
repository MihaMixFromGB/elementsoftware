import { User } from '../domain/User.js'

const URL = 'https://crudcrud.com/api/67499c12dfed450486d54e4b23c1c8f0/user'

export async function getUsers() {
  return fetch(URL)
    .then<User[]>(res => res.json())
    .catch(err => {
      logger('crudcrud, getUsers()', err.message)
    })
}

export async function getUserById(id: string) {
  return fetch(URL + `/${id}`)
    .then<User>(res => res.json())
    .catch(err => {
      logger('crudcrud, getUserById()', err.message)
    })
}

export async function createUser(user: User) {
  return fetch(URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: getUserJSONStr(user)
  })
  .then<User>(res => res.json())
  .catch(err => {
    logger('crudcrud, createUser()', err.message)
  })
}

export async function updateUser(user: User) {
  return fetch(URL + `/${user._id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: getUserJSONStr(user)
  })
  .then(res => {
    if (!res.ok) {
      logger('crudcrud, updateUser()', res.statusText);
    }
    return res.ok;
  })
  .catch(err => {
    logger('crudcrud, updateUser()', err.message)
  })
}

export async function deleteUser(id: string) {
  return fetch(URL + `/${id}`, {
    method: 'DELETE'
  })
  .then(res => {
    if (!res.ok) {
      logger('crudcrud, deleteUser()', res.statusText);
    }
    return res.ok;
  })
  .catch(err => {
    logger('crudcrud, deleteUser()', err.message)
  })
}

function getUserJSONStr(user: User): string {
  return JSON.stringify({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    age: user.age,
    gender: user.gender
  });
}

function logger(source: string, message: string) {
  console.log(`${source}: ${message}`)
}
