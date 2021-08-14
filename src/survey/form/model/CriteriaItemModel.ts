import { computed, decorate, observable } from 'mobx';
import LangStrings from '../../../lecture/detail/model/LangStrings';

export class CriteriaItemModel {
  index: number = 0;
  names: LangStrings | null = null;
  value: number | undefined = undefined;

  constructor(criteriaItem?: CriteriaItemModel) {
    //
    if (criteriaItem) {
      const names = criteriaItem.names;
      Object.assign(this, { ...criteriaItem, names });
    }
  }
}

decorate(CriteriaItemModel, {
  index: observable,
  names: observable,
  value: observable,
});
