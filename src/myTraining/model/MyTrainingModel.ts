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
import { InProgressXlsxModel } from './InProgressXlsxModel';
import { CompletedXlsxModel } from './CompletedXlsxModel';
import {
  parsePolyglotString,
  PolyglotString,
} from 'shared/viewmodel/PolyglotString';

class MyTrainingModel extends DramaEntityObservableModel {
  //
  originalSerivceType: string = '';
  serviceType: LectureServiceType = LectureServiceType.Card;
  serviceId: string = '';
  servicePatronKeyString: string = '';
  student: IdName = new IdName();
  category: CategoryModel = new CategoryModel();
  name: PolyglotString | null = null;
  // name: string = '';
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
  cineroomId: string = '';
  courseSetJson: CourseSetModel = new CourseSetModel();
  courseLectureUsids: string[] = [];
  lectureCardUsids: string[] = [];
  level: string = '';
  time: number = 0;

  reviewId: string = '';
  studentCount: number = 0;
  passedStudentCount: number = 0;

  baseUrl: string = '';
  createDate: string = '';
  startDate: string = '';
  endDate: string = '';
  retryDate: string = '';
  // UI only
  cubeTypeName: CubeTypeNameType = CubeTypeNameType.None;

  capacity: number = 0;
  differDays: number = 0;
  ribbonName: string = '';

  constructor(myTraining?: MyTrainingModel) {
    //
    super();

    if (myTraining) {
      Object.assign(this, myTraining);
      this.originalSerivceType = myTraining.serviceType;
      // this.serviceType = MyTrainingModel.getServiceType(myTraining);

      this.category = new CategoryModel(myTraining.category);

      // UI Model
      this.cubeTypeName = MyTrainingModel.getCubeTypeName(
        myTraining.cubeType,
        this.serviceType
      );
      this.passedStudentCount = myTraining.studentCount;
    }
  }

  toXlsxForInProgress(index: number): InProgressXlsxModel {
    //
    return {
      No: String(index),
      College: this.category.college.name,
      ?????????: this.name ? parsePolyglotString(this.name) : '',
      ????????????: this.cubeType,
      Level: this.level,
      ????????????: moment(this.learningTime).format('YYYY.MM.DD'),
      ???????????????: moment(this.time).format('YYYY.MM.DD'),
    };
  }

  toXlsxForCompleted(index: number): CompletedXlsxModel {
    return {
      No: String(index),
      College: this.category.college.name,
      ?????????: this.name ? parsePolyglotString(this.name) : '',
      ????????????: this.cubeType,
      Level: this.level,
      ????????????: moment(this.learningTime).format('YYYY.MM.DD'),
      ???????????????: moment(this.endDate).format('YYYY.MM.DD'),
    };
  }

  isCardType() {
    return this.serviceType === LectureServiceType.Card ? true : false;
  }

  static getServiceType(myTraining: MyTrainingModel) {
    const serviceType = myTraining.serviceType as string;

    if (serviceType.toUpperCase() === 'CARD') {
      return LectureServiceType.Card;
    }

    return LectureServiceType.Cube;
  }

  static getCubeTypeName(cubeType: CubeType, serviceType: LectureServiceType) {
    //
    if (serviceType === LectureServiceType.Card) {
      return CubeTypeNameType.Card;
    } else {
      return CubeTypeNameType[CubeType[cubeType]];
    }
  }

  static asStampXLSX(myTraining: MyTrainingModel, index: number) {
    //

    return {
      No: String(index + 1),
      college: myTraining.category.college.name,
      ?????????: myTraining.name || '-',
      ?????????: myTraining.stampCount,
      ????????????: moment(myTraining.endDate).format('YYYY.MM.DD HH:mm:ss') || '-',
    };
  }

  @computed
  get state() {
    if (this.proposalState === ProposalState.Approved) {
      if (this.learningState) {
        return LearningStateName[LearningState[this.learningState]];
      }
      if (this.cubeType === CubeType.Community) {
        return '????????????';
      }
      return '????????????';
    } else {
      return ProposalStateName[ProposalState[this.proposalState]];
    }
  }

  @computed
  get timeStrByState() {
    if (this.proposalState) {
      if (this.proposalState === ProposalState.Submitted) {
        return moment(Number(this.time)).format('YYYY.MM.DD') + ' ?????? ??????';
      } else if (this.proposalState === ProposalState.Approved) {
        if (!this.learningState && this.startDate) {
          return (
            moment(Number(this.startDate)).format('YYYY.MM.DD') +
            ' ?????? ????????????'
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
          return moment(Number(this.time)).format('YYYY.MM.DD') + ' ?????? ??????';
        }

        if (this.learningState === LearningState.Passed) {
          return moment(Number(this.time)).format('YYYY.MM.DD') + ' ?????? ??????';
        }

        if (this.learningState === LearningState.Missed) {
          return moment(Number(this.time)).format('YYYY.MM.DD') + ' ?????? ??????';
        }
      }
      if (this.proposalState === ProposalState.Rejected) {
        return (
          moment(Number(this.time)).format('YYYY.MM.DD') + ' ???????????? ??????'
        );
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
  cineroomId: observable,
  courseSetJson: observable,
  courseLectureUsids: observable,
  lectureCardUsids: observable,
  level: observable,
  time: observable,
  required: observable,
  cubeTypeName: observable,
  reviewId: observable,
  studentCount: observable,
  passedStudentCount: observable,
  baseUrl: observable,
  endDate: observable,
  retryDate: observable,
  capacity: observable,
  differDays: observable,
  ribbonName: observable,
});

export default MyTrainingModel;
