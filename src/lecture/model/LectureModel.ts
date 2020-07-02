import { computed, decorate, observable } from 'mobx';
import { patronInfo } from '@nara.platform/dock';

import { ReviewSummaryModel } from '@nara.drama/feedback';
import {
  CategoryModel,
  CourseOpenModel,
  DramaEntityObservableModel,
  IdName,
} from 'shared/model';
import { CubeType, CubeTypeNameType } from 'personalcube/personalcube/model';

import moment from 'moment';
import LectureServiceType from './LectureServiceType';
import { CourseSetModel } from '../../course/model/CourseSetModel';

class LectureModel extends DramaEntityObservableModel {
  //
  serviceType: LectureServiceType = LectureServiceType.Card;
  serviceId: string = '';
  coursePlanId: string = '';
  requiredSubsidiaries: IdName[] = [];
  courseOpen: CourseOpenModel = new CourseOpenModel();
  category: CategoryModel = new CategoryModel();
  name: string = '';
  cubeType: CubeType = CubeType.None;
  cubeId: string = '';
  courseSetJson: CourseSetModel = new CourseSetModel();
  courseLectureUsids: string[] = [];
  lectureCardUsids: string[] = [];
  learningTime: number = 0;

  reviewId: string = '';
  commentId: string = '';
  description: string = '';

  stampCount: number = 0;
  passedStudentCount: number = 0;
  studentCount: number = 0;
  time: number = 0;

  baseUrl: string = '';
  creationTime: string = '';
  updateTimeForTest: number = 0;
  updateTime: number = 0;
  viewState: string = '';
  endDate: string = '';

  reviewSummary: ReviewSummaryModel = new ReviewSummaryModel();

  // UI only
  required: boolean = false;
  cubeTypeName: CubeTypeNameType = CubeTypeNameType.None;

  constructor(lecture?: LectureModel) {
    //
    super();

    if (lecture) {
      Object.assign(this, { ...lecture });

      this.serviceType = LectureModel.getServiceType(lecture);
      this.category = new CategoryModel(lecture.category);

      // UI Model
      const companyCode = patronInfo.getPatronCompanyCode();

      this.required =
        lecture.requiredSubsidiaries &&
        lecture.requiredSubsidiaries.some(
          subsidiary => subsidiary.id === companyCode
        );

      this.cubeTypeName = LectureModel.getCubeTypeName(
        lecture.cubeType,
        this.serviceType
      );

      this.reviewSummary = lecture.reviewSummary;
    }
  }

  static getServiceType(lecture: LectureModel) {
    //
    const serviceType = lecture.serviceType as string;

    if (serviceType === 'PROGRAM') {
      return LectureServiceType.Program;
    } else if (serviceType === 'COURSE') {
      return LectureServiceType.Course;
    } else {
      return LectureServiceType.Card;
    }
  }

  static getCubeTypeName(cubeType: CubeType, serviceType: LectureServiceType) {
    //
    if (serviceType === LectureServiceType.Program) {
      return CubeTypeNameType.Program;
    } else if (serviceType === LectureServiceType.Course) {
      return CubeTypeNameType.Course;
    } else {
      return CubeTypeNameType[CubeType[cubeType]];
    }
  }

  @computed
  get state() {
    if (this.viewState) {
      switch (this.viewState) {
        case 'Canceled':
        case 'Rejected':
        case 'NoShow':
        case 'Missed':
          return '취소/미이수';
        case 'Passed':
          return '학습 완료';
        case 'Progress':
        case 'Failed':
        case 'TestPassed':
        case 'Waiting':
        case 'HomeworkWaiting':
          return '학습중';
        case 'Approved':
          return '학습예정';
      }
    }
    return undefined;
  }

  @computed
  get timeStrByState() {
    if (this.viewState) {
      if (this.viewState === 'NoShow' || this.viewState === 'Missed') {
        return (
          moment(Number(this.updateTimeForTest)).format('YYYY.MM.DD') +
          ' 이수 실패'
        );
      }
      if (this.viewState === 'Passed') {
        return (
          moment(Number(this.updateTimeForTest)).format('YYYY.MM.DD') +
          ' 학습 완료'
        );
      }
      if (this.viewState === 'Approved') {
        //TODO STARTDATE
        return (
          moment(Number(this.creationTime)).format('YYYY.MM.DD') +
          ' 부터 학습시작'
        );
      }
      if (
        this.viewState === 'Progress' ||
        this.viewState === 'Failed' ||
        this.viewState === 'TestPassed' ||
        this.viewState === 'Waiting' ||
        this.viewState === 'TestWaiting' ||
        this.viewState === 'HomeworkWaiting'
      ) {
        return (
          moment(Number(this.updateTime)).format('YYYY.MM.DD') + ' 학습 시작'
        );
      }
      if (this.viewState === 'Rejected') {
        return (
          moment(Number(this.updateTime)).format('YYYY.MM.DD') +
          ' 수강신청 반려'
        );
      }
    }
    return '';
  }

  @computed
  get rating() {
    return (this.reviewSummary && this.reviewSummary.average) || 0;
  }
}

decorate(LectureModel, {
  serviceType: observable,
  serviceId: observable,
  coursePlanId: observable,
  requiredSubsidiaries: observable,
  courseOpen: observable,
  category: observable,
  name: observable,
  cubeType: observable,
  cubeId: observable,
  courseSetJson: observable,
  learningTime: observable,
  courseLectureUsids: observable,
  lectureCardUsids: observable,
  reviewId: observable,
  commentId: observable,
  description: observable,
  stampCount: observable,
  studentCount: observable,
  passedStudentCount: observable,
  time: observable,
  reviewSummary: observable,
  required: observable,
  cubeTypeName: observable,
  baseUrl: observable,
  creationTime: observable,
  updateTime: observable,
  updateTimeForTest: observable,
  viewState: observable,
  endDate: observable,
});

export default LectureModel;
