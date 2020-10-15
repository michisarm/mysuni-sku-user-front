import { decorate, observable } from 'mobx';

export class CreatorModel {
  name: string = '';
  email: string = '';
  company: string = '';
  createType: string = '';
  department: string = '';
  companyCode: string = '';

  constructor(creator?: CreatorModel) {
    if (creator) {
      Object.assign(this, { ...creator });
    }
  }
}

decorate(CreatorModel, {
  name: observable,
  email: observable,
  company: observable,
  createType: observable,
  department: observable,
  companyCode: observable,
});

