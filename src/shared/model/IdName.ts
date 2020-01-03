import { IdName as AccentIdName } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';

class IdName implements AccentIdName {
  //
  id: string = '';
  name: string = '';
  active: boolean = false;

  constructor(idName?: IdName) {
    if ( idName ) {
      Object.assign(this, idName);
    }
  }

  static new(id: string, name: string) {
    return new IdName({ id, name, active: false });
  }
}

decorate(IdName, {
  id: observable,
  name: observable,
  active: observable,
});

export default IdName;
