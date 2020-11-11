import { axiosApi as axios } from '@nara.platform/accent';
import {MenuControlAuthModel} from '../../model/MenuControlAuthModel';

export default class MenuControlAuthApi {
  //
    rootURL = '/api/approval/menuControlAuth';

  static instance: MenuControlAuthApi;

  findMenuControlAuth(companyCode: string | undefined) {
    return axios.get<MenuControlAuthModel>(this.rootURL+`/${companyCode}`)
      .then((response) => response && response.data && new MenuControlAuthModel(response.data) || new MenuControlAuthModel());
  }
}

Object.defineProperty(MenuControlAuthApi, 'instance', {
  value: new MenuControlAuthApi(),
  writable: false,
  configurable: false,
});
