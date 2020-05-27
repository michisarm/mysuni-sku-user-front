import { action, observable, runInAction } from 'mobx';
import { autobind, OffsetElementList } from '@nara.platform/accent';

import _ from 'lodash';
import { CubeState, ProposalState } from '../../../shared/model';
import ApprovalCubeApi from '../apiclient/ApprovalCubeApi';
import { ApprovalCubeModel } from '../../model/ApprovalCubeModel';

import { ApprovedResponse } from '../../model/ApprovedResponse';

import { ContentsProviderModel } from '../../../college/model/ContentsProviderModel';

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
  searchState: ProposalState = ProposalState.Submitted;

  @observable
  contentsProvider: ContentsProviderModel = new ContentsProviderModel();
  
  @observable
  contentsProviders: ContentsProviderModel[] = [];

  constructor(approvalCubeApi: ApprovalCubeApi) {
    //
    this.approvalCubeApi = approvalCubeApi;
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

  @action
  async addRejectedLectureSingle() {

    console.log('addRejectedLectureSingle Start ... ::');
    //
    const approvedResponse = await this.approvalCubeApi.addRejectedLectureSingle();

    if (approvedResponse) {
      return runInAction(() => this.approvedResponse = new ApprovedResponse(approvedResponse));
    }
    return approvedResponse;
  }

  @action
  async addApprovedLectureSingle() {

    console.log('addApprovedLectureSingle Start ::');
    //
    const approvedResponse = await this.approvalCubeApi.addApprovedLectureSingle();

    if (approvedResponse) {
      return runInAction(() => this.approvedResponse = new ApprovedResponse(approvedResponse));
    }
    return approvedResponse;
  }

  // ApprovalCubeOffsetList --------------------------------------------------------------------------------------------
  @action
  async findApprovalCubesForSearch(offset: number, limit: number, proposalState?: ProposalState, approvalCube?: ApprovalCubeModel) {
    //

    console.log('findApprovalCubesForSearch offset ::' + offset);
    console.log('findApprovalCubesForSearch limit ::' + limit);
    console.log('findApprovalCubesForSearch proposalState ::' + proposalState);
    console.log('findApprovalCubesForSearch approvalCube.lectureCardId ::' + approvalCube?.lectureCardId);

    const approvalCubeOffsetList = await this.approvalCubeApi.findApprovalCubesForSearch(offset, limit, proposalState, approvalCube);

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
