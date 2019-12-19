
// import { axiosApi as axios } from '@nara.platform/accent';

export default class OfficeWebFlowApi {

  URL = '/api/personalCube/officeweb/flow';

  static instance: OfficeWebFlowApi;

}

Object.defineProperty(OfficeWebFlowApi, 'instance', {
  value: new OfficeWebFlowApi(),
  writable: false,
  configurable: false,
});
