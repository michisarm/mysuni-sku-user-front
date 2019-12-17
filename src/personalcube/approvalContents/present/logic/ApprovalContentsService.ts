import { observable, action, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
import { OffsetElementList } from '@nara.platform/accent';
import ApprovalContentsApi from '../apiclient/ApprovalContentsApi';
import { ApprovalContentsModel } from '../../model/ApprovalContentsModel';
import { ApprovalContentsRdoModel } from '../../model/ApprovalContentsRdoModel';


@autobind
export default class ApprovalContentsService {
  //
  static instance: ApprovalContentsService;

  approvalContentsApi: ApprovalContentsApi;

  @observable
  approvalContents: OffsetElementList<ApprovalContentsModel> = {} as OffsetElementList<ApprovalContentsModel>;

  constructor(approvalContentsApi: ApprovalContentsApi) {
    this.approvalContentsApi = approvalContentsApi;
  }

  @action
  async findAllApprovalContents(approvalContentsRdo: ApprovalContentsRdoModel) {
    const approvalContents = await this.approvalContentsApi.findAllApprovalContents(approvalContentsRdo);
    runInAction(() => {
      approvalContents.results = approvalContents.results.map(approvalContent => new ApprovalContentsModel(approvalContent));
      this.approvalContents = approvalContents;
    });
  }
}

Object.defineProperty(ApprovalContentsService, 'instance', {
  value: new ApprovalContentsService(ApprovalContentsApi.instance),
  writable: false,
  configurable: false,
});
