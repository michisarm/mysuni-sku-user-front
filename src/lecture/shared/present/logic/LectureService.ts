import {
  action,
  computed,
  IObservableArray,
  observable,
  runInAction,
} from 'mobx';
import { autobind, Offset } from '@nara.platform/accent';
import { OffsetElementList } from 'shared/model';
import { FilterCondition } from 'myTraining/ui/view/filterbox/MultiFilterBox';
import { Direction } from 'myTraining/ui/view/table/MyLearningTableHeader';
import FilterCountViewModel from 'myTraining/model/FilterCountViewModel';
import LectureApi from '../apiclient/LectureApi';
import LectureFlowApi from '../apiclient/LectureFlowApi';
import StudentFlowApi from '../apiclient/StudentFlowApi';
import LectureModel from '../../../model/LectureModel';
import LectureRdoModel from '../../../model/LectureRdoModel';
import LectureViewModel from '../../../model/LectureViewModel';
import RecommendLectureRdo from '../../../model/RecommendLectureRdo';
import RecommendLectureListRdo from '../../../model/RecommendLectureListRdo';
import CommunityLectureRdoModel from '../../../model/CommunityLectureRdoModel';
import InstructorRdoModel from '../../../model/InstructorRdoModel';
import OrderByType from '../../../model/OrderByType';
import LectureFilterRdoModel from '../../../model/LectureFilterRdoModel';
import SharedRdoModel from '../../../model/SharedRdoModel';
import StudentCdoModel from '../../../model/StudentCdoModel';
import LectureTableViewModel from '../../../model/LectureTableViewModel';
import LectureFilterRdoModelV2 from '../../../model/LectureFilterRdoModelV2';




@autobind
class LectureService {
  //
  static instance: LectureService;

  private lectureApi: LectureApi;

  private lectureFlowApi: LectureFlowApi;

  private studentFlowApi: StudentFlowApi;

  @observable
  _lectures: LectureModel[] = [];

  @observable
  totalLectureCount: number = 0;

  // @observable
  // _recommendLectures: RecommendLectureRdo[] = [];

  // 추천과정 리스트
  @observable
  _recommendLectureListRdo: RecommendLectureListRdo = new RecommendLectureListRdo();

  // 추천과정
  @observable
  recommendLecture: RecommendLectureRdo = new RecommendLectureRdo();

  @observable
  _lectureViews: LectureViewModel[] = [];

  // 


  //

  @action
  setLectureViews(views: any) {
    this._lectureViews = views;
  }

  @observable
  subLectureViewsMap: Map<string, LectureViewModel[]> = new Map();

  @action
  setSubLectureViews(courseId: string, lectureViews: LectureViewModel[]) {
    // console.log('courseId : ', courseId, 'lectureViews, ', lectureViews);
    runInAction(() => this.subLectureViewsMap.set(courseId, lectureViews));
  }

  // 권장과정
  @observable
  requiredLecturesCount: number = 0;

  constructor(
    lectureApi: LectureApi,
    lectureFlowApi: LectureFlowApi,
    studentFlowApi: StudentFlowApi
  ) {
    this.lectureApi = lectureApi;
    this.lectureFlowApi = lectureFlowApi;
    this.studentFlowApi = studentFlowApi;
  }

  @computed
  get lectures(): LectureModel[] {
    //
    const lectures = this._lectures as IObservableArray;
    return lectures.peek();
  }

  @computed
  get recommendLectures() {
    //
    return (this._recommendLectureListRdo
      .recommendLectureRdos as IObservableArray).peek();
  }

  @computed
  get recommendLecturesCount() {
    return this._recommendLectureListRdo.totalCount;
  }

  @computed
  get lectureViews() {
    //
    return (this._lectureViews as IObservableArray).peek();
  }

  // @computed
  // get preLectureViews() {
  //   //
  //   return (this._preLectureViews as IObservableArray).peek();
  // }

  // Lectures ----------------------------------------------------------------------------------------------------------

  @action
  clearLectures() {
    //
    return runInAction(() => (this._lectures = []));
  }

  @action
  async findPagingCollegeLectures(
    collegeId: string,
    limit: number,
    offset: number,
    orderBy: OrderByType
  ) {
    //
    const response = await this.lectureApi.findAllLectures(
      LectureRdoModel.newWithCollege(collegeId, limit, offset, orderBy)
    );
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(
      response
    );

    lectureOffsetElementList.results = lectureOffsetElementList.results.map(
      lecture => new LectureModel(lecture)
    );

    runInAction(
      () =>
        (this._lectures = this._lectures.concat(
          lectureOffsetElementList.results
        ))
    );
    return lectureOffsetElementList;
  }

