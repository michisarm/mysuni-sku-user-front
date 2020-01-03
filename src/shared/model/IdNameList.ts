import { decorate, observable } from 'mobx';
import { IdNameList as AccentIdNameList } from '@nara.platform/accent';
import IdName from './IdName';


class IdNameList implements AccentIdNameList {
  //
  idNames: IdName[] = [];

  constructor(idNameList?: IdNameList) {
    if (idNameList) {
      Object.assign(this);
    }
  }
}

decorate(IdNameList, {
  idNames: observable,
});

export default IdNameList;
