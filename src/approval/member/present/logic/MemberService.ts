import autobind from 'autobind-decorator';
import { action, observable, runInAction } from 'mobx';
import MemberApi from '../apiclient/MemberApi';
import { ApprovalMemberModel } from '../../model/ApprovalMemberModel';

@autobind
export default class MemberService {
  //
  static instance: MemberService;

  memberApi: MemberApi;

  @observable
  approvalMember: ApprovalMemberModel = new ApprovalMemberModel();

  constructor(memberApi: MemberApi) {
    //
    this.memberApi = memberApi;
  }

  @action
  async findApprovalMemberByEmployeeId(employeeId: string) {
    //
    const approvalMember = await this.memberApi.findMemberByEmployeeId(employeeId);

    runInAction(() => this.approvalMember = approvalMember);
    return approvalMember;
  }

  @action
  changeApprovalManagerProps(approvalMember: ApprovalMemberModel) {
    this.approvalMember = approvalMember;
    console.log(this.approvalMember);
  }

  @action
  clearApprovalManager() {
    //
    this.approvalMember = new ApprovalMemberModel();
  }
}

Object.defineProperty(MemberService, 'instance', {
  value: new MemberService(MemberApi.instance),
  writable: false,
  configurable: false,
});
