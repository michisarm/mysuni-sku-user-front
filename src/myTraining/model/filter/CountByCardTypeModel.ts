import { decorate, observable } from 'mobx';
import { CardTypeInFilter } from './CardTypeInFilter';

export class CountByCardTypeModel {
  //
  cardType: CardTypeInFilter = CardTypeInFilter.None;
  count: number = 0;

  constructor(model?: CountByCardTypeModel) {
    //
    if (model) {
      Object.assign(this, { ...model });
    }
  }
}

decorate(CountByCardTypeModel, {
  cardType: observable,
  count: observable,
});
