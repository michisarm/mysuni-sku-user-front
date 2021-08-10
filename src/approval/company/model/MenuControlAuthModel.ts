import { computed, decorate, observable } from 'mobx';
import { MenuControlAuth } from '../../../shared/model/MenuControlAuth';

export class MenuControlAuthModel {
  useApl: boolean = false;

  constructor(menuControlAuthModel?: MenuControlAuthModel) {
    //super();
    if (menuControlAuthModel) {
      Object.assign(this, { ...menuControlAuthModel });
    }
  }
}

decorate(MenuControlAuthModel, {
  useApl: observable,
});
