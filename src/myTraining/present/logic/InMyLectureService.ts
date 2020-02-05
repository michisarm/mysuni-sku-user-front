
import { IObservableArray, observable, action, computed, runInAction } from 'mobx';
import { autobind, CachingFetch } from '@nara.platform/accent';
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

  inMyLectureAllCachingFetch: CachingFetch = new CachingFetch(2000);

  @observable
  inMyLecture: InMyLectureModel = new InMyLectureModel();

  @observable
  inMyLecturesCount: number = 0;

  constructor(inMyLectureApi: InMyLectureApi) {
    this.inMyLectureApi = inMyLectureApi;
  }

  @computed
  get inMyLectures() {
    //
    const inMyLectures = this._inMyLectures as IObservableArray;
    return inMyLectures.peek();
  }

  @computed
  get inMyLectureAll() {
    //
    const inMyLecturesAll = this._inMyLectureAll as IObservableArray;
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

  // InMyLectures ------------------------------------------------------------------------------------------------------

  @action
  clearInMyLectures() {
    this._inMyLectures = [];
  }

  addInMyLecture(inMyLectureCdoModel: InMyLectureCdoModel) {
    return this.inMyLectureApi.addInMyLecture(inMyLectureCdoModel);
  }

  removeInMyLecture(inMyLectureId: string) {
    return this.inMyLectureApi.removeInMyLecture(inMyLectureId);
  }

  @action
  async findInMyLectures(limit: number, offset: number, channelIds: string[] = []) {
    //
    const response = await this.inMyLectureApi.findInMyLectures(InMyLectureRdoModel.new(limit, offset, channelIds));
    const lecturesOffsetElementList = new OffsetElementList<InMyLectureModel>(response);

    lecturesOffsetElementList.results = lecturesOffsetElementList.results.map((lecture) => new InMyLectureModel(lecture));

    runInAction(() => this._inMyLectures = this._inMyLectures.concat(lecturesOffsetElementList.results));
    return lecturesOffsetElementList;
  }

  // InMyLectureAll ----------------------------------------------------------------------------------------------------

  @action
  async findAllInMyLectures() {
    //
    const fetched = this.inMyLectureAllCachingFetch.fetch(
      () => this.inMyLectureApi.findAllInMyLectures(),
      (inMyLectures) => runInAction(() =>
        this._inMyLectureAll = inMyLectures.map((inMyLecture: InMyLectureModel) => new InMyLectureModel(inMyLecture))
      ),
    );

    return fetched ? this.inMyLectureAllCachingFetch.inProgressFetching : this.inMyLectureAll;
  }

  // In My Lecture -----------------------------------------------------------------------------------------------------

  @action
  async findInMyLecture(serviceId: string, serviceType: string) {
    //
    const inMyLecture = await this.inMyLectureApi.findInMyLecture(InMyLectureRdoModel.newWithSingle(serviceId, serviceType));

    runInAction(() => this.inMyLecture = new InMyLectureModel(inMyLecture));
    return inMyLecture;
  }

  @action
  async addInMyLectureInAllList(serviceId: string, serviceType: string) {
    //
    const inMyLecture = await this.inMyLectureApi.findInMyLecture(InMyLectureRdoModel.newWithSingle(serviceId, serviceType));

    runInAction(() => this._inMyLectureAll.push(new InMyLectureModel(inMyLecture)));
    return inMyLecture;
  }

  @action
  removeInMyLectureInAllList(serviceId: string, serviceType: string) {
    //
    const index = this._inMyLectureAll.findIndex(inMyLecture => inMyLecture.serviceId === serviceId && inMyLecture.serviceType === serviceType);
    if (index >= 0) {
      this._inMyLectureAll = this._inMyLectureAll.slice(0, index).concat(this._inMyLectureAll.slice(index + 1));
    }
  }

  /**
   * 관심목록 갯수 조회
   */
  @action
  async countInMyLectures()
  {
    const count = await this.inMyLectureApi.countInMyLectures();

    runInAction(() => {
      this.inMyLecturesCount = count;
    });
  }

}

InMyLectureService.instance = new InMyLectureService(InMyLectureApi.instance);

export default InMyLectureService;
