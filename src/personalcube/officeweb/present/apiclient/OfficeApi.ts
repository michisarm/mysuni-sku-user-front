import { axiosApi as axios } from '@nara.platform/accent';
import { OfficeWebModel } from '../../model/OfficeWebModel';

export default class OfficeApi {

  URL = '/api/personalCube/officewebs';

  static instance: OfficeApi;

  findOfficeWeb(officeWebId: string) {
    //
    return axios.get<OfficeWebModel>(this.URL + `/${officeWebId}`)
      .then(response => response && response.data || null);
  }
}

Object.defineProperty(OfficeApi, 'instance', {
  value: new OfficeApi(),
  writable: false,
  configurable: false,
});
