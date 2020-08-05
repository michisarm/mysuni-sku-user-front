
import { action, computed, IObservableArray, observable, runInAction } from 'mobx';
import { autobind, OffsetElementList, axiosApi } from '@nara.platform/accent';
import {ReviewService, CommentService, CommentCountRdoModel, ReviewSummaryModel} from '@nara.drama/feedback';
import _ from 'lodash';

import { IdName, CourseState } from 'shared/model';
import CoursePlanApi from '../apiclient/CoursePlanApi';
import CoursePlanFlowApi from '../apiclient/CoursePlanFlowApi';

import { CoursePlanModel, CoursePlanContentsModel, CoursePlanFlowCdoModel } from '../../model';
import { CoursePlanFlowUdoModel } from '../../model/CoursePlanFlowUdoModel';
import { CoursePlanQueryModel } from '../../model/CoursePlanQueryModel';
import { LearningCardModel } from '../../model/LearningCardModel';
import { CourseRequestCdoModel } from '../../model/CourseRequestCdoModel';
import AnswerSheetService from '../../../survey/answer/present/logic/AnswerSheetService';
import {SurveyCaseService, SurveyFormService} from '../../../survey/stores';
import CourseLectureService from '../../../lecture/shared/present/logic/CourseLectureService';
import {LectureService} from '../../../lecture/stores';
import AnswerSheetModel from '../../../survey/answer/model/AnswerSheetModel';
import SurveyCaseModel from '../../../survey/event/model/SurveyCaseModel';
import CourseLectureModel from '../../../lecture/model/CourseLectureModel';
import LectureViewModel from '../../../lecture/model/LectureViewModel';
import ProgramLectureService from '../../../lecture/shared/present/logic/ProgramLectureService';
import StudentService from '../../../lecture/shared/present/logic/StudentService';
import {SurveyFormModel} from '../../../survey/form/model/SurveyFormModel';
import {ProgramLectureModel} from '../../../lecture/model';
import {PersonalCubeModel} from '../../../personalcube/personalcube/model';
import SubLectureViewModel from '../../../lecture/model/SubLectureViewModel';
import { CourseLectureIdsModel } from '../../model/CourseLectureIdsModel';
import { ExaminationModel } from '../../../assistant/exam/model/ExaminationModel';
import { ExamPaperModel } from '../../../assistant/paper/model/ExamPaperModel';
import { ExaminationService, ExamPaperService } from '../../../assistant/stores';



@autobind
class CoursePlanService {
  //
  static instance: CoursePlanService;

  coursePlanApi: CoursePlanApi;
  coursePlanFlowApi: CoursePlanFlowApi;

  answerSheetService: AnswerSheetService = AnswerSheetService.instance;
  surveyCaseService: SurveyCaseService = SurveyCaseService.instance;
  surveyFormService: SurveyFormService = SurveyFormService.instance;

  examinationService: ExaminationService = ExaminationService.instance;
  examPaperService: ExamPaperService = ExamPaperService.instance;

  courseLectureService: CourseLectureService = CourseLectureService.instance;
  programLectureService: ProgramLectureService = ProgramLectureService.instance;

  lectureService: LectureService = LectureService.instance;  //  lectureViews(LectureViewModel[])
  reviewService: ReviewService = ReviewService.instance;     // reviewSummary(ReviewSummaryModel)
  commentService: CommentService = CommentService.instance;  //  commentCountRdo(CommentCountRdoModel)

  studentService: StudentService = StudentService.instance;

  @observable
  coursePlans: OffsetElementList<CoursePlanModel> = { results: [], totalCount: 0 };

  @observable
  coursePlan: CoursePlanModel = new CoursePlanModel();

  @observable
  coursePlanContents: CoursePlanContentsModel = new CoursePlanContentsModel();

  @observable
  coursePlanListModalOpen: boolean = false;

  @observable
  courseRequestCdo: CourseRequestCdoModel = new CourseRequestCdoModel();

