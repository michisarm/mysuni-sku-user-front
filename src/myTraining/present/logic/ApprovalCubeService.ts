import { action, observable, runInAction } from 'mobx';
import { autobind, OffsetElementList } from '@nara.platform/accent';

import _ from 'lodash';
import { ProposalState } from '../../../shared/model';
import ApprovalCubeApi from '../apiclient/ApprovalCubeApi';
import { ApprovalCubeModel } from '../../model/ApprovalCubeModel';
import { StudentRequestCdoModel } from '../../model/StudentRequestCdoModel';
import IdName from '../../../shared/model/IdName';

@autobind
export default class ApprovalCubeService {
  //
  static instance: ApprovalCubeService;

  approvalCubeApi: ApprovalCubeApi;

  @observable
  approvalCube: ApprovalCubeModel = new ApprovalCubeModel();

  @observable
  approvalCubeOffsetList: OffsetElementList<ApprovalCubeModel> = { results: [], totalCount: 0 };

  @observable
  studentRequest: StudentRequestCdoModel = {} as StudentRequestCdoModel;

  @observable
  searchState: ProposalState = ProposalState.Submitted;

  @observable
  searchOrderBy: string = '';

  @observable
  searchStartDate: number = 0;

  @observable
  lectures: any[] = [];

  @observable
  approvalCubesExcelWrite: ApprovalCubeModel[] = [];

  constructor(approvalCubeApi: ApprovalCubeApi) {
    //
    this.approvalCubeApi = approvalCubeApi;
  }

  @observable
  selectedList: string [] = [];

  @observable
  proposalStateList: string[] = [];

  @action
  changeStudentRequestProps(name: string, value: any) {
    //
    this.studentRequest = _.set(this.studentRequest, name, value);
  }

  @action
  changeSelectedStudentProps(selectedList: string []) {
    //
    this.selectedList = selectedList;
  }

  @action
  changeSelectedProposalStateProps(selectedList: string []) {
    //
    this.proposalStateList = selectedList;
  }

  // ApprovalCube ------------------------------------------------------------------------------------------------------
  @action
  clearApprovalCube() {
    //
    this.approvalCube = new ApprovalCubeModel();
  }

  @action
  changeCubeProps(name: string, value: string | {} | string[]) {
    //
    this.approvalCube = _.set(this.approvalCube, name, value);
  }

  @action
  async findPersonalCube(personalCubeId: string) {
    //
    const approvalCube = await this.approvalCubeApi.findPersonalCube(personalCubeId);

    if (approvalCube) {
      return runInAction(() => this.approvalCube = new ApprovalCubeModel(approvalCube));
    }
    return null;
  }

  @action
  async findApprovalCube(studentId: string) {
    //
    const approvalCube = await this.approvalCubeApi.findApprovalCube(studentId);

    if (approvalCube) {
      return runInAction(() => this.approvalCube = new ApprovalCubeModel(approvalCube));
    }
    return null;
  }

  async studentRequestOpen(studentRequestCdo: StudentRequestCdoModel) {
    //
    return this.approvalCubeApi.studentRequestOpen(studentRequestCdo);
  }

  async studentRequestReject(studentRequestCdo: StudentRequestCdoModel) {
    //
    return this.approvalCubeApi.studentRequestReject(studentRequestCdo);
  }

  // ApprovalCubeOffsetList --------------------------------------------------------------------------------------------
  @action
  async findApprovalCubesForSearch(offset: number,
    limit: number,
    orderBy: string,
    proposalState?: ProposalState,
    approvalCube?: ApprovalCubeModel,
    startDate: number = 0) {
    //
    const approvalCubeOffsetList = await this.approvalCubeApi.findApprovalCubesForSearch(offset, limit, orderBy, proposalState, approvalCube, startDate);

    runInAction(() => {
      this.approvalCubeOffsetList.results = this.approvalCubeOffsetList.results.concat(approvalCubeOffsetList.results);
      this.approvalCubeOffsetList.totalCount = approvalCubeOffsetList.totalCount;
    });
    return approvalCubeOffsetList;
  }

  @action
  clear() {
    this.approvalCubeOffsetList = { results: [], totalCount: 0 } as OffsetElementList<ApprovalCubeModel>;
  }

  // SearchState --------------------------------------------------------------------------------------------

  @action
  changeSearchState(proposalState: ProposalState) {
    //
    this.searchState = proposalState;
  }

  @action
  changeSearchOrderBy(orderBy: string) {
    //
    this.searchOrderBy = orderBy;
  }

  @action
  changeSearchStartDate(startDate: number) {
    //
    this.searchStartDate = startDate;
  }

  @action
  async findLectureApprovalSelect() {
    //
    const lectures = await this.approvalCubeApi.findLectureApprovalSelect();
    return runInAction(() => this.lectures = lectures);
  }

  @action
  async findApprovalCubesForExcel(orderBy: string, proposalState?: ProposalState, approvalCube?: ApprovalCubeModel) {
    //
    const approvalCubes = await this.approvalCubeApi.findApprovalCubesForExcel(orderBy, proposalState, approvalCube);

    return runInAction(() => {
      this.approvalCubesExcelWrite = approvalCubes || [];
    });
  }
}

Object.defineProperty(ApprovalCubeService, 'instance', {
  value: new ApprovalCubeService(ApprovalCubeApi.instance),
  writable: false,
  configurable: false,
});
