import { decorate, observable } from 'mobx';
import { IdNameList as AccentIdNameList } from '@nara.platform/accent';
import IdName from './IdName';


class IdNameList implements AccentIdNameList {
  //
  idNames: IdName[] = [];

  constructor(idNameList?: IdNameList) {
    if (idNameList) {
      const idNames = idNameList.idNames && idNameList.idNames.map(idName => new IdName(idName)) || this.idNames;
      Object.assign(this, { ...idNameList, idNames });
    }
  }
}

decorate(IdNameList, {
  idNames: observable,
});

export default IdNameList;
