import { IdName as AccentIdName } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';

class IdNameApproval implements AccentIdName {
  //
  id: string = '';
  name: string = '';
  
  constructor(idNameApproval?: IdNameApproval) {
    if ( idNameApproval ) {
      Object.assign(this, idNameApproval);
    }
  }

  static new(id: string, name: string) {
    return new IdNameApproval({ id, name});
  }
}

decorate(IdNameApproval, {
  id: observable,
  name: observable,
});

export default IdNameApproval;
