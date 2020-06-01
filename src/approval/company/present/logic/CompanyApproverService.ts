import autobind from 'autobind-decorator';
import { action, observable, runInAction } from 'mobx';
import CompanyApproverApi from '../apiclient/CompanyApproverApi';
import { CompanyApproverModel } from '../../model/CompanyApproverModel';
import { ApprovalMemberModel } from '../../../member/model/ApprovalMemberModel';

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

  @action
  changeCompanyApproverProps(approver: ApprovalMemberModel) {
    //
    const newCompanyApprover: CompanyApproverModel = new CompanyApproverModel();
    Object.assign(newCompanyApprover, approver);
    this.companyApprover = newCompanyApprover;
  }

}

Object.defineProperty(CompanyApproverService, 'instance', {
  value: new CompanyApproverService(CompanyApproverApi.instance),
  writable: false,
  configurable: false,
});
