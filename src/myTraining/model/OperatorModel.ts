import { decorate, observable } from 'mobx';

export class OperatorModel {
  //
  employeeId: string = '';
  email: string = '';
  name: string = '';
  company: string = '';

  constructor(operator?: OperatorModel) {
    if (operator) {
      Object.assign(this, operator);
    }
  }
}

decorate(OperatorModel, {
  employeeId: observable,
  email: observable,
  name: observable,
  company: observable,
});

