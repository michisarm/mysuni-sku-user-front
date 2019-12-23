import { axiosApi as axios } from '@nara.platform/accent';
import { OfficeWebFlowCdoModel } from '../../model/OfficeWebFlowCdoModel';
import { OfficeWebFlowUdoModel } from '../../model/OfficeWebFlowUdoModel';

export default class OfficeWebFlowApi {

  URL = '/api/personalCube/officeweb/flow';

  static instance: OfficeWebFlowApi;

  makeOfficeWeb(officeWeb: OfficeWebFlowCdoModel) {
    //
    return axios.post<string>(this.URL, officeWeb)
      .then(response => response && response.data || null);
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
