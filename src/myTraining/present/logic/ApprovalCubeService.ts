import { action, observable, runInAction } from 'mobx';
import { autobind, OffsetElementList } from '@nara.platform/accent';

import _ from 'lodash';
import { CubeState, ProposalState } from '../../../shared/model';
import ApprovalCubeApi from '../apiclient/ApprovalCubeApi';
import { ApprovalCubeModel } from '../../model/ApprovalCubeModel';

import { ApprovedResponse } from '../../model/ApprovedResponse';

import { ContentsProviderModel } from '../../../college/model/ContentsProviderModel';

import { StudentRequestCdoModel } from '../../model/StudentRequestCdoModel';

@autobind
export default class ApprovalCubeService {
  //
  static instance: ApprovalCubeService;

  approvalCubeApi: ApprovalCubeApi;

  @observable
  approvalCube: ApprovalCubeModel = new ApprovalCubeModel();

  @observable
  approvedResponse: ApprovedResponse = new ApprovedResponse();

  @observable
  approvalCubeOffsetList: OffsetElementList<ApprovalCubeModel> = { results: [], totalCount: 0 };

  @observable
  studentRequest: StudentRequestCdoModel = {} as StudentRequestCdoModel;

  @observable
  searchState: ProposalState = ProposalState.Submitted;

  @observable
  contentsProvider: ContentsProviderModel = new ContentsProviderModel();

  @observable
  contentsProviders: ContentsProviderModel[] = [];

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

    console.log('findApprovalCube studentId ::' +studentId);
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
  async findApprovalCubesForSearch(offset: number, limit: number, orderBy: string, proposalState?: ProposalState, approvalCube?: ApprovalCubeModel) {
    //
    const approvalCubeOffsetList = await this.approvalCubeApi.findApprovalCubesForSearch(offset, limit, orderBy, proposalState, approvalCube);

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
  async findLectureApprovalSelect() {
    //
    const contentsProviders = await this.approvalCubeApi.findLectureApprovalSelect();
    return runInAction(() => this.contentsProviders = contentsProviders);
  }
}

Object.defineProperty(ApprovalCubeService, 'instance', {
  value: new ApprovalCubeService(ApprovalCubeApi.instance),
  writable: false,
  configurable: false,
});
