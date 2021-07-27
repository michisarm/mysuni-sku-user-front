import { decorate, observable } from 'mobx';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';

class WriterModel {
  //
  employeeId: string = 'Admin';
  email: string = 'aa@mail.com';
  name: PolyglotString | null = null;
  companyCode: string = '';
  companyName: PolyglotString | null = null;

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
  companyName: observable,
});

export default WriterModel;
