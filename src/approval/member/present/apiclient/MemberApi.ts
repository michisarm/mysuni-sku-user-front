import { axiosApi as axios } from '@nara.platform/accent';
import { ApprovalMemberModel } from '../../model/ApprovalMemberModel';

export default class MemberApi {
  //
  rootURL = '/api/approval/members';

  static instance: MemberApi;

  findMemberByEmployeeId(employeeId: string) {
    return axios.get<ApprovalMemberModel>(this.rootURL + `/byEmployeeId?employeeId=${employeeId}`)
      .then((response) => response && response.data && new ApprovalMemberModel(response.data) || new ApprovalMemberModel());
  }
}

Object.defineProperty(MemberApi, 'instance', {
  value: new MemberApi(),
  writable: false,
  configurable: false,
});
