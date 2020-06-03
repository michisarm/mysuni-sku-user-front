import { computed, decorate, observable } from 'mobx';
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

class MyTrainingModel extends DramaEntityObservableModel {
  //
  serviceType: LectureServiceType = LectureServiceType.Card;
  serviceId: string = '';
  servicePatronKeyString: string = '';
  student: IdName = new IdName();
  category: CategoryModel = new CategoryModel();
  name: string = '';
  description: string = '';
  cubeType: CubeType = CubeType.None;
  proposalState: ProposalState = ProposalState.Submitted;
  learningState: LearningState = LearningState.Progress;
  learningTime: number = 0;
  stampCount: number = 0;
  coursePlanId: string = '';

  requiredSubsidiaries: IdName[] = [];
  required: boolean = false;
  cubeId: string = '';
  courseSetJson: CourseSetModel = new CourseSetModel();
  courseLectureUsids: string[] = [];
  lectureCardUsids: string[] = [];

  time: number = 0;

  reviewId: string = '';
  studentCount: number = 0;
  passedStudentCount: number = 0;

  baseUrl: string = '';
  createDate: string = '';
  startDate: string = '';
  endDate: string = '';
  // UI only
  cubeTypeName: CubeTypeNameType = CubeTypeNameType.None;


  constructor(myTraining?: MyTrainingModel) {
    //
    super();

    if (myTraining) {
      Object.assign(this, { ...myTraining });

      this.serviceType = MyTrainingModel.getServiceType(myTraining);
      this.category = new CategoryModel(myTraining.category);

      // UI Model
      this.cubeTypeName = MyTrainingModel.getCubeTypeName(myTraining.cubeType, this.serviceType);
      this.passedStudentCount = myTraining.studentCount;
    }
  }

  static getServiceType(myTraining: MyTrainingModel) {
    //
    const serviceType = myTraining.serviceType as string;

    if (serviceType === 'PROGRAM') {
      return LectureServiceType.Program;
    }
    else if (serviceType === 'COURSE') {
      return LectureServiceType.Course;
    }
    else {
      return LectureServiceType.Card;
    }
  }

  static getCubeTypeName(cubeType: CubeType, serviceType: LectureServiceType) {
    //
    if (serviceType === LectureServiceType.Program) {
      return CubeTypeNameType.Program;
    }
    else if (serviceType === LectureServiceType.Course) {
      return CubeTypeNameType.Course;
    }
    else {
      return CubeTypeNameType[CubeType[cubeType]];
    }
  }

  @computed
  get state() {
    if (this.proposalState === ProposalState.Approved) {
      if (this.learningState) return LearningStateName[LearningState[this.learningState]];
      if (this.cubeType === CubeType.Community) return '가입완료';
      return '학습예정';
    }
    else {
      return ProposalStateName[ProposalState[this.proposalState]];
    }
  }

  @computed
  get timeStrByState() {
    if (this.proposalState) {
      if (this.proposalState === ProposalState.Submitted) return '';
      if (this.proposalState === ProposalState.Approved) {
        if (!this.learningState && this.startDate) {
          return moment(Number(this.startDate)).format('YYYY.MM.DD') + ' 부터 학습시작';
        }
        if (
          this.learningState === LearningState.Progress || this.learningState === LearningState.Waiting
          || this.learningState === LearningState.HomeworkWaiting || this.learningState === LearningState.TestWaiting
          || this.learningState === LearningState.TestPassed || this.learningState === LearningState.Failed
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
        return moment(Number(this.time)).format('YYYY.MM.DD') + ' 수강신청 반려';
      }
    }
    return '';
  }
}

decorate(MyTrainingModel, {
  serviceType: observable,
  serviceId: observable,
  servicePatronKeyString: observable,
  student: observable,
  category: observable,
  name: observable,
  description: observable,
  cubeType: observable,
  proposalState: observable,
  learningState: observable,
  learningTime: observable,
  stampCount: observable,
  coursePlanId: observable,
  requiredSubsidiaries: observable,
  cubeId: observable,
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
});

export default MyTrainingModel;