  @action
  async findPagingChannelLectures(
    channelId: string,
    limit: number,
    offset: number,
    orderBy: OrderByType
  ) {
    //
    const response = await this.lectureApi.findAllLectures(
      LectureRdoModel.newWithChannel(channelId, limit, offset, orderBy)
    );
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(
      response
    );

    lectureOffsetElementList.results = lectureOffsetElementList.results.map(
      lecture => new LectureModel(lecture)
    );

    runInAction(
      () =>
        (this._lectures = this._lectures.concat(
          lectureOffsetElementList.results
        ))
    );
    return lectureOffsetElementList;
  }

  @action
  async findPagingCommunityLectures(limit: number, offset: number) {
    //
    const response = await this.lectureApi.findAllCommunityLectures(
      CommunityLectureRdoModel.new(limit, offset)
    );
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(
      response
    );

    lectureOffsetElementList.results = lectureOffsetElementList.results.map(
      lecture => new LectureModel(lecture)
    );

    runInAction(
      () =>
        (this._lectures = this._lectures.concat(
          lectureOffsetElementList.results
        ))
    );
    return lectureOffsetElementList;
  }

  // 권장과정
  @action
  async findPagingRequiredLectures(
    limit: number,
    offset: number,
    channelIds: string[] = [],
    orderBy: OrderByType = OrderByType.New,
    fromMain: boolean = false
  ) {
    //
    const response = await this.lectureFlowApi.findRqdLectures(
      LectureFilterRdoModel.new(limit, offset, channelIds)
    );
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(
      response
    );

    if (fromMain) {
      window.sessionStorage.setItem(
        'RequiredLearningList',
        JSON.stringify(lectureOffsetElementList)
      );
    }

    lectureOffsetElementList.results = lectureOffsetElementList.results.map(
      lecture => new LectureModel(lecture)
    );

    runInAction(
      () =>
        (this._lectures = this._lectures.concat(
          lectureOffsetElementList.results
        ))
    );
    return lectureOffsetElementList;
  }

  @action
  async setPagingRequiredLectures(lectures: OffsetElementList<LectureModel>) {
    //
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(
      lectures
    );

    lectureOffsetElementList.results = lectureOffsetElementList.results.map(
      lecture => new LectureModel(lecture)
    );

    runInAction(
      () =>
        (this._lectures = this._lectures.concat(
          lectureOffsetElementList.results
        ))
    );
    return lectureOffsetElementList;
  }

  // LectureViews ------------------------------------------------------------------------------------------------------

  @action
  clearLectureViews() {
    //
    return runInAction(() => (this._lectureViews = []));
  }

  @action
  async findLectureViews(
    coursePlanId: string,
    lectureCardUsids: string[],
    courseLectureUsids?: string[]
  ) {
    //
    const lectureViews = await this.lectureApi.findLectureViews(
      coursePlanId,
      lectureCardUsids,
      courseLectureUsids
    );

    runInAction(() => (this._lectureViews = lectureViews));
    return lectureViews;
  }

  @action
  async findLectureViewsV2(
    coursePlanId: string,
    lectureCardUsids: string[],
    courseLectureUsids?: string[]
  ) {
    //
    const lectureViews = await this.lectureApi.findLectureViewsV2(
      coursePlanId,
      lectureCardUsids,
      courseLectureUsids
    );

    runInAction(() => (this._lectureViews = lectureViews));
    return lectureViews;
  }

  findLectureViewsFromJson(lectures: string) {
    runInAction(() => (this._lectureViews = JSON.parse(lectures)));
    // console.log('lectureViews : ', this.lectureViews);
  }

  // SubLectureViewMap -------------------------------------------------------------------------------------------------

  @action
  async findSubLectureViews(
    courseId: string,
    coursePlanId: string,
    lectureCardIds: string[],
    courseLectureIds?: string[]
  ) {
    //
    const lectureViews = await this.lectureApi.findLectureViews(
      coursePlanId,
      lectureCardIds,
      courseLectureIds
    );

    runInAction(() => this.subLectureViewsMap.set(courseId, lectureViews));
    return lectureViews;
  }

  @action
  async findSubLectureViewsV2(
    courseId: string,
    coursePlanId: string,
    lectureCardIds: string[],
    courseLectureIds?: string[]
  ) {
    //
    const lectureViews = await this.lectureApi.findLectureViewsV2(
      coursePlanId,
      lectureCardIds,
      courseLectureIds
    );

    runInAction(() => this.subLectureViewsMap.set(courseId, lectureViews));
    return lectureViews;
  }

