
import { observable, action, computed, runInAction } from 'mobx';
import { OffsetElementList } from 'shared';
import LectureApi from '../apiclient/LectureApi';
import LectureModel from '../../model/LectureModel';
import LectureRdoModel from '../../model/LectureRdoModel';


class LectureService {
  //
  static instance: LectureService;

  private lectureApi: LectureApi;

  @observable
  _lectures: LectureModel[] = [];


  constructor(lectureApi: LectureApi) {
    this.lectureApi = lectureApi;
  }

  @computed
  get lectures() {
    //
    const lectures = this._lectures as any;
    return lectures.peek();
  }

  // Lectures ----------------------------------------------------------------------------------------------------------

  @action
  async findCollegeLectures(collegeId: string, limit: number, offset: number) {
    //
    const response = await this.lectureApi.findAllLectures(LectureRdoModel.newWithCollege(collegeId, limit, offset));
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(response);

    return runInAction(() => {
      this._lectures = lectureOffsetElementList.results;
      return lectureOffsetElementList;
    });
  }

  @action
  async findChannelLectures(channelId: string, limit: number, offset: number) {
    //
    const response = await this.lectureApi.findAllLectures(LectureRdoModel.newWithChannel(channelId, limit, offset));
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(response);

    return runInAction(() => {
      this._lectures = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture));
      return lectureOffsetElementList;
    });
  }
}

LectureService.instance = new LectureService(LectureApi.instance);

export default LectureService;