  @observable
  coursePlanQuery: CoursePlanQueryModel = new CoursePlanQueryModel();

  @observable
  cardSet: LearningCardModel[] = [];

  @observable
  cardIdSet: string[] = [];

  @observable
  courseSet: CoursePlanModel[] = [];

  @observable
  courseIdSet: string[] = [];

  @observable
  isSelectedCardSet: boolean = false;

  @observable
  isSelectedCourseSet: boolean = false;

  @observable
  channelsMap: Map<IdName, IdName[]> = new Map<IdName, IdName[]>();

  @observable
  preCourseSet: CoursePlanModel[] = [];

  @observable
  preCourseIdSet: string[] = [];

  @observable
  courseIdsSet: CourseLectureIdsModel = new CourseLectureIdsModel() || undefined;

  @observable
  isPreCoursePassed: boolean = true;


  constructor(coursePlanApi: CoursePlanApi, coursePlanFlowApi: CoursePlanFlowApi) {
    this.coursePlanApi = coursePlanApi;
    this.coursePlanFlowApi = coursePlanFlowApi;
  }

  registerCoursePlan(coursePlan: CoursePlanModel) {
    //
    return this.coursePlanApi.registerCoursePlan(coursePlan);
  }

  // CoursePlans -------------------------------------------------------------------------------------------------------
  //
  // @action
  // setIsPreCoursePassed(isPreCoursePassed: boolean) {
  //   return runInAction(() => this.isPreCoursePassed = isPreCoursePassed);
  // }
  //
  // @action
  // get getIsPreCoursePassed() {
  //   return this.isPreCoursePassed;
  // }

  @computed
  get getPreCourseSet() {
    //
    return (this.preCourseSet as IObservableArray).peek();
  }

  @action
  async findAllCoursePlan() {
    //
    const coursePlans = await this.coursePlanApi.findAllCoursePlan();
    return runInAction(() => this.coursePlans = coursePlans);
  }

  @action
  async findAllCoursePlanByQuery(coursePlanQuery: CoursePlanQueryModel) {
    //
    const coursePlans = await this.coursePlanApi.findAllCoursePlanByQuery(CoursePlanQueryModel.asCoursePlanRdo(coursePlanQuery));
    return runInAction(() => this.coursePlans = coursePlans);
  }

  // CoursePlan --------------------------------------------------------------------------------------------------------

  @action
  async findAllCoursePlanInfo(coursePlanId: string, courseLectureId: string) {
    //
    const courseData: any = await this.coursePlanApi.findAllCoursePlanInfo(coursePlanId, courseLectureId);

    runInAction(() => {
      if (courseData) {
        const coursePlan: CoursePlanModel = JSON.parse(JSON.stringify(courseData.coursePlan));
        const coursePlanContents: CoursePlanContentsModel = JSON.parse(JSON.stringify(courseData.coursePlanContents));
        const answerSheet: AnswerSheetModel = JSON.parse(JSON.stringify(courseData.answerSheet));
        const surveyForm: SurveyFormModel = JSON.parse(JSON.stringify(courseData.surveyForm));
        const examination: ExaminationModel = JSON.parse(JSON.stringify(courseData.examination));
        const examPaper: ExamPaperModel= JSON.parse(JSON.stringify(courseData.examPaper));

        const courseLecture: CourseLectureModel = JSON.parse(JSON.stringify(courseData.courseLecture));
        const programLecture: ProgramLectureModel = JSON.parse(JSON.stringify(courseData.programLecture));

        courseData.lectureViews.map((lectureView: any) => {
          lectureView.serviceType = LectureViewModel.getServiceType(lectureView);
          lectureView.cubeTypeName = LectureViewModel.getCubeTypeName(lectureView.cubeType, lectureView.serviceType);
          lectureView.personalCube = new PersonalCubeModel(lectureView.personalCube);
        });
        const lectureViews: LectureViewModel[] = JSON.parse(JSON.stringify(courseData.lectureViews));

        const reviewSummary: ReviewSummaryModel = JSON.parse(JSON.stringify(courseData.reviewSummary));
        const commentCountRdo: CommentCountRdoModel = JSON.parse(JSON.stringify(courseData.commentCountRdo));
        const preCourseSet: CoursePlanModel[] = JSON.parse(JSON.stringify(courseData.precedenceCourse));
        const preCourseLectures: LectureViewModel[] = JSON.parse(JSON.stringify(courseData.preCourseLectures));

        courseData.subLectureViews.map((subLecture: any) => {
          subLecture.lectureViews.map((lectureView: any) => {
            lectureView.serviceType = LectureViewModel.getServiceType(lectureView);
            lectureView.cubeTypeName = LectureViewModel.getCubeTypeName(lectureView.cubeType, lectureView.serviceType);
            lectureView.personalCube = new PersonalCubeModel(lectureView.personalCube);
          });
        });
        const subLectureViews: SubLectureViewModel[] = JSON.parse(JSON.stringify(courseData.subLectureViews));

        this.coursePlan = new CoursePlanModel(coursePlan);
        this.coursePlanContents = new CoursePlanContentsModel(coursePlanContents);
        this.answerSheetService.setAnswerSheet(answerSheet);
        this.surveyFormService.setSurveyForm(surveyForm);
        this.examinationService.setExamination(examination);
        this.examPaperService.setExamPaper(examPaper);
        this.courseLectureService.setCourseLecture(courseLecture);
        this.programLectureService.setProgramLecture(programLecture);
        this.lectureService.setLectureViews(lectureViews);
        this.reviewService.reviewSummary = reviewSummary;
        this.commentService.commentCount = commentCountRdo;

        for (let i = 0; i < subLectureViews.length; i++) {
          const subLectureView = subLectureViews[i];
          this.lectureService.setSubLectureViews(subLectureView.lectureId, subLectureView.lectureViews);
        }
        this.preCourseSet = preCourseSet;
        this.courseLectureService.setPreLectureViews(preCourseLectures);

        // let serviceId: string = '';
        // let lectureCardIds: string[] = [];
        // let courseLectureIds: string[] = [];

        // 코스 학습정보를 가져오기 위한 id 취합
        if ( courseData.courseLecture.coursePlanId ) {
          this.courseIdsSet.serviceId = courseLecture.usid;
          this.courseIdsSet.lectureCardIds = courseLecture.lectureCardUsids;
        } else {
          this.courseIdsSet.serviceId = programLecture.usid;
          this.courseIdsSet.lectureCardIds = programLecture.lectureCardUsids;
          this.courseIdsSet.courseLectureIds = programLecture.courseLectureUsids;
        }

        // 선수코스 학습정보를 가져오기 위한 id 취합
        const preCourseIds: string[] = [];
        if (courseData.preCourseLectures) {
          for ( let i = 0; i < preCourseLectures.length; i++ ) {
            preCourseIds.push(preCourseLectures[i].serviceId);
          }
          this.courseIdsSet.preLectureCardIds = preCourseIds;
        }
        // this.setStudentInfo(serviceId, lectureCardIds, courseLectureIds);
      }
    });

    return courseData;
  }

  @action
  async setStudentInfo() {
    return runInAction(() => {
      return this.studentService.setStudentInfo(this.courseIdsSet.serviceId, this.courseIdsSet.lectureCardIds, this.courseIdsSet.courseLectureIds, this.courseIdsSet.preLectureCardIds);
    });
  }

  @action
  clearCoursePlan() {
    //
    this.coursePlan = new CoursePlanModel();
  }

  @action
  async findCoursePlan(coursePlanId: string) {
    //
    // const courseData: any = tempData; //
    const courseData: any = await this.coursePlanApi.findCoursePlan(coursePlanId);

    return runInAction(() => {
      if (courseData) {
        const coursePlan: CoursePlanModel = JSON.parse(JSON.stringify(courseData.coursePlan));
        const coursePlanContents: CoursePlanContentsModel = JSON.parse(JSON.stringify(courseData.coursePlanContents));
        const answerSheet: AnswerSheetModel = JSON.parse(JSON.stringify(courseData.answerSheet));
        const surveyCase: SurveyCaseModel = JSON.parse(JSON.stringify(courseData.surveyCase));
        const courseLecture: CourseLectureModel = JSON.parse(JSON.stringify(courseData.courseLecture));
        const lectureViews: LectureViewModel[] = JSON.parse(JSON.stringify(courseData.lectureViews));
        const reviewSummary: ReviewSummaryModel = JSON.parse(JSON.stringify(courseData.reviewSummary));
        const commentCountRdo: CommentCountRdoModel = JSON.parse(JSON.stringify(courseData.commentCountRdo));

        this.coursePlan = new CoursePlanModel(coursePlan);
        this.coursePlanContents = new CoursePlanContentsModel(coursePlanContents);
        this.answerSheetService.setAnswerSheet(answerSheet);
        this.surveyCaseService.setSurveyCase(surveyCase);
        this.courseLectureService.setCourseLecture(courseLecture);
        this.lectureService.setLectureViews(lectureViews);
        this.reviewService.reviewSummary = reviewSummary;
        this.commentService.commentCount = commentCountRdo;
      }
      return courseData;
    });
  }

  modifyCoursePlan(coursePlanId: string, coursePlan: CoursePlanModel) {
    //
    this.coursePlanApi.modifyCoursePlan(coursePlanId, CoursePlanModel.asNameValues(coursePlan));
  }

  @action
  changeCoursePlanProps(name: string, value: string | {}) {
    //
    this.coursePlan = _.set(this.coursePlan, name, value);
  }


  // CoursePlanContents ------------------------------------------------------------------------------------------------

  @action
  clearCoursePlanContents() {
    //
    return runInAction(() => this.coursePlanContents = new CoursePlanContentsModel());
  }

  registerCoursePlanContents(coursePlanContents: CoursePlanContentsModel) {
    //
    return this.coursePlanApi.registerCoursePlanContents(coursePlanContents);
  }

  @action
  async findCoursePlanContents(coursePlanContentsId: string) {
    //
    const coursePlanContents = await this.coursePlanApi.findCoursePlanContents(coursePlanContentsId);

    return runInAction(() => this.coursePlanContents = new CoursePlanContentsModel(coursePlanContents));
  }

  @action
  async findCoursePlanContentsV2(coursePlanContentsId: string) {
    //
    const coursePlanContents = await this.coursePlanApi.findCoursePlanContentsV2(coursePlanContentsId);

    return runInAction(() => this.coursePlanContents = new CoursePlanContentsModel(coursePlanContents));
  }

  modifyCoursePlanContents(coursePlanContentsId: string, coursePlanContents: CoursePlanContentsModel) {
    //
    this.coursePlanApi.modifyCoursePlanContents(coursePlanContentsId, CoursePlanContentsModel.asNameValues(coursePlanContents));
  }

  @action
  changeCoursePlanContentsProps(name: string, value: string | Date | IdName[]) {
    //
    this.coursePlanContents = _.set(this.coursePlanContents, name, value);
  }

  @action
  cleanCoursePlanContents() {
    //
    this.coursePlanContents = new CoursePlanContentsModel();
  }


  @action
  changeCourseRequestProps(name: string, value: string) {
    //
    this.courseRequestCdo = _.set(this.courseRequestCdo, name, value);
  }

  @action
  courseRequestOpen() {
    //
    this.courseRequestCdo = _.set(this.courseRequestCdo, 'courseState', CourseState.Opened);
    return this.coursePlanFlowApi.coursePlanRequestOpen(this.courseRequestCdo);
  }

  @action
  courseRequestReject() {
    //
    this.courseRequestCdo = _.set(this.courseRequestCdo, 'courseState', CourseState.Rejected);
    return this.coursePlanFlowApi.coursePlanRequestReject(this.courseRequestCdo);
  }


  makeCoursePlan(coursePlan: CoursePlanModel, coursePlanContents: CoursePlanContentsModel) {
    //
    return this.coursePlanFlowApi.makeCoursePlan(
      new CoursePlanFlowCdoModel(
        CoursePlanModel.asCdo(coursePlan),
        CoursePlanContentsModel.asCdo(coursePlanContents)
      )
    );
  }

  modifyCoursePlanFlow(coursePlanId: string, coursePlan: CoursePlanModel, coursePlanContents: CoursePlanContentsModel) {
    //
    this.coursePlanFlowApi.modifyCoursePlan(coursePlanId, new CoursePlanFlowUdoModel(coursePlan, coursePlanContents));
  }

  removeCoursePlanFlow(coursePlanId: string) {
    //
    this.coursePlanFlowApi.removeCoursePlan(coursePlanId);
  }

  @action
  changeCoursePlanListModalOpen(open: boolean) {
    //
    this.coursePlanListModalOpen = open;
  }

  @action
  changeCoursePlanQueryProps(name: string, value: string | Date | number, nameSub?: string, valueSub?: string | number) {
    //
    this.coursePlanQuery = _.set(this.coursePlanQuery, name, value);
    if (typeof value === 'object' && nameSub) {
      this.coursePlanQuery = _.set(this.coursePlanQuery, nameSub, valueSub);
    }
  }

  @action
  clearCoursePlanQuery() {
    //
    this.coursePlanQuery = new CoursePlanQueryModel();
  }

  @action
  setIsPopup() {
    //
    this.coursePlanQuery = _.set(this.coursePlanQuery, 'isPopup', false);
  }

  @action
  changeCardSetProps(cardSet: LearningCardModel[]) {
    this.cardSet = cardSet;
  }

  @action
  changeCardIdSetProps(cardSet: string[]) {
    this.cardIdSet = cardSet;
  }

  @action
  changeCourseSetProps(courseSet: CoursePlanModel[]) {
    this.courseSet = courseSet;
  }

  @action
  changeCourseIdSetProps(courseIdSet: string[]) {
    this.courseIdSet = courseIdSet;
  }

  @action
  changeIsSelectedCardSet() {
    this.isSelectedCardSet = !!this.cardSet.length;
  }

  @action
  changeIsSelectedCourseSet() {
    this.isSelectedCourseSet = !!this.courseSet.length;
  }

  @action
  changeChannelsMapProps(channelsMap: Map<IdName, IdName[]>) {
    //
    this.channelsMap = channelsMap;
  }

  @action
  setCardSet(cardSet: LearningCardModel) {
    //
    this.cardSet = [...this.cardSet].concat([cardSet]);
  }

  @action
  setCourseSet(courseSet: CoursePlanModel) {
    //
    this.courseSet = [...this.courseSet].concat([courseSet]);
  }

  @action
  async findAllPrecedenceCourseList( coursePlanId: string) {
    const precedenceSet = await this.coursePlanApi.findAllPrecedenceCourseList( coursePlanId );
    if (precedenceSet) {
      return precedenceSet.results;
      /*return runInAction( () => {
        this.preCourseSet = precedenceSet.results.map(result => new CoursePlanModel(result));
      });*/
    } else {
      return null;
    }
  }

  @action
  async findAllPreCourseIdList( coursePlanId: string) {
    const preCourseIdSet = await this.coursePlanApi.findAllPreCourseIdList( coursePlanId );
    if (preCourseIdSet) {
      console.log( 'preCourseIdSet : ', preCourseIdSet );
      this.preCourseIdSet = preCourseIdSet;
      return preCourseIdSet;
    } else {
      return null;
    }
  }
}

Object.defineProperty(CoursePlanService, 'instance', {
  value: new CoursePlanService(CoursePlanApi.instance, CoursePlanFlowApi.instance),
  writable: false,
  configurable: false,
});

export default CoursePlanService;
