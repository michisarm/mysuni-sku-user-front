import { LangStrings } from 'shared';

export class NumberValue {

  number: string = '';
  values: LangStrings = new LangStrings();

  constructor(numberValueApiModel?: any) {
    if (numberValueApiModel) {
      Object.assign(this, numberValueApiModel);
      this.values = new LangStrings(numberValueApiModel.values);
    }
  }

}
