import { action, computed, IObservableArray, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import { OffsetElementList } from 'shared';
import LectureApi from '../apiclient/LectureApi';
import LectureFlowApi from '../apiclient/LectureFlowApi';
import StudentFlowApi from '../apiclient/StudentFlowApi';
import LectureModel from '../../model/LectureModel';
import LectureRdoModel from '../../model/LectureRdoModel';
import LectureViewModel from '../../model/LectureViewModel';
import RecommendLectureRdo from '../../model/RecommendLectureRdo';
import RecommendLectureListRdo from '../../model/RecommendLectureListRdo';
import CommunityLectureRdoModel from '../../model/CommunityLectureRdoModel';
import InstructorRdoModel from '../../model/InstructorRdoModel';
import OrderByType from '../../model/OrderByType';
import LectureFilterRdoModel from '../../model/LectureFilterRdoModel';
import SharedRdoModel from '../../model/SharedRdoModel';
import StudentCdoModel from '../../model/StudentCdoModel';


@autobind
class LectureService {
  //
  static instance: LectureService;

  private lectureApi: LectureApi;

  private lectureFlowApi: LectureFlowApi;

  private studentFlowApi: StudentFlowApi;


  @observable
  _lectures: LectureModel[] = [];

  // @observable
  // _recommendLectures: RecommendLectureRdo[] = [];

  @observable
  _recommendLectureListRdo: RecommendLectureListRdo = new RecommendLectureListRdo();


  @observable
  recommendLecture: RecommendLectureRdo = new RecommendLectureRdo();

  @observable
  _lectureViews: LectureViewModel[] = [];

  @observable
  subLectureViewsMap: Map<string, LectureViewModel[]> = new Map();


  constructor(lectureApi: LectureApi, lectureFlowApi: LectureFlowApi, studentFlowApi: StudentFlowApi) {
    this.lectureApi = lectureApi;
    this.lectureFlowApi = lectureFlowApi;
    this.studentFlowApi = studentFlowApi;
  }

  @computed
  get lectures() {
    //
    return (this._lectures as IObservableArray).peek();
  }

  @computed
  get recommendLectures() {
    //
    return (this._recommendLectureListRdo.recommendLectureRdos as IObservableArray).peek();
  }

  @computed
  get recommendLecturesCount() {
    return this._recommendLectureListRdo.totalCount;
  }

  @computed
  get lectureViews() {
    //
    return (this._lectureViews as IObservableArray).peek();
  }


  // Lectures ----------------------------------------------------------------------------------------------------------

  @action
  clearLectures() {
    //
    return runInAction(() => this._lectures = []);
  }

  @action
  async findPagingCollegeLectures(collegeId: string, limit: number, offset: number, orderBy: OrderByType) {
    //
    const response = await this.lectureApi.findAllLectures(LectureRdoModel.newWithCollege(collegeId, limit, offset, orderBy));
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(response);

    lectureOffsetElementList.results = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));

    runInAction(() => this._lectures = this._lectures.concat(lectureOffsetElementList.results));
    return lectureOffsetElementList;
  }

  @action
  async findPagingChannelLectures(channelId: string, limit: number, offset: number, orderBy: OrderByType) {
    //
    const response = await this.lectureApi.findAllLectures(LectureRdoModel.newWithChannel(channelId, limit, offset, orderBy));
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(response);

    lectureOffsetElementList.results = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));

    runInAction(() => this._lectures = this._lectures.concat(lectureOffsetElementList.results));
    return lectureOffsetElementList;
  }

  @action
  async findPagingCommunityLectures(limit: number, offset: number) {
    //
    const response = await this.lectureApi.findAllCommunityLectures(CommunityLectureRdoModel.new(limit, offset));
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(response);

    lectureOffsetElementList.results = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));

    runInAction(() => this._lectures = this._lectures.concat(lectureOffsetElementList.results));
    return lectureOffsetElementList;
  }

  @action
  async findPagingRequiredLectures(limit: number, offset: number, channelIds: string[] = []) {
    //
    const response = await this.lectureFlowApi.findRequiredLectures(LectureFilterRdoModel.new(limit, offset, channelIds));
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(response);

    lectureOffsetElementList.results = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));

    runInAction(() => this._lectures = this._lectures.concat(lectureOffsetElementList.results));
    return lectureOffsetElementList;
  }

  // LectureViews ------------------------------------------------------------------------------------------------------

  @action
  clearLectureViews() {
    //
    return runInAction(() => this._lectureViews = []);
  }

  @action
  async findLectureViews(coursePlanId: string, lectureCardUsids: string[], courseLectureUsids?: string[]) {
    //
    const lectureViews = await this.lectureApi.findLectureViews(coursePlanId, lectureCardUsids, courseLectureUsids);

    runInAction(() => this._lectureViews = lectureViews);
    return lectureViews;
  }

  // SubLectureViewMap -------------------------------------------------------------------------------------------------

  @action
  async findSubLectureViews(courseId: string, coursePlanId: string, lectureCardIds: string[], courseLectureIds?: string[]) {
    //
    const lectureViews = await this.lectureApi.findLectureViews(coursePlanId, lectureCardIds, courseLectureIds);

    runInAction(() => this.subLectureViewsMap.set(courseId, lectureViews));
    return lectureViews;
  }

  getSubLectureViews(courseId: string) {
    //
    return this.subLectureViewsMap.get(courseId) || [];
  }

  @action
  async findAllLecturesByInstructorId(instructorId: string, limit: number, offset: number) {
    //
    const response = await this.lectureApi.findAllLecturesByInstructorId(InstructorRdoModel.new(instructorId, limit, offset));
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(response);

    lectureOffsetElementList.results = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));

    runInAction(() => this._lectures = this._lectures.concat(lectureOffsetElementList.results));
    return lectureOffsetElementList;
  }

  @action
  async findPagingSharedLectures(limit: number, offset: number, channelIds: string[] = []) {
    //
    const response = await this.lectureApi.findAllSharedLectures(SharedRdoModel.newShared(limit, offset, channelIds));
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(response);

    lectureOffsetElementList.results = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));

    runInAction(() => this._lectures = this._lectures.concat(lectureOffsetElementList.results));
    return lectureOffsetElementList;
  }

  @action
  async findPagingRecommendLectures(
    channelLimit: number, limit: number, channelId?: string, orderBy?: OrderByType
  ) {
    //
    const lectureRdo = LectureRdoModel.newRecommend(channelLimit, 0, limit, 0, channelId, orderBy);
    const recommendLectureListRdo = await this.lectureFlowApi.findAllRecommendLectures(lectureRdo);

    runInAction(() => this._recommendLectureListRdo = recommendLectureListRdo);
    return recommendLectureListRdo;
  }

  @action
  async addFindPagingRecommendLectures(
    channelLimit: number, channelOffset: number, limit: number, offset: number, channelId?: string, orderBy?: OrderByType
  ) {
    //
    const lectureRdo = LectureRdoModel.newRecommend(channelLimit, channelOffset, limit, offset, channelId, orderBy);
    const recommendLectureListRdo = await this.lectureFlowApi.findAllRecommendLectures(lectureRdo);

    runInAction(() => {
      this._recommendLectureListRdo.totalCount = recommendLectureListRdo.totalCount;
      this._recommendLectureListRdo.recommendLectureRdos = this._recommendLectureListRdo.recommendLectureRdos
        .concat(recommendLectureListRdo.recommendLectureRdos);
    });
    return recommendLectureListRdo;
  }

  @action
  async addPagingRecommendLectures(
    channelLimit: number, channelOffset: number, limit: number, offset: number, channelId?: string, orderBy?: OrderByType
  ) {
    //
    const lectureRdo = LectureRdoModel.newRecommend(channelLimit, channelOffset, limit, offset, channelId, orderBy);
    const recommendLectureListRdo = await this.lectureFlowApi.findAllRecommendLectures(lectureRdo);

    if (recommendLectureListRdo.recommendLectureRdos && recommendLectureListRdo.recommendLectureRdos.length === 1) {
      const recommendLecture = recommendLectureListRdo.recommendLectureRdos[0];

      runInAction(() => this.recommendLecture.lectures.results = this.recommendLecture.lectures.results.concat(recommendLecture.lectures.results));
      return recommendLecture.lectures;
    }
    return null;
  }

  async confirmUsageStatisticsByCardId(studentCdo: StudentCdoModel) {
    //
    return this.studentFlowApi.confirmUsageStatisticsByCardId(studentCdo);
  }
}

LectureService.instance = new LectureService(LectureApi.instance, LectureFlowApi.instance, StudentFlowApi.instance);

export default LectureService;
