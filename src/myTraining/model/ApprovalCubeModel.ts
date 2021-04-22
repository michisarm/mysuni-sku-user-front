import { computed, decorate, observable } from 'mobx';
import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';
import moment from 'moment';
import numeral from 'numeral';

import {
  CategoryModel,
  CreatorModel,
  CubeState,
  IconBoxModel,
  IdName,
  LangStrings,
  SearchFilterType,
} from 'shared/model';
import { CubeContentsModel } from './CubeContentsModel';
import { OpenRequest } from './OpenRequest';
import { FreeOfChargeModel } from './FreeOfChargeModel';
import { EnrollingModel } from './EnrollingModel';
import { OperationModel } from './OperationModel';
import { ApprovalCubeXlsxModel } from './ApprovalCubeXlsxModel';

export class ApprovalCubeModel implements DramaEntity {
  //
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  personalCubeId: string = '';
  name: string = '';
  category: CategoryModel = new CategoryModel();
  subCategories: CategoryModel[] = [];
  iconBox: IconBoxModel = new IconBoxModel();
  creator: CreatorModel = new CreatorModel();
  cubeState: CubeState = CubeState.Created;
  searchFilter: SearchFilterType = SearchFilterType.SearchOff;

  subsidiaries: IdName[] = [];
  requiredSubsidiaries: IdName[] = [];
  contents: CubeContentsModel = new CubeContentsModel();
  cubeIntro: IdName = new IdName();
  tags: string[] = [];
  creationTime: number = 0;

  openRequests: OpenRequest[] = [];

  //UI
  required: boolean = false;

  studentId: string = '';
  rollBookId: string = '';
  classroomId: string = '';
  studentName: string = '';
  studentDepartmentNames: LangStrings = new LangStrings();
  cubeName: string = '';

  round: number = 0;
  approvedStudentCount: number = 0;
  capacity: number = 0;
  remark: string = '';

  freeOfCharge: FreeOfChargeModel = new FreeOfChargeModel();
  operation: OperationModel = new OperationModel();
  enrolling: EnrollingModel = new EnrollingModel(); // 신청/취소/학습 기간/신청유무
  cubeId: string = '';
  cubeType: string = '';
  proposalState: string = '';
  learningState: string = '';

  learningStartDate: string = '';
  learningEndDate: string = '';
  chargeAmount: number = 0;

  constructor(approvalCube?: ApprovalCubeModel) {
    if (approvalCube) {
      const creator =
        (approvalCube.creator && new CreatorModel(approvalCube.creator)) ||
        this.creator;
      const contents =
        (approvalCube.contents &&
          new CubeContentsModel(approvalCube.contents)) ||
        this.contents;
      const cubeIntro =
        (approvalCube.cubeIntro && new IdName(approvalCube.cubeIntro)) ||
        this.cubeIntro;
      const category =
        (approvalCube.category && new CategoryModel(approvalCube.category)) ||
        this.category;
      const iconBox =
        (approvalCube.iconBox && new IconBoxModel(approvalCube.iconBox)) ||
        this.iconBox;
      const freeOfCharge =
        (approvalCube.freeOfCharge &&
          new FreeOfChargeModel(approvalCube.freeOfCharge)) ||
        this.freeOfCharge;
      const operation =
        (approvalCube.operation &&
          new OperationModel(approvalCube.operation)) ||
        this.operation;
      const enrolling =
        (approvalCube.enrolling &&
          new EnrollingModel(approvalCube.enrolling)) ||
        this.enrolling;

      const studentDepartmentNames = new LangStrings(
        approvalCube.studentDepartmentNames
      );

      Object.assign(this, {
        ...approvalCube,
        creator,
        contents,
        cubeIntro,
        category,
        iconBox,
        freeOfCharge,
        operation,
        enrolling,
        studentDepartmentNames,
      });

      // UI Model
      const companyCode = patronInfo.getPatronCompanyCode();

      this.required =
        approvalCube.requiredSubsidiaries &&
        approvalCube.requiredSubsidiaries.some(
          subsidiary => subsidiary.id === companyCode
        );
    }
  }

  public static getProposalStateName(proposalState: string) {
    //
    if (!proposalState) {
      return '';
    }

    if (proposalState === 'Approved') {
      return '승인';
    } else if (proposalState === 'Submitted') {
      return '승인요청';
    } else if (proposalState === 'Rejected') {
      return '반려';
    }
    return proposalState;
  }

  public static getLearningStateName(learningState: string) {
    //
    if (!learningState) {
      return '';
    }

    if (learningState === 'Progress') {
      return '결과처리 대기';
    } else if (learningState === 'Waiting') {
      return '결과처리 대기';
    } else if (learningState === 'Passed') {
      return '이수';
    } else if (learningState === 'Missed') {
      return '미이수';
    } else if (learningState === 'NoShow') {
      return '불참';
    }
    return '';
  }

  static asXLSX(
    approvalCube: ApprovalCubeModel,
    index: number
  ): ApprovalCubeXlsxModel {
    //
    return {
      No: index + 1,
      신청자: approvalCube.studentName,
      조직: approvalCube.getStudentDepartmentNames,
      과정명: approvalCube.cubeName,
      차수: approvalCube.round,
      신청상태: ApprovalCubeModel.getProposalStateName(
        approvalCube.proposalState
      ),
      신청현황: approvalCube.approvedStudentCount + '/' + approvalCube.capacity,
      '(차수)교육기간':
        approvalCube.learningStartDate + '~' + approvalCube.learningEndDate,
      신청일자:
        approvalCube.creationTime &&
        moment(approvalCube.creationTime).format('YYYY.MM.DD'),
      '인당 교육금액': numeral(approvalCube.chargeAmount).format('0,0'),
    };
  }

  @computed
  get getStudentDepartmentNames() {
    if (
      this.studentDepartmentNames &&
      this.studentDepartmentNames.langStringMap
    ) {
      return (
        this.studentDepartmentNames.langStringMap.get(
          this.studentDepartmentNames.defaultLanguage
        ) || ''
      );
    }
    return '';
  }
}

decorate(ApprovalCubeModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,

  personalCubeId: observable,
  name: observable,
  creator: observable,
  contents: observable,
  cubeIntro: observable,
  tags: observable,
  category: observable,
  subCategories: observable,
  iconBox: observable,
  cubeState: observable,
  searchFilter: observable,
  subsidiaries: observable,
  requiredSubsidiaries: observable,
  creationTime: observable,
  openRequests: observable,
  required: observable,

  studentId: observable,
  rollBookId: observable,
  classroomId: observable,
  studentName: observable,
  studentDepartmentNames: observable,
  cubeName: observable,

  round: observable,
  approvedStudentCount: observable,
  capacity: observable,
  remark: observable,

  freeOfCharge: observable,
  operation: observable,
  enrolling: observable,
  cubeId: observable,
  cubeType: observable,
  proposalState: observable,

  learningStartDate: observable,
  learningEndDate: observable,
  chargeAmount: observable,
});