  getSubLectureViews(courseId: string) {
    //

    // if (this.subLectureViewsMap.get(courseId)) {
    //   console.log( 'subLectureViewsMap.get : ', courseId, (this.subLectureViewsMap.get(courseId) as IObservableArray).peek());
    // }

    return this.subLectureViewsMap.get(courseId) || [];
  }

  @action
  async findAllLecturesByInstructorId(
    instructorId: string,
    limit: number,
    offset: number
  ) {
    //
    const response = await this.lectureApi.findAllLecturesByInstructorId(
      InstructorRdoModel.new(instructorId, limit, offset)
    );
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(
      response
    );

    lectureOffsetElementList.results = lectureOffsetElementList.results.map(
      lecture => new LectureModel(lecture)
    );

    runInAction(
      () =>
        (this._lectures = this._lectures.concat(
          lectureOffsetElementList.results
        ))
    );
    return lectureOffsetElementList;
  }

  // shared list 조회
  @action
  async findSharedLectures(
    limit: number,
    offset: number,
    channelIds: string[] = []
  ) {
    //
    const response = await this.lectureApi.findAllSharedLectures(
      SharedRdoModel.newShared(limit, offset, channelIds)
    );
    const lectureOffsetElementList = new OffsetElementList<LectureModel>(
      response
    );

    lectureOffsetElementList.results = lectureOffsetElementList.results.map(
      lecture => new LectureModel(lecture)
    );

    // add totalLectureCount by gon
    runInAction(() => {
      this._lectures = this._lectures.concat(lectureOffsetElementList.results);
      this.totalLectureCount = lectureOffsetElementList.totalCount;
    });
    return lectureOffsetElementList;
  }

  @action
  async findPagingRecommendLectures(
    channelLimit: number,
    limit: number,
    channelId?: string,
    orderBy?: OrderByType
  ) {
    //
    const lectureRdo = LectureRdoModel.newRecommend(
      channelLimit,
      0,
      limit,
      0,
      channelId,
      orderBy
    );
    const recommendLectureListRdo = await this.lectureFlowApi.findAllRecommendLectures(
      lectureRdo
    );

    runInAction(
      () => (this._recommendLectureListRdo = recommendLectureListRdo)
    );
    return recommendLectureListRdo;
  }

  @action
  async addFindPagingRecommendLectures(
    channelLimit: number,
    channelOffset: number,
    limit: number,
    offset: number,
    channelId?: string,
    orderBy?: OrderByType
  ) {
    //
    const lectureRdo = LectureRdoModel.newRecommend(
      channelLimit,
      channelOffset,
      limit,
      offset,
      channelId,
      orderBy
    );
    const recommendLectureListRdo = await this.lectureFlowApi.findAllRecommendLectures(
      lectureRdo
    );

    runInAction(() => {
      this._recommendLectureListRdo.totalCount =
        recommendLectureListRdo.totalCount;
      this._recommendLectureListRdo.recommendLectureRdos = this._recommendLectureListRdo.recommendLectureRdos.concat(
        recommendLectureListRdo.recommendLectureRdos
      );
    });
    return recommendLectureListRdo;
  }

  @action
  async addPagingRecommendLectures(
    channelLimit: number,
    channelOffset: number,
    limit: number,
    offset: number,
    channelId?: string,
    orderBy?: OrderByType
  ) {
    //
    const lectureRdo = LectureRdoModel.newRecommend(
      channelLimit,
      channelOffset,
      limit,
      offset,
      channelId,
      orderBy
    );
    const recommendLectureListRdo = await this.lectureFlowApi.findAllRecommendLectures(
      lectureRdo
    );

    if (
      recommendLectureListRdo.recommendLectureRdos &&
      recommendLectureListRdo.recommendLectureRdos.length === 1
    ) {
      const recommendLecture = recommendLectureListRdo.recommendLectureRdos[0];

      runInAction(
        () =>
          (this.recommendLecture.lectures.results = this.recommendLecture.lectures.results.concat(
            recommendLecture.lectures.results
          ))
      );
      return recommendLecture.lectures;
    }
    return null;
  }

  @action
  clearRecommendLectures() {
    //
    this.recommendLecture = new RecommendLectureRdo();
  }

  async confirmUsageStatisticsByCardId(studentCdo: StudentCdoModel) {
    //
    return this.studentFlowApi.confirmUsageStatisticsByCardId(studentCdo);
  }

  /**
   * 권장과정 갯수 조회
   */
  @action
  async countRequiredLectures() {
    const count = await this.lectureFlowApi.countRequiredLectures(this._lectureFilterRdoV2);

    runInAction(() => {
      this.requiredLecturesCount = count;
    });
  }

