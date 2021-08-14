import { decorate, observable, computed } from 'mobx';
import { patronInfo } from '@nara.platform/dock';
import moment from 'moment';
import {
  CategoryModel,
  DramaEntityObservableModel,
  IdName,
  LearningState,
  LearningStateName,
  ProposalState,
  ProposalStateName,
} from 'shared/model';
import { CubeType, CubeTypeNameType } from 'personalcube/personalcube/model';
import { CourseSetModel } from 'course/model';
import { LectureServiceType } from 'lecture/model';
import MyTrainingRdoModel from './MyTrainingRdoModel';
import MyTrainingModel from './MyTrainingModel';
import { CardCategory } from '../../shared/model/CardCategory';
import { Category } from '../../shared/model/Category';
import { LectureType } from '../../lecture/detail/viewModel/LectureType';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';

class InMyLectureModel extends DramaEntityObservableModel {
  //
  serviceType: LectureType = 'Card';
  serviceId: string = '';
  category: CategoryModel = new CategoryModel();

  // name: string = '';
  name: PolyglotString | null = null;
  description: string = '';
  cubeType: CubeType = CubeType.None;
  learningTime: number = 0;
  stampCount: number = 0;
  coursePlanId: string = '';
  //

  requiredSubsidiaries: IdName[] = [];
  cardId: string = '';
  courseSetJson: CourseSetModel = new CourseSetModel();
  courseLectureUsids: string[] = [];
  lectureCardUsids: string[] = [];

  reviewId: string = '';
  time: number = 0;
  studentCount: number = 0;
  passedStudentCount: number = 0;

  baseUrl: string = '';
  proposalState: ProposalState = ProposalState.Submitted;
  learningState: LearningState = LearningState.Progress;

  createDate: string = '';
  startDate: string = '';
  endDate: string = '';
  // UI only
  required: boolean = false;
  cubeTypeName: CubeTypeNameType = CubeTypeNameType.None;

  capacity: number = 0;
  differDays: number = 0;
  ribbonName: string = '';

  constructor(inMyLecture?: InMyLectureModel) {
    //
    super();

    if (inMyLecture) {
      Object.assign(this, { ...inMyLecture });

      this.category = new CategoryModel(inMyLecture.category);

      // UI Model
      const companyCode = patronInfo.getPatronCompanyCode();

      this.required =
        inMyLecture.requiredSubsidiaries &&
        inMyLecture.requiredSubsidiaries.some(
          subsidiary => subsidiary.id === companyCode
        );

      this.cubeTypeName = InMyLectureModel.getCubeTypeName(
        inMyLecture.cubeType,
        this.serviceType
      );
      this.passedStudentCount = inMyLecture.studentCount;
    }
  }

  static getServiceType(inMyLecture: InMyLectureModel) {
    //
    const serviceType = inMyLecture.serviceType as string;

    if (serviceType === 'Card') {
      return LectureServiceType.Card;
    } else {
      return LectureServiceType.Cube;
    }
  }

  static getCubeTypeName(cubeType: CubeType, serviceType: LectureType) {
    //
    if (serviceType === 'Card') {
      return CubeTypeNameType.Card;
    } else {
      return CubeTypeNameType[CubeType[cubeType]];
    }
  }

  @computed
  get state() {
    if (this.proposalState === ProposalState.Approved) {
      if (this.learningState) {
        return LearningStateName[LearningState[this.learningState]];
      }
      if (this.cubeType === CubeType.Community) {
        return '가입완료';
      }
      return '학습예정';
    } else {
      return ProposalStateName[ProposalState[this.proposalState]];
    }
  }

  @computed
  get timeStrByState() {
    if (this.proposalState) {
      if (this.proposalState === ProposalState.Submitted) return '';
      if (this.proposalState === ProposalState.Approved) {
        if (!this.learningState && this.startDate) {
          return (
            moment(Number(this.startDate)).format('YYYY.MM.DD') +
            ' 부터 학습시작'
          );
        }
        if (
          this.learningState === LearningState.Progress ||
          this.learningState === LearningState.Waiting ||
          this.learningState === LearningState.HomeworkWaiting ||
          this.learningState === LearningState.TestWaiting ||
          this.learningState === LearningState.TestPassed ||
          this.learningState === LearningState.Failed
        ) {
          return moment(Number(this.time)).format('YYYY.MM.DD') + ' 학습 시작';
        }
        if (this.learningState === LearningState.Passed) {
          return moment(Number(this.time)).format('YYYY.MM.DD') + ' 학습 완료';
        }
        if (this.learningState === LearningState.Missed) {
          return moment(Number(this.time)).format('YYYY.MM.DD') + ' 이수 실패';
        }
      }
      if (this.proposalState === ProposalState.Rejected) {
        return (
          moment(Number(this.time)).format('YYYY.MM.DD') + ' 수강신청 반려'
        );
      }
    }
    return '';
  }
}

decorate(InMyLectureModel, {
  serviceType: observable,
  serviceId: observable,
  category: observable,
  name: observable,
  description: observable,
  cubeType: observable,
  learningTime: observable,
  stampCount: observable,
  coursePlanId: observable,
  requiredSubsidiaries: observable,
  cardId: observable,
  courseSetJson: observable,
  courseLectureUsids: observable,
  lectureCardUsids: observable,
  time: observable,
  required: observable,
  cubeTypeName: observable,
  reviewId: observable,
  studentCount: observable,
  passedStudentCount: observable,
  baseUrl: observable,
  createDate: observable,
  startDate: observable,
  endDate: observable,
  capacity: observable,
  differDays: observable,
  ribbonName: observable,
});

export default InMyLectureModel;
