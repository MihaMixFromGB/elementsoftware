import { Provider } from './Provider';
import { User } from '../domain/User';

export class CrudCrud implements Provider {
  private static URL = 'https://crudcrud.com/api/c7df8758a0cc42bbab2f12188c40940a/user';

  public async getUsers() {
    return fetch(CrudCrud.URL)
      .then<User[]>(res => res.json())
      .catch(err => {
        CrudCrud.logger('crudcrud, getUsers()', err.message);

        const users: User[] = [];
        return users;
      })
  }

  public async getUser(id: string) {
    return fetch(CrudCrud.URL + `/${id}`)
      .then<User>(res => res.json())
      .catch(err => {
        CrudCrud.logger('crudcrud, getUserById()', err.message);
        return null;
      })
  }

  public async createUser(user: User) {
    return fetch(CrudCrud.URL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: CrudCrud.getUserJSONStr(user)
    })
    .then<User>(res => res.json())
    .catch(err => {
      CrudCrud.logger('crudcrud, createUser()', err.message);
      return null;
    })
  }

  public async updateUser(user: User) {
    return fetch(CrudCrud.URL + `/${user._id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: CrudCrud.getUserJSONStr(user)
    })
    .then(res => {
      if (!res.ok) {
        CrudCrud.logger('crudcrud, updateUser()', res.statusText);
      }
      return res.ok;
    })
    .catch(err => {
      CrudCrud.logger('crudcrud, updateUser()', err.message);
      return false;
    })
  }

  public async deleteUser(id: string) {
    return fetch(CrudCrud.URL + `/${id}`, {
      method: 'DELETE'
    })
    .then(res => {
      if (!res.ok) {
        CrudCrud.logger('crudcrud, deleteUser()', res.statusText);
      }
      return res.ok;
    })
    .catch(err => {
      CrudCrud.logger('crudcrud, deleteUser()', err.message);
      return false;
    })
  }

  private static getUserJSONStr(user: User): string {
    return JSON.stringify({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      age: user.age,
      gender: user.gender
    });
  }

  private static logger(source: string, message: string) {
    console.log(`${source}: ${message}`)
  }
}
