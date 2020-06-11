import { axiosApi as axios } from '@nara.platform/accent';
import { OfficeWebModel } from '../../model/OfficeWebModel';

export default class OfficeApi {

  // URL = '/api/personalCube/officewebs';

  serverUrl = '/api/personalCube/officewebs';
  devUrl = process.env.REACT_APP_DEV_PERSONAL_CUBE_API  === undefined || process.env.REACT_APP_DEV_PERSONAL_CUBE_API  === '' ?
    this.serverUrl : process.env.REACT_APP_DEV_PERSONAL_CUBE_API ;

  URL = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ?
    this.serverUrl : this.devUrl + '/officewebs';

  static instance: OfficeApi;

  findOfficeWeb(officeWebId: string) {
    //
    return axios.get<OfficeWebModel>(this.URL + `/${officeWebId}`)
      .then(response => response && response.data && new OfficeWebModel(response.data) || null);
  }
}

Object.defineProperty(OfficeApi, 'instance', {
  value: new OfficeApi(),
  writable: false,
  configurable: false,
});
