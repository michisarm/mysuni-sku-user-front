import { axiosApi as axios } from '@nara.platform/accent';

export default class OfficeWebFlowApi {
  URL = '/api/personalCube/officeWeb/flow';

  static instance: OfficeWebFlowApi;

}

Object.defineProperty(OfficeWebFlowApi, 'instance', {
  value: new OfficeWebFlowApi(),
  writable: false,
  configurable: false,
});
