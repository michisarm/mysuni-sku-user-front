
import { observable, action, computed, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
import { OffsetElementList } from 'shared';
import InMyLectureApi from '../apiclient/InMyLectureApi';
import InMyLectureModel from '../../model/InMyLectureModel';
import InMyLectureRdoModel from '../../model/InMyLectureRdoModel';
import InMyLectureCdoModel from '../../model/InMyLectureCdoModel';


@autobind
class InMyLectureService {
  //
  static instance: InMyLectureService;

  private inMyLectureApi: InMyLectureApi;

  @observable
  _inMyLectures: InMyLectureModel[] = [];

  @observable
  inMyLecture: InMyLectureModel = new InMyLectureModel();

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
  addInMyLecture(inMyLectureCdoModel: InMyLectureCdoModel) {
    return this.inMyLectureApi.addInMyLecture(inMyLectureCdoModel);
  }

  removeInMyLecture(inMyLectureId: string) {
    return this.inMyLectureApi.removeInMyLecture(inMyLectureId);
  }

  @action
  async findInMyLecture(serviceId: string, serviceType: string) {
    const inMyLecture = await this.inMyLectureApi.findInMyLecture(InMyLectureRdoModel.newWithSingle(serviceId, serviceType));
    runInAction(() => {
      this.inMyLecture = new InMyLectureModel(inMyLecture);
      return inMyLecture;
    });
  }

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

  @action
  clear() {
    this._inMyLectures = [];
  }

  @computed
  get inMyLectureMap() {
    const map = new Map<string, InMyLectureModel>();

    this._inMyLectures.forEach(inMyLecture => {
      map.set(inMyLecture.serviceId, inMyLecture);
    });

    return map;
  }
}

InMyLectureService.instance = new InMyLectureService(InMyLectureApi.instance);

export default InMyLectureService;
