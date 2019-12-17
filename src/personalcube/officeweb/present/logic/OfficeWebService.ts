import { observable, action, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
import OfficeApi from '../apiclient/OfficeApi';
import OfficeWebFlowApi from '../apiclient/OfficeWebFlowApi';
import { OfficeWebModel } from '../../model/OfficeWebModel';


@autobind
export default class OfficeWebService {
  //
  static instance: OfficeWebService;

  officeApi: OfficeApi;
  officeWebFlowApi: OfficeWebFlowApi;

  @observable
  officeWeb: OfficeWebModel = new OfficeWebModel();

  constructor(officeApi: OfficeApi, officeWebFlowApi: OfficeWebFlowApi) {
    this.officeApi = officeApi;
    this.officeWebFlowApi = officeWebFlowApi;
  }

  @action
  async findOfficeWeb(officeWebId: string) {
    const officeWeb = await this.officeApi.findOfficeWeb(officeWebId);
    runInAction(() => this.officeWeb = new OfficeWebModel(officeWeb));
  }

  @action
  clearOfficeWeb() {
    this.officeWeb = new OfficeWebModel();
  }
}

Object.defineProperty(OfficeWebService, 'instance', {
  value: new OfficeWebService(OfficeApi.instance, OfficeWebFlowApi.instance),
  writable: false,
  configurable: false,
});
