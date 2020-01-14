import { decorate, observable } from 'mobx';
import { CriteriaItemModel } from './CriteriaItemModel';

export class CriterionModel {
  number: string = '';
  criteriaItems: CriteriaItemModel[] = [];

  constructor(criterion?: CriterionModel) {
    //
    if (criterion) {
      Object.assign(this, { ...criterion });
    }
  }
}

decorate(CriterionModel, {
  number: observable,
  criteriaItems: observable,
});
