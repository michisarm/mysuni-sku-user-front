import { axiosApi as axios, OffsetElementList } from '@nara.platform/accent';
import { ApprovalContentsModel } from '../../model/ApprovalContentsModel';
import { ApprovalContentsRdoModel } from '../../model/ApprovalContentsRdoModel';

export default class ApprovalContentsApi {

  URL = '/api/personalCube/approvalcontents';

  static instance: ApprovalContentsApi;

  findAllApprovalContents(approvalContentsRdo: ApprovalContentsRdoModel) {
    //
    return axios.get<OffsetElementList<ApprovalContentsModel>>(this.URL, { params: approvalContentsRdo })
      .then(response => response && response.data || null);
  }
}

Object.defineProperty(ApprovalContentsApi, 'instance', {
  value: new ApprovalContentsApi(),
  writable: false,
  configurable: false,
});
