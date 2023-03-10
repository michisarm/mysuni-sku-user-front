import { axiosApi as axios } from '@nara.platform/accent';
import { OfficeWebFlowCdoModel } from '../../model/OfficeWebFlowCdoModel';
import { OfficeWebFlowUdoModel } from '../../model/OfficeWebFlowUdoModel';
import { OfficeWebFlowUserCdoModel } from '../../model/OfficeWebFlowUserCdoModel';
import { OfficeWebFlowUserUdoModel } from '../../model/OfficeWebFlowUserUdoModel';

export default class OfficeWebFlowApi {

  URL = '/api/personalCube/officewebs/flow';

  static instance: OfficeWebFlowApi;

  makeOfficeWeb(officeWeb: OfficeWebFlowCdoModel) {
    //
    return axios.post<string>(this.URL, officeWeb)
      .then(response => response && response.data || null);
  }

  makeOfficeWebByUser(officeWeb: OfficeWebFlowUserCdoModel) {
    //
    return axios.post<string>(this.URL + '/byUser', officeWeb)
      .then(response => response && response.data || null);
  }

  modifyOfficeWebByUser(personalCubeId: string, officeWebFlowUserUdoModel: OfficeWebFlowUserUdoModel) {
    //
    return axios.put<void>(this.URL + `/byUser/${personalCubeId}`, officeWebFlowUserUdoModel);
  }

  modifyOfficeWeb(personalCubeId: string, officeWebFlowUdoModel: OfficeWebFlowUdoModel) {
    //
    return axios.put<void>(this.URL + `/${personalCubeId}`, officeWebFlowUdoModel);
  }

  removeOfficeWeb(personalCubeId: string) {
    //
    return axios.delete(this.URL + `/${personalCubeId}`);
  }

}

Object.defineProperty(OfficeWebFlowApi, 'instance', {
  value: new OfficeWebFlowApi(),
  writable: false,
  configurable: false,
});
