
import { observable, action, computed, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
import { OffsetElementList } from 'shared';
import LectureApi from '../apiclient/LectureApi';
import LectureModel from '../../model/LectureModel';
import LectureRdoModel from '../../model/LectureRdoModel';
import LectureViewModel from '../../model/LectureViewModel';


@autobind
class LectureService {
  //
  static instance: LectureService;

  private lectureApi: LectureApi;

  @observable
  _lectures: LectureModel[] = [];

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
  get lectureViews() {
    //
    const lectureViews = this._lectureViews as any;
    return lectureViews.peek();
  }


  // Lectures ----------------------------------------------------------------------------------------------------------

  @action
  async findPagingCollegeLectures(collegeId: string, limit: number, offset: number) {
    //
    const response = await this.lectureApi.findAllLectures(LectureRdoModel.newWithCollege(collegeId, limit, offset));
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(response);

    lectureOffsetElementList.results = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));

    return runInAction(() => {
      this._lectures = this._lectures.concat(lectureOffsetElementList.results);
      return lectureOffsetElementList;
    });
  }

  @action
  async findPagingChannelLectures(channelId: string, limit: number, offset: number) {
    //
    const response = await this.lectureApi.findAllLectures(LectureRdoModel.newWithChannel(channelId, limit, offset));
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(response);

    lectureOffsetElementList.results = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));

    return runInAction(() => {
      this._lectures = this._lectures.concat(lectureOffsetElementList.results);
      return lectureOffsetElementList;
    });
  }

  @action
  async findLectureViews(lectureCardUsids: string[], courseLectureUsids?: string[]) {
    //
    const lectureViews = await this.lectureApi.findLectureViews(lectureCardUsids, courseLectureUsids);

    runInAction(() => this._lectureViews = lectureViews);
    return lectureViews;
  }

  @action
  async findSubLectureViews(courseId: string, lectureCardIds: string[], courseLectureIds?: string[]) {
    //
    const lectureViews = await this.lectureApi.findLectureViews(lectureCardIds, courseLectureIds);

    runInAction(() => this.subLectureViewsMap.set(courseId, lectureViews));
    return lectureViews;
  }

  @action
  clear() {
    //
    return runInAction(() => this._lectures = []);
  }

  getSubLectureViews(courseId: string) {
    //
    return this.subLectureViewsMap.get(courseId) || [];
  }
}

LectureService.instance = new LectureService(LectureApi.instance);

export default LectureService;
