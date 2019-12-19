
import { observable, action, computed, runInAction } from 'mobx';
import LectureModel from '../../model/LectureModel';
import LectureRdoModel from '../../model/LectureRdoModel';
import LectureApi from '../apiclient/LectureApi';


class LectureService {
  //
  static instance: LectureService;

  private lectureApi: LectureApi;

  @observable
  _lectures: LectureModel[] = [];

  @observable
  offset: number = 0;


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
    const lectureOffsetElementList = await this.lectureApi.findAllLectures(LectureRdoModel.newWithCollege(collegeId, limit, offset));

    console.log('LectureService.findCollegeLectures', lectureOffsetElementList);
    return runInAction(() => this._lectures = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture)));
  }

  @action
  async findChannelLectures(channelId: string, limit: number, offset: number) {
    //
    const lectureOffsetElementList = await this.lectureApi.findAllLectures(LectureRdoModel.newWithChannel(channelId, limit, offset));

    console.log('LectureService.findChannelLectures', lectureOffsetElementList);
    return runInAction(() => this._lectures = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture)));
  }

}

LectureService.instance = new LectureService(LectureApi.instance);

export default LectureService;
