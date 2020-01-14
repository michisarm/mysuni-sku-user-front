import { LangStrings } from 'shared';
import { computed, decorate, observable } from 'mobx';

export class NumberValue {

  number: string = '';
  values: LangStrings = new LangStrings();

  constructor(numberValueApiModel?: any) {
    if (numberValueApiModel) {
      Object.assign(this, numberValueApiModel);
      this.values = new LangStrings(numberValueApiModel.values);
    }
  }

  @computed
  get value() {
    if (this.values && this.values.langStringMap) {
      return this.values.langStringMap.get(this.values.defaultLanguage) || '';
    }
    return '';
  }
}
decorate(NumberValue, {
  number: observable,
  values: observable,
});
