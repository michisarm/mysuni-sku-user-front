
import { observable, action, computed, runInAction } from 'mobx';
import LectureModel from '../../model/LectureModel';
import LectureApi from '../apiclient/LectureApi';


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
  async findAllLectures(offset?: number, limit?: number) {
    //
    const lectureOffsetElementList = await this.lectureApi.findAllLectures(offset, limit);

    console.log('LectureService.findAllLecture', lectureOffsetElementList);
    return runInAction(() => this._lectures = lectureOffsetElementList.results.map((lecture) => new LectureModel(lecture)));
  }

}

LectureService.instance = new LectureService(LectureApi.instance);

export default LectureService;
