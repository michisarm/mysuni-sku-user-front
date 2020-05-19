import { axiosApi as axios } from '@nara.platform/accent';
import { CompanyApproverModel } from '../../model/CompanyApproverModel';

export default class CompanyApproverApi {
  //
  rootURL = '/api/approval/companyApprover';

  static instance: CompanyApproverApi;

  findCompanyApprover() {
    return axios.get<CompanyApproverModel>(this.rootURL)
      .then((response) => response && response.data && new CompanyApproverModel(response.data) || new CompanyApproverModel());
  }
}

Object.defineProperty(CompanyApproverApi, 'instance', {
  value: new CompanyApproverApi(),
  writable: false,
  configurable: false,
});
