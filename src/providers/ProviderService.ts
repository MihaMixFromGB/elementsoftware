import { Injectable } from '@angular/core';

import { Provider } from './Provider'
import { CrudCrud } from './CrudCrud';
// import { CrudCrudTest } from './CrudCrudTest';

@Injectable()
export class ProviderService {
  getProvider(): Provider {
    return new CrudCrud();
    // return new CrudCrudTest();
  }
}
