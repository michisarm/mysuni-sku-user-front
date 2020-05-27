import { IdName as AccentIdName } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';

export class IdNameApproval implements AccentIdName {
  //
  id: string = '';
  name: string = '';

  constructor(idNameApproval?: IdNameApproval) {
    if ( idNameApproval ) {
      Object.assign(this, idNameApproval);
    }
  }
}

decorate(IdNameApproval, {
  id: observable,
  name: observable,
});
