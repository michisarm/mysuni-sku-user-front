import { computed, decorate, observable } from 'mobx';
import { MenuControlAuth } from '../../../shared/model/MenuControlAuth';

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

  hasMenuAuth(): boolean {
    return (
      this.companyCode === '' ||
      (this.authCode === MenuControlAuth.User
        && this.useYn === MenuControlAuth.Yes)
    ) ? true : false;
  }
}

decorate(MenuControlAuthModel, {
  companyCode: observable,
  authCode: observable,
  menuUrl: observable,
  useYn: observable,
});
