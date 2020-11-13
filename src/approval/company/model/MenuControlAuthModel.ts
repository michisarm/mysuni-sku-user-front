import { computed, decorate, observable } from 'mobx';

export class MenuControlAuthModel {
  companyCode: string = '';
  authCode: string = '';
  menuUrl: string = '';
  useYn: string = '';

  constructor(menuControlAuthModel?: MenuControlAuthModel) {
    //super();
    if (menuControlAuthModel) {
      Object.assign(this, { ...menuControlAuthModel });
    }
  }
}

decorate(MenuControlAuthModel, {
  companyCode: observable,
  authCode: observable,
  menuUrl: observable,
  useYn: observable,
});
