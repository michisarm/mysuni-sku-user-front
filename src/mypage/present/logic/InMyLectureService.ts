
import { observable, action, computed, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
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
  _inMyLectureAll: InMyLectureModel[] = [];

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

  @computed
  get inMyLectureAll() {
    //
    const inMyLecturesAll = this._inMyLectureAll as any;
    return inMyLecturesAll.peek();
  }

  @computed
  get inMyLectureMap() {
    const map = new Map<string, InMyLectureModel>();

    this._inMyLectureAll.forEach(inMyLecture => {
      map.set(inMyLecture.serviceId, inMyLecture);
    });

    return map;
  }

  // In My Lectures ----------------------------------------------------------------------------------------------------

  @action
  clear() {
    this._inMyLectures = [];
  }

  addInMyLecture(inMyLectureCdoModel: InMyLectureCdoModel) {
    return this.inMyLectureApi.addInMyLecture(inMyLectureCdoModel);
  }

  removeInMyLecture(inMyLectureId: string) {
    return this.inMyLectureApi.removeInMyLecture(inMyLectureId);
  }

  @action
  async findInMyLectures(limit: number, offset: number) {
    //
    const response = await this.inMyLectureApi.findInMyLectures(InMyLectureRdoModel.new(limit, offset));
    const lecturesOffsetElementList = new OffsetElementList<InMyLectureModel>(response);

    lecturesOffsetElementList.results = lecturesOffsetElementList.results.map((lecture) => new InMyLectureModel(lecture));

    runInAction(() => this._inMyLectures = this._inMyLectures.concat(lecturesOffsetElementList.results));
    return lecturesOffsetElementList;
  }

  @action
  async findAllInMyLectures() {
    //
    const inMyLectures = await this.inMyLectureApi.findAllInMyLectures();

    runInAction(() => this._inMyLectureAll = inMyLectures.map(inMyLecture => new InMyLectureModel(inMyLecture)));
    return inMyLectures;
  }

  // In My Lecture -----------------------------------------------------------------------------------------------------

  @action
  async findInMyLecture(serviceId: string, serviceType: string) {
    //
    const inMyLecture = await this.inMyLectureApi.findInMyLecture(InMyLectureRdoModel.newWithSingle(serviceId, serviceType));

    runInAction(() => this.inMyLecture = new InMyLectureModel(inMyLecture));
    return inMyLecture;
  }

}

InMyLectureService.instance = new InMyLectureService(InMyLectureApi.instance);

export default InMyLectureService;
