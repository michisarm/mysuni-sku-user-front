
import { decorate, observable } from 'mobx';
import IdName from './IdName';

class IdNameCount extends IdName {
  //
  count: number = 0;

  constructor(idNameCount?: IdNameCount) {
    //
    super();

    if (idNameCount) {
      Object.assign(this, idNameCount);
    }
  }
}

decorate(IdNameCount, {
  count: observable,
});

export default IdNameCount;
