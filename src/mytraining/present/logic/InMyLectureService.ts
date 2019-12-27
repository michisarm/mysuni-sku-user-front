
import { observable, action, computed, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
import { OffsetElementList } from 'shared';
import InMyLectureApi from '../apiclient/InMyLectureApi';
import InMyLectureModel from '../../model/InMyLectureModel';
import InMyLectureRdoModel from '../../model/InMyLectureRdoModel';


@autobind
class InMyLectureService {
  //
  static instance: InMyLectureService;

  private inMyLectureApi: InMyLectureApi;

  @observable
  _inMyLectures: InMyLectureModel[] = [];

  constructor(inMyLectureApi: InMyLectureApi) {
    this.inMyLectureApi = inMyLectureApi;
  }

  @computed
  get inMyLectures() {
    //
    const inMyLectures = this._inMyLectures as any;
    return inMyLectures.peek();
  }

  // In My Lectures ----------------------------------------------------------------------------------------------------------

  @action
  async findAllInMyLectures(limit: number, offset: number) {
    //
    const response = await this.inMyLectureApi.findAllInMyLectures(InMyLectureRdoModel.new(limit, offset));
    const lecturesOffsetElementList = new OffsetElementList<InMyLectureModel>(response);

    lecturesOffsetElementList.results = lecturesOffsetElementList.results.map((lecture) => new InMyLectureModel(lecture));

    return runInAction(() => {
      this._inMyLectures = this._inMyLectures.concat(lecturesOffsetElementList.results);
      return lecturesOffsetElementList;
    });
  }
}

InMyLectureService.instance = new InMyLectureService(InMyLectureApi.instance);

export default InMyLectureService;
