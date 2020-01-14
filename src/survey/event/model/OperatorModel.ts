import { LangStrings } from 'shared';

export default class OperatorModel {

  names: LangStrings = new LangStrings();
  company: string = '';
  email: string = '';

  constructor(operator?: any) {
    if (operator) {
      Object.assign(this, operator);
      this.names = operator.names && new LangStrings(operator.names) || this.names;
    }
  }
}
