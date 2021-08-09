import { decorate, observable } from 'mobx';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';

class IdPolyglotString {
  //
  id: string = '';
  name: PolyglotString | null = null;
  active?: boolean = false;

  constructor(idName?: IdPolyglotString) {
    if (idName) {
      Object.assign(this, idName);
    }
  }

  static new(id: string, name: PolyglotString) {
    return new IdPolyglotString({ id, name, active: false });
  }
}

decorate(IdPolyglotString, {
  id: observable,
  name: observable,
  active: observable,
});

export default IdPolyglotString;
