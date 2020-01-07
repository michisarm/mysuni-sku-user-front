import { action, computed, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import { OffsetElementList } from 'shared';
import LectureApi from '../apiclient/LectureApi';
import LectureModel from '../../model/LectureModel';
import LectureRdoModel from '../../model/LectureRdoModel';
import LectureViewModel from '../../model/LectureViewModel';
import RecommendLectureRdo from '../../model/RecommendLectureRdo';
import CommunityLectureRdoModel from '../../model/CommunityLectureRdoModel';
import InstructorRdoModel from '../../model/InstructorRdoModel';
import OrderByType from '../../model/OrderByType';


@autobind
class LectureService {
  //
  static instance: LectureService;

  private lectureApi: LectureApi;

  @observable
  _lectures: LectureModel[] = [];

  @observable
  _recommendLectures: RecommendLectureRdo[] = [];

  @observable
  recommendLecture: RecommendLectureRdo = new RecommendLectureRdo();

  @observable
  _lectureViews: LectureViewModel[] = [];

  @observable
  subLectureViewsMap: Map<string, LectureViewModel[]> = new Map();


  constructor(lectureApi: LectureApi) {
    this.lectureApi = lectureApi;
  }

  @computed
  get lectures() {
    //
    const lectures = this._lectures as any;
    return lectures.peek();
  }

  @computed
  get recommendLectures() {
    //
    const recommendLectures = this._recommendLectures as any;
    return recommendLectures.peek();
  }

  @computed
  get lectureViews() {
    //
    const lectureViews = this._lectureViews as any;
    return lectureViews.peek();
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

    return runInAction(() => {
      this._lectures = this._lectures.concat(lectureOffsetElementList.results);
      return lectureOffsetElementList;
    });
  }

  @action
  async findPagingChannelLectures(channelId: string, limit: number, offset: number, orderBy: OrderByType) {
    //
    const response = await this.lectureApi.findAllLectures(LectureRdoModel.newWithChannel(channelId, limit, offset, orderBy));
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(response);

    lectureOffsetElementList.results = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));

    return runInAction(() => {
      this._lectures = this._lectures.concat(lectureOffsetElementList.results);
      return lectureOffsetElementList;
    });
  }

  @action
  async findPagingCommunityLectures(limit: number, offset: number) {
    //
    const response = await this.lectureApi.findAllCommunityLectures(CommunityLectureRdoModel.new(limit, offset));
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(response);

    lectureOffsetElementList.results = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));

    return runInAction(() => {
      this._lectures = this._lectures.concat(lectureOffsetElementList.results);
      return lectureOffsetElementList;
    });
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

    return runInAction(() => {
      this._lectures = this._lectures.concat(lectureOffsetElementList.results);
      return lectureOffsetElementList;
    });

  }

  @action
  async findPagingSharedLectures(limit: number, offset: number) {
    //
    const response = await this.lectureApi.findAllSharedLectures(LectureRdoModel.newShared(limit, offset));
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(response);

    lectureOffsetElementList.results = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));

    return runInAction(() => {
      this._lectures = this._lectures.concat(lectureOffsetElementList.results);
      return lectureOffsetElementList;
    });

  }

  @action
  async findPagingRecommendLectures(limit: number, offset: number, channelId?: string, orderBy?: OrderByType) {
    //
    const recommendLectures = await this.lectureApi.findAllRecommendLectures(LectureRdoModel.newRecommend(limit, offset, channelId, orderBy));

    return runInAction(() => {
      this._recommendLectures = recommendLectures.map(recommendLecture => new RecommendLectureRdo(recommendLecture));
      return recommendLectures;
    });
  }

  @action
  async addPagingRecommendLectures(limit: number, offset: number, channelId?: string, orderBy?: OrderByType) {
    //
    const recommendLectures = await this.lectureApi.findAllRecommendLectures(LectureRdoModel.newRecommend(limit, offset, channelId, orderBy));

    return runInAction(() => {
      if (recommendLectures && recommendLectures.length && recommendLectures.length === 1) {
        const recommendLecture = recommendLectures[0];
        recommendLecture.lectures.results = recommendLecture.lectures.results.map(result => new LectureModel(result));
        this.recommendLecture.lectures.results = this.recommendLecture.lectures.results.concat(recommendLecture.lectures.results);
        return recommendLecture.lectures;
      }
      return null;
    });
  }
}

LectureService.instance = new LectureService(LectureApi.instance);

export default LectureService;
