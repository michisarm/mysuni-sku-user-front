import autobind from 'autobind-decorator';
import { action, observable, runInAction } from 'mobx';
import _ from 'lodash';
import MenuControlAuthApi from '../apiclient/MenuControlAuthApi';
import { MenuControlAuthModel } from '../../model/MenuControlAuthModel';

@autobind
export default class MenuControlAuthService {
  //
  static instance: MenuControlAuthService;

  menuControlAuthApi: MenuControlAuthApi;

  @observable
  menuControlAuth: MenuControlAuthModel = new MenuControlAuthModel();

  constructor(menuControlAuthApi: MenuControlAuthApi) {
    //
    this.menuControlAuthApi = menuControlAuthApi;
  }

  @action
  async findMenuControlAuth(companyCode: string | undefined) {
    //
    const menuControlAuth = await this.menuControlAuthApi.findMenuControlAuth(companyCode);

    runInAction(() => {
      this.menuControlAuth = menuControlAuth;
    });
    return menuControlAuth;
  }

  @action
  changeMenuControlAuthProps(name: string, value: string | {} | string[] | undefined) {
    //
    this.menuControlAuth = _.set(this.menuControlAuth, name, value);
  }

}

Object.defineProperty(MenuControlAuthService, 'instance', {
  value: new MenuControlAuthService(MenuControlAuthApi.instance),
  writable: false,
  configurable: false,
});
