
import { IObservableArray, observable, action, computed, runInAction } from 'mobx';
import { autobind, CachingFetch, Offset } from '@nara.platform/accent';
import { OffsetElementList } from 'shared/model';
import InMyLectureModelV2 from 'myTraining/model/InMyLectureModelV2';
import InMyLectureFilterRdoModel from 'myTraining/model/InMyLectureFilterRdoModel';
import { FilterCondition } from 'myTraining/ui/view/filterbox/MultiFilterBox';
import { Direction } from 'myTraining/ui/view/table/MyLearningTableHeader';
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

  /////////////////////////////////////// 개편 ///////////////////////////////////////
  @observable
  _inMyLectureV2s: InMyLectureModelV2[] = [];

  @observable
  _inMyLectureV2Count: number = 0;

  @observable
  inMyListCount: number = 0;

  inMyLectureFilterRdo: InMyLectureFilterRdoModel = new InMyLectureFilterRdoModel();

  /////////////////////////////////////// 개편 ///////////////////////////////////////

  @observable
  _inMyLectureAll: InMyLectureModel[] = [];

  inMyLectureAllCachingFetch: CachingFetch = new CachingFetch(2000);

  @observable
  inMyLecture: InMyLectureModel = new InMyLectureModel();

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

  /**
   * 관심목록 총 갯수(관심목록탭 숫자 표기시 사용)
   */
  @computed
  get inMyLectureAllCount() {
    //
    return this._inMyLectureAll.length;
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

  @action
  async addInMyLecture(inMyLectureCdoModel: InMyLectureCdoModel) {
    await this.inMyLectureApi.addInMyLecture(inMyLectureCdoModel).then((response) => {
      if (response && response.length > 0) {
        runInAction(() => this.findAllInMyLectures());
      }
      return response;
    }).catch((reason: any) => { return null; });
  }

  @action
  async removeInMyLecture(inMyLectureId: string) {
    await this.inMyLectureApi.removeInMyLecture(inMyLectureId).then(() => {
      return runInAction(() => this.findAllInMyLectures());
    }).catch((reason: any) => { return null; });
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
      (inMyLectures) =>
        runInAction(() => this._inMyLectureAll = inMyLectures.map((inMyLecture: InMyLectureModel) => new InMyLectureModel(inMyLecture))),
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

  /////////////////////////////////////// 개편 ///////////////////////////////////////
  @computed get inMyLectureV2s() {
    return this._inMyLectureV2s;
  }

  @computed get inMyLectureV2Count() {
    return this._inMyLectureV2Count;
  }

  @action
  clearAllInMyLectureV2s() {
    this._inMyLectureV2s = [];
    this._inMyLectureV2Count = 0;
  }

  initFilterRdo() {
    this.inMyLectureFilterRdo = new InMyLectureFilterRdoModel();
  }

  @action
  async findAllInMyLectureV2s() {
    const offsetInMyLectures = await this.inMyLectureApi.findAllInMyLectureV2s(this.inMyLectureFilterRdo);

    if (offsetInMyLectures &&
      offsetInMyLectures.results &&
      offsetInMyLectures.results.length) {
      runInAction(() => {
        this._inMyLectureV2s = offsetInMyLectures.results.map(result => new InMyLectureModelV2(result));
        this._inMyLectureV2Count = offsetInMyLectures.totalCount;
      });

      return false;
    }

    return true;
  }

  @action
  async findAllTabCount() {
    const tabCount = await this.inMyLectureApi.countInMyLectures();

    runInAction(() => this.inMyListCount = tabCount);
  }

  @action
  async findAllInMyLectureV2ByConditions() {
    const offsetInMyLectures = await this.inMyLectureApi.findAllInMyLectureV2s(this.inMyLectureFilterRdo);

    if (offsetInMyLectures &&
      offsetInMyLectures.results &&
      offsetInMyLectures.results.length) {
      runInAction(() => {
        this._inMyLectureV2s = offsetInMyLectures.results.map(result => new InMyLectureModelV2(result));
        this._inMyLectureV2Count = offsetInMyLectures.totalCount;
      });
      return false;
    }
    return true;
  }

  changeFilterRdoWithConditions(conditions: FilterCondition) {
    /* 조건이 변경되면 offset 을 초기화 해, 새롭게 조회함. */
    this.inMyLectureFilterRdo.changeConditions(conditions);
    this.inMyLectureFilterRdo.setDefaultOffset();
  }

  getFilterCount() {
    return this.inMyLectureFilterRdo.getFilterCount();
  }

  @action
  sortInMyLectureV2sBy(column: string, direction: Direction) {

    // 전달되는 컬럼이 오브젝트의 프로퍼티와 상이해, 변환해야함.
    const propKey = convertColumn(column);

    if (direction === Direction.ASC) {
      this._inMyLectureV2s = this._inMyLectureV2s.sort((a, b) => a[propKey] - b[propKey]);
      return;
    }
    if (direction === Direction.DESC) {
      this._inMyLectureV2s = this._inMyLectureV2s.sort((a, b) => b[propKey] - a[propKey]);
    }
  }

  @action
  async findAllInMyLectureV2WithPage(offset: Offset) {
    this.inMyLectureFilterRdo.changeOffset(offset);

    const offsetInMyLectures = await this.inMyLectureApi.findAllInMyLectureV2s(this.inMyLectureFilterRdo);

    if (
      offsetInMyLectures &&
      offsetInMyLectures.results &&
      offsetInMyLectures.results.length) {
      const addedInMyLectures = offsetInMyLectures.results.map(result => new InMyLectureModelV2(result));
      runInAction(() => {
        this._inMyLectureV2s = [...this._inMyLectureV2s, ...addedInMyLectures];
      });
    }
  }

  /////////////////////////////////////// 개편 ///////////////////////////////////////
}

InMyLectureService.instance = new InMyLectureService(InMyLectureApi.instance);

export default InMyLectureService;

/* globals */
const convertColumn = (column: string): any => {
  switch (column) {
    case '학습시간':
      return 'learningTime';
    case '학습시작일':
      return 'startDate';
    case '학습완료일':
    case '획득일자':
      return 'endDate';
    case '스탬프':
      return 'stampCount';
    case '등록일':
      return 'createDate';
    case '취소/미이수일':
      return '';
    default:
      return '';
  }
};