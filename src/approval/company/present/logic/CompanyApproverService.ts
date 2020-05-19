import autobind from 'autobind-decorator';
import { action, observable, runInAction } from 'mobx';
import CompanyApproverApi from '../apiclient/CompanyApproverApi';
import { CompanyApproverModel } from '../../model/CompanyApproverModel';

@autobind
export default class CompanyApproverService {
  //
  static instance: CompanyApproverService;

  companyApproverApi: CompanyApproverApi;

  @observable
  companyApprover: CompanyApproverModel = new CompanyApproverModel();

  constructor(companyApproverApi: CompanyApproverApi) {
    //
    this.companyApproverApi = companyApproverApi;
  }

  @action
  async findCompanyApprover() {
    //
    const companyApprover = await this.companyApproverApi.findCompanyApprover();

    runInAction(() => this.companyApprover = companyApprover);
    return companyApprover;
  }

}

Object.defineProperty(CompanyApproverService, 'instance', {
  value: new CompanyApproverService(CompanyApproverApi.instance),
  writable: false,
  configurable: false,
});
