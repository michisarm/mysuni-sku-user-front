import { decorate, observable } from 'mobx';
import { CriteriaItemModel } from './CriteriaItemModel';

export class CriterionModel {
  number: string = '';
  criteriaItems: CriteriaItemModel[] = [];

  constructor(criterion?: CriterionModel) {
    //
    if (criterion) {
      Object.assign(this, { ...criterion });
      this.criteriaItems =
        (criterion.criteriaItems &&
          criterion.criteriaItems.length &&
          criterion.criteriaItems.map(item => new CriteriaItemModel(item))) ||
        this.criteriaItems;
    }
  }
}

decorate(CriterionModel, {
  number: observable,
  criteriaItems: observable,
});
