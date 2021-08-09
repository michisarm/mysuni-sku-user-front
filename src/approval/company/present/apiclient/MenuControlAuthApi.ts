import { axiosApi as axios } from '@nara.platform/accent';
import { MenuControlAuthModel } from '../../model/MenuControlAuthModel';

export default class MenuControlAuthApi {
  //
  rootURL = '/api/user/userWorkspaces';

  static instance: MenuControlAuthApi;

  findMenuControlAuth() {
    return axios
      .get<MenuControlAuthModel>(this.rootURL + `/my`)
      .then(
        (response) =>
          (response &&
            response.data &&
            new MenuControlAuthModel(response.data)) ||
          new MenuControlAuthModel()
      );
  }
}

Object.defineProperty(MenuControlAuthApi, 'instance', {
  value: new MenuControlAuthApi(),
  writable: false,
  configurable: false,
});
