import { axiosApi as axios, OffsetElementList } from '@nara.platform/accent';
import { ClassRoomGroup } from '../../model/ApprovalContentsModel';
import { CubeIntroModel } from '../../model/ApprovalContentsRdoModel';

export default class ApprovalContentsApi {
  URL = '/api/personalCube/approval';

  static instance: ApprovalContentsApi;

  findAllApprovalContents(approvalContentsRdo: CubeIntroModel) {
    //
    return axios.get<OffsetElementList<ClassRoomGroup>>(this.URL + `?${approvalContentsRdo.query}`)
      .then(response => response && response.data || null);
  }
}

Object.defineProperty(ApprovalContentsApi, 'instance', {
  value: new ApprovalContentsApi(),
  writable: false,
  configurable: false,
});
