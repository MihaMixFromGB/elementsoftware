import { Provider } from './Provider';
import { User, isDefaultUser } from '../domain/User';
import { UserGender } from 'src/domain/UserGender';

export class CrudCrudTest implements Provider {
  private initialState: User[] = [
    {
      _id: '1',
      firstname: 'Homer',
      lastname: 'Simpson',
      email: 'homer.s@gmail.com',
      age: 52,
      gender: UserGender.male
    },
    {
      _id: '2',
      firstname: 'Marge',
      lastname: 'Simpson',
      email: 'marge.s@gmail.com',
      age: 50,
      gender: UserGender.female
    }
  ]

  public async getUsers() {
    await this.sleep(1000);
    return Promise.resolve([...this.initialState])
  }

  public async getUser(id: string) {
    await this.sleep(1000);
    const user = this.initialState.find(user => user._id === id)
    if (user) {
      return {...user};
    }

    return null;
  }

  public async createUser(user: User) {
    await this.sleep(1000);
    if (isDefaultUser(user._id)) {
      user._id = Math.random().toString();
    }
    this.initialState.push({...user})

    return {...user}
  }

  public async updateUser(user: User) {
    await this.sleep(1000);
    const currentUser = this.initialState.find(
      item => item._id === user._id
    );
    if (!currentUser) {
      return false;
    }
    this.initialState = [
      ...this.initialState,
      {...user}
    ]

    return true
  }

  public async deleteUser(id: string) {
    await this.sleep(1000);
    this.initialState = this.initialState.filter(user => user._id !== id)
    return true
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
