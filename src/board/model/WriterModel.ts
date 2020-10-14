
import { decorate, observable } from 'mobx';


class WriterModel {
  //
  employeeId: string = 'Admin';
  email: string = 'aa@mail.com';
  name: string = 'Roy';
  companyCode: string = '';
  companyName: string = '';

  constructor(writer?: WriterModel) {
    //
    Object.assign(this, { ...writer });
  }
}

decorate(WriterModel, {
  employeeId: observable,
  email: observable,
  name: observable,
  companyCode: observable,
  companyName: observable
});

export default WriterModel;
