import { IdName, IdNameList as AccentIdNameList } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';

export class IdNameList implements AccentIdNameList {
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
