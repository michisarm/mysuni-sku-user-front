import { decorate, observable } from 'mobx';

export class MenuControlAuthModel {
  useApl: boolean = false;

  constructor(menuControlAuthModel?: MenuControlAuthModel) {
    if (menuControlAuthModel) {
      Object.assign(this, { ...menuControlAuthModel });
    }
  }
}

decorate(MenuControlAuthModel, {
  useApl: observable,
});