  ////////////////////////////////////////////////////////// 개편 //////////////////////////////////////////////////////////
  @observable
  _lectureTableViews: LectureTableViewModel[] = [];

  @observable
  _lectureTableViewCount: number = 0;

  _lectureFilterRdoV2: LectureFilterRdoModelV2 = new LectureFilterRdoModelV2();

  @observable
  _filterCountViews: FilterCountViewModel[] = [];

  @observable
  _totalFilterCountView: FilterCountViewModel = new FilterCountViewModel()

  @computed get filterCountViews() {
    return this._filterCountViews;
  }

  @computed get totalFilterCountView() {
    return this._totalFilterCountView;
  }

  @computed get lectureTableViews() {
    return this._lectureTableViews;
  }

  @computed get lectureTableCount() {
    return this._lectureTableViewCount;
  }

  initFilterRdo() {
    this._lectureFilterRdoV2 = new LectureFilterRdoModelV2();
  }

  changeFilterRdoWithConditions(conditions: FilterCondition) {
    this._lectureFilterRdoV2.changeConditions(conditions);
    this._lectureFilterRdoV2.setDefaultOffset();
  }

  getFilterCount() {
    return this._lectureFilterRdoV2.getFilterCount();
  }

  @action
  clearAllTableViews() {
    this._lectureTableViews = [];
    this._lectureTableViewCount = 0;
  }

  @action
  async findAllRqdTableViews() {
    const offsetTableViews = await this.lectureFlowApi.findAllRqdTableViews(this._lectureFilterRdoV2);

    if (offsetTableViews &&
      offsetTableViews.results &&
      offsetTableViews.results.length) {
      runInAction(() => {
        this._lectureTableViews = offsetTableViews.results.map(result => new LectureTableViewModel(result));
        this._lectureTableViewCount = offsetTableViews.totalCount;
      });
      return false;
    }

    return true;
  }

  @action
  async findAllRqdTableViewsByConditions() {
    const offsetTableViews = await this.lectureFlowApi.findAllRqdTableViews(this._lectureFilterRdoV2);

    if (offsetTableViews &&
      offsetTableViews.results &&
      offsetTableViews.results.length) {
      runInAction(() => {
        this._lectureTableViews = offsetTableViews.results.map(result => new LectureTableViewModel(result));
        this._lectureTableViewCount = offsetTableViews.totalCount;
      });
      return false;
    }
    return true;
  }

  @action
  async findAllRqdTableViewsWithPage(offset: Offset) {
    this._lectureFilterRdoV2.changeOffset(offset);
    const offsetTableViews = await this.lectureFlowApi.findAllRqdTableViews(this._lectureFilterRdoV2);

    if (
      offsetTableViews &&
      offsetTableViews.results &&
      offsetTableViews.results.length) {
      const addedTableViews = offsetTableViews.results.map(result => new LectureTableViewModel(result));
      runInAction(() => {
        this._lectureTableViews = [...this._lectureTableViews, ...addedTableViews];
      });
    }
  }

  @action
  async findAllFilterCountViews() {
    const response = await this.lectureFlowApi.findAllFilterCountViews(this._lectureFilterRdoV2);

    if (response) {
      const filterCountViews = response.map((filterCountView: any) => new FilterCountViewModel(filterCountView));
      const totalFilterCountView = FilterCountViewModel.getTotalFilterCountView(filterCountViews);

      runInAction(() => {
        this._filterCountViews = filterCountViews;
        this._totalFilterCountView = totalFilterCountView;
      });
    }
  }

  @action
  clearAllFilterCountViews() {
    this._filterCountViews = [];
    this._totalFilterCountView = new FilterCountViewModel();
  }

  @action
  sortTableViews(column: string, direction: Direction) {
    const propKey = converToKey(column);

    if (direction === Direction.ASC) {
      this._lectureTableViews = this._lectureTableViews.sort((a, b) => a[propKey] - b[propKey]);
      return;
    }
    if (direction === Direction.DESC) {
      this._lectureTableViews = this._lectureTableViews.sort((a, b) => b[propKey] - a[propKey]);
    }
  }

  @action
  clearAllTabCount() {
    this.requiredLecturesCount = 0;
  }

  ////////////////////////////////////////////////////////// 개편 //////////////////////////////////////////////////////////
}

LectureService.instance = new LectureService(
  LectureApi.instance,
  LectureFlowApi.instance,
  StudentFlowApi.instance
);

export default LectureService;

/* globals */
const converToKey = (column: string): any => {
  switch (column) {
    case '학습시간':
      return 'learningTime';
    case '스탬프':
      return 'stampCount';
    case '등록일':
      return 'creationTime';
    default:
      return '';
  }
};