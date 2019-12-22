import { action, observable, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
import { OffsetElementList } from '@nara.platform/accent';
import _ from 'lodash';
import { IdName } from 'shared';
import CoursePlanApi from '../apiclient/CoursePlanApi';
import { CoursePlanModel } from '../../model/CoursePlanModel';
import { CoursePlanContentsModel } from '../../model/CoursePlanContentsModel';
import CoursePlanFlowApi from '../apiclient/CoursePlanFlowApi';
import { CoursePlanFlowCdoModel } from '../../model/CoursePlanFlowCdoModel';
import { CoursePlanFlowUdoModel } from '../../model/CoursePlanFlowUdoModel';
import { CoursePlanQueryModel } from '../../model/CoursePlanQueryModel';
import { LearningCardModel } from '../../model/LearningCardModel';
import { CourseState } from '../../../shared/model/CourseState';
import { CourseRequestCdoModel } from '../../model/CourseRequestCdoModel';

@autobind
export default class CoursePlanService {
  //
  static instance: CoursePlanService;

  coursePlanApi: CoursePlanApi;
  coursePlanFlowApi: CoursePlanFlowApi;

  @observable
  coursePlan: CoursePlanModel = new CoursePlanModel();

  @observable
  coursePlans: OffsetElementList<CoursePlanModel> = { results: [], totalCount: 0 };

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

  constructor(coursePlanApi: CoursePlanApi, coursePlanFlowApi: CoursePlanFlowApi) {
    this.coursePlanApi = coursePlanApi;
    this.coursePlanFlowApi = coursePlanFlowApi;
  }

  registerCoursePlan(coursePlan: CoursePlanModel) {
    //
    return this.coursePlanApi.registerCoursePlan(coursePlan);
  }

  @action
  async findCoursePlan(coursePlanId: string) {
    //
    const coursePlan = await this.coursePlanApi.findCoursePlan(coursePlanId);
    return runInAction(() => {
      this.coursePlan = new CoursePlanModel(coursePlan);
      return coursePlan;
    });
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

  modifyCoursePlan(coursePlanId: string, coursePlan: CoursePlanModel) {
    //
    this.coursePlanApi.modifyCoursePlan(coursePlanId, CoursePlanModel.asNameValues(coursePlan));
  }

  @action
  changeCoursePlanProps(name: string, value: string | {}) {
    //
    this.coursePlan = _.set(this.coursePlan, name, value);
  }

  @action
  cleanCoursePlan() {
    //
    this.coursePlan = new CoursePlanModel();
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
}

Object.defineProperty(CoursePlanService, 'instance', {
  value: new CoursePlanService(CoursePlanApi.instance, CoursePlanFlowApi.instance),
  writable: false,
  configurable: false,
});
