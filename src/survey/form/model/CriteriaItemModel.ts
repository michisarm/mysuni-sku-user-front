import { decorate, observable } from 'mobx';
import { LangStrings } from '../../../shared/model/LangStrings';

export class CriteriaItemModel {
  index: number = 0;
  names: LangStrings = new LangStrings();
  value: number = 0;

  constructor(criteriaItem?: CriteriaItemModel) {
    //
    if (criteriaItem) {
      const names = criteriaItem.names && new LangStrings(criteriaItem.names) || this.names;
      Object.assign(this, { ...criteriaItem, names });
    }
  }
}

decorate(CriteriaItemModel, {
  index: observable,
  names: observable,
  value: observable,
});
