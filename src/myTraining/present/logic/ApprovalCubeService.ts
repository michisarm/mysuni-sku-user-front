import { action, observable, runInAction } from 'mobx';
import { autobind, OffsetElementList } from '@nara.platform/accent';

import _ from 'lodash';
import { ProposalState } from '../../../shared/model';
import ApprovalCubeApi from '../apiclient/ApprovalCubeApi';
import { ApprovalCubeModel } from '../../model/ApprovalCubeModel';
import { StudentRequestCdoModel } from '../../model/StudentRequestCdoModel';
import ApprovalCubeRdoModel from '../../model/ApprovalCubeRdoModel';

@autobind
export default class ApprovalCubeService {
  //
  static instance: ApprovalCubeService;

  approvalCubeApi: ApprovalCubeApi;

  @observable
  approvalCube: ApprovalCubeModel = new ApprovalCubeModel();

  @observable
  approvalCubeOffsetList: OffsetElementList<ApprovalCubeModel> = {
    results: [],
    totalCount: 0,
  };

  @observable
  studentRequest: StudentRequestCdoModel = {} as StudentRequestCdoModel;

  @observable
  searchState: ProposalState = ProposalState.Submitted;

  @observable
  searchOrderBy: string = 'ModifiedTimeDesc';

  @observable
  searchEndDate: number = 9999999999999;

  @observable
  lectures: any[] = [];

  @observable
  approvalCubesExcelWrite: ApprovalCubeModel[] = [];

  constructor(approvalCubeApi: ApprovalCubeApi) {
    //
    this.approvalCubeApi = approvalCubeApi;
  }

  @observable
  selectedList: string[] = [];

  @observable
  proposalStateList: string[] = [];

  @action
  changeStudentRequestProps(name: string, value: any) {
    //
    this.studentRequest = _.set(this.studentRequest, name, value);
  }

  @action
  changeSelectedStudentProps(selectedList: string[]) {
    //
    this.selectedList = selectedList;
  }

  @action
  changeSelectedProposalStateProps(selectedList: string[]) {
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
    const approvalCube = await this.approvalCubeApi.findPersonalCube(
      personalCubeId
    );

    if (approvalCube) {
      return runInAction(
        () => (this.approvalCube = new ApprovalCubeModel(approvalCube))
      );
    }
    return null;
  }

  @action
  async findApprovalCube(studentId: string) {
    //
    const approvalCubeDetail = await this.approvalCubeApi.findApprovalCube(
      studentId
    );

    if (approvalCubeDetail) {
      const approvalCube = new ApprovalCubeModel();
      approvalCube.studentId = approvalCubeDetail.student.id;
      if (approvalCubeDetail.userIdentity.name !== undefined) {
        approvalCube.studentName = approvalCubeDetail.userIdentity.name;
      }
      if (approvalCubeDetail.userIdentity.departmentName !== undefined) {
        approvalCube.studentDepartmentNames =
          approvalCubeDetail.userIdentity.departmentName;
      }
      if (approvalCubeDetail.cube.name !== undefined) {
        approvalCube.cubeName = approvalCubeDetail.cube.name;
      }

      approvalCube.cubeType = approvalCubeDetail.cube.type;
      approvalCube.round = approvalCubeDetail.student.round;
      approvalCube.capacity = approvalCubeDetail.classroom.capacity;
      approvalCube.learningStartDate =
        approvalCubeDetail.classroom.enrolling.learningPeriod.startDate;
      approvalCube.learningEndDate =
        approvalCubeDetail.classroom.enrolling.learningPeriod.endDate;
      approvalCube.operation.location =
        approvalCubeDetail.classroom.operation.location;
      approvalCube.freeOfCharge.chargeAmount =
        approvalCubeDetail.classroom.freeOfCharge.chargeAmount;
      approvalCube.proposalState = approvalCubeDetail.student.proposalState;
      approvalCube.remark = approvalCubeDetail.studentApproval.remark;

      return runInAction(() => (this.approvalCube = approvalCube));
    }
    return null;
  }

  // 미사용
  // async studentRequestOpen(studentRequestCdo: StudentRequestCdoModel) {
  //   //
  //   return this.approvalCubeApi.studentRequestOpen(studentRequestCdo);
  // }
  //
  // async studentRequestReject(studentRequestCdo: StudentRequestCdoModel) {
  //   //
  //   return this.approvalCubeApi.studentRequestReject(studentRequestCdo);
  // }

  // ApprovalCubeOffsetList --------------------------------------------------------------------------------------------
  @action
  async findApprovalCubesForSearch(
    offset: number,
    limit: number,
    orderBy: string = 'ModifiedTimeDesc',
    proposalState: ProposalState = ProposalState.Submitted,
    lectureCardId: string = '',
    endDate: number = 9999999999999
  ) {
    //
    const approvalCubeOffsetList =
      await this.approvalCubeApi.findApprovalCubesForSearch(
        ApprovalCubeRdoModel.new(
          offset,
          limit,
          orderBy,
          proposalState,
          lectureCardId,
          endDate
        )
      );

    runInAction(() => {
      this.approvalCubeOffsetList.results =
        this.approvalCubeOffsetList.results.concat(
          approvalCubeOffsetList.results
        );
      this.approvalCubeOffsetList.totalCount =
        approvalCubeOffsetList.totalCount;
    });
    return approvalCubeOffsetList;
  }

  @action
  clear() {
    this.approvalCubeOffsetList = {
      results: [],
      totalCount: 0,
    } as OffsetElementList<ApprovalCubeModel>;
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
  changeSearchEndDate(endDate: number) {
    //
    this.searchEndDate = endDate;
  }

  @action
  async findLectureApprovalSelect() {
    //
    const lectures = await this.approvalCubeApi.findLectureApprovalSelect();
    return runInAction(() => (this.lectures = lectures));
  }

  @action
  async findApprovalCubesForExcel(
    orderBy: string,
    proposalState?: ProposalState,
    approvalCube?: ApprovalCubeModel
  ) {
    //
    const cubeId = approvalCube?.cubeId || '';

    const approvalCubeRdo: ApprovalCubeRdoModel = new ApprovalCubeRdoModel();
    approvalCubeRdo.sortOrder = orderBy;
    approvalCubeRdo.cubeId = cubeId;
    if (proposalState !== undefined) {
      approvalCubeRdo.proposalState = proposalState;
    }
    approvalCubeRdo.limit = 999999999;

    const approvalCubeOffsetList =
      await this.approvalCubeApi.findApprovalCubesForSearch(approvalCubeRdo);

    runInAction(() => {
      this.approvalCubesExcelWrite = this.approvalCubesExcelWrite.concat(
        approvalCubeOffsetList.results
      );
    });

    return approvalCubeOffsetList;
  }
}

Object.defineProperty(ApprovalCubeService, 'instance', {
  value: new ApprovalCubeService(ApprovalCubeApi.instance),
  writable: false,
  configurable: false,
});
