import {
  action,
  computed,
  IObservableArray,
  observable,
  runInAction,
} from 'mobx';
import { autobind, Offset } from '@nara.platform/accent';
import { OffsetElementList } from 'shared/model';
import LectureApi from '../apiclient/LectureApi';
import LectureFlowApi from '../apiclient/LectureFlowApi';
import StudentFlowApi from '../apiclient/StudentFlowApi';
import LectureModel from '../../../model/LectureModel';
import LectureRdoModel from '../../../model/LectureRdoModel';
import LectureViewModel from '../../../model/LectureViewModel';
import RecommendLectureRdo from '../../../model/RecommendLectureRdo';
import RecommendLectureListRdo from '../../../model/RecommendLectureListRdo';
import InstructorRdoModel from '../../../model/InstructorRdoModel';
import OrderByType from '../../../model/OrderByType';
import LectureFilterRdoModel from '../../../model/LectureFilterRdoModel';
import SharedRdoModel from '../../../model/SharedRdoModel';
import StudentCdoModel from '../../../model/StudentCdoModel';
import LectureFilterRdoModelV2 from '../../../model/LectureFilterRdoModelV2';
import {
  findByRdo,
  findCardsByRdo,
  findByQdo,
  countLearningTab,
  countRequiredCards,
} from '../../../detail/api/cardApi';
import { CardWithCardRealtedCount } from '../../../model/CardWithCardRealtedCount';
import { Direction } from '../../../../myTraining/model/Direction';
import { FilterCondition } from '../../../../myTraining/model/FilterCondition';
import { findCardStudentsByCardIds } from '../../../../certification/api/CardStudentApi';
import LectureTableViewModel from '../../../model/LectureTableViewModel';
import MyTrainingApi from '../../../../myTraining/present/apiclient/MyTrainingApi';
import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';
import {
  CardProps,
  parseUserLectureCards,
  UserLectureCard,
} from '@sku/skuniv-ui-lecture-card';
import { SkProfileService } from '../../../../profile/stores';
import CardForUserViewModel from 'lecture/model/learning/CardForUserViewModel';
import CardQdo from 'lecture/model/learning/CardQdo';
import { patronInfo } from '@nara.platform/dock';

@autobind
class LectureService {
  //
  static instance: LectureService;

  private lectureApi: LectureApi;

  private lectureFlowApi: LectureFlowApi;

  private studentFlowApi: StudentFlowApi;

  private myTrainingApi: MyTrainingApi;

  @observable
  _lectures: UserLectureCard[] = [];

  @observable
  _userLectureCards: CardProps[] = [];

  @observable
  _requiredLectures: LectureModel[] = [];

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

  // Learning Page

  @observable
  _myStampCount: number = 0;

  @observable
  _myLearningCards: CardForUserViewModel[] = [];

  @observable
  _totalMyLearningCardCount: number = 0;

  @observable
  _selectedServiceIds: string[] = [];

  @observable
  cardQdo: CardQdo = new CardQdo();

  @observable
  column: string = '';

  @observable
  direction: Direction | null = null;

  //

  @action
  setLectureViews(views: any) {
    this._lectureViews = views;
  }

  @observable
  subLectureViewsMap: Map<string, LectureViewModel[]> = new Map();

  @action
  setSubLectureViews(courseId: string, lectureViews: LectureViewModel[]) {
    runInAction(() => this.subLectureViewsMap.set(courseId, lectureViews));
  }

  // Learning page

  @observable
  inProgressCount: number = 0;

  @observable
  bookmarkCount: number = 0;

  @observable
  requiredLecturesCount: number = 0;

  @observable
  completedCount: number = 0;

  @observable
  retryCount: number = 0;

  constructor(
    lectureApi: LectureApi,
    lectureFlowApi: LectureFlowApi,
    studentFlowApi: StudentFlowApi,
    myTrainingApi: MyTrainingApi
  ) {
    this.lectureApi = lectureApi;
    this.lectureFlowApi = lectureFlowApi;
    this.studentFlowApi = studentFlowApi;
    this.myTrainingApi = myTrainingApi;
  }

  @computed
  get lectures(): UserLectureCard[] {
    //
    const lectures = this._lectures as IObservableArray;
    return lectures.peek();
  }

  @computed
  get requiredLectures(): LectureModel[] {
    //
    const lectures = this._requiredLectures as IObservableArray;
    return lectures.peek();
  }

  @computed
  get recommendLectures() {
    //
    return (
      this._recommendLectureListRdo.recommendLectureRdos as IObservableArray
    ).peek();
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

  @computed
  get myLearningCards() {
    //
    return this._myLearningCards;
  }

  @computed
  get totalMyLearningCardCount() {
    //
    return this._totalMyLearningCardCount;
  }

  @computed
  get myStampCount() {
    //
    return this._myStampCount;
  }

  // Learning page

  @action
  async countMyStamp() {
    //
    const count = await this.lectureApi.countMyStamp();
    runInAction(() => (this._myStampCount = count));
  }

  @action
  clearMyLearningCard() {
    //
    this._totalMyLearningCardCount = 0;
    this._myLearningCards = [];
    this.clearSortParam();
  }

  @action
  setCardQdo(cardQdo: CardQdo) {
    runInAction(() => {
      this.cardQdo = new CardQdo(cardQdo);
    });
  }

  @action
  async findMyLearningCardByQdo(firstCheck?: boolean) {
    //
    const findReulst = await this.lectureApi.findMyLearningLectures(
      this.cardQdo
    );

    const cardNotes =
      (await this.myTrainingApi.findCardNoteList(
        findReulst.results.map((card) => card.id)
      )) || [];

    const myLearningCards = findReulst.results.map((card) => {
      //
      const myLectureCard = card;
      myLectureCard.useNote = cardNotes.some(
        (note: any) => note.cardId === card.id
      );
      return myLectureCard;
    });

    findReulst &&
      runInAction(() => {
        if (firstCheck) {
          this._myLearningCards = myLearningCards || [];
        } else {
          this._myLearningCards = [
            ...this._myLearningCards,
            ...myLearningCards,
          ];
        }
        this._totalMyLearningCardCount = findReulst && findReulst.totalCount;
      });
  }

  @action
  async findMyLearningCardForExcel(cardQdo: CardQdo) {
    //
    const findList = await this.lectureApi.findMyLearningLectures(cardQdo);

    const result: CardForUserViewModel[] = [];

    runInAction(() => {
      return findList.results.map((item) => {
        result.push(new CardForUserViewModel(item));
      });
    });

    return result;
  }

  @action
  private clearSortParam() {
    //
    this.column = '';
    this.direction = null;
  }

  @action
  async sortMyLearningTableViews(column: string, direction: Direction) {
    // 전달되는 컬럼이 오브젝트의 프로퍼티와 상이해, 변환해야함.
    const propKey = convertToKeyInMyLearningTable(column);

    this.column = propKey;
    this.direction = direction;

    if (direction === Direction.ASC) {
      this._myLearningCards = this._myLearningCards.sort(
        (a, b) => a[propKey] - b[propKey]
      );
      return;
    }
    if (direction === Direction.DESC) {
      this._myLearningCards = this._myLearningCards.sort(
        (a, b) => b[propKey] - a[propKey]
      );
    }
  }

  @computed
  get selectedServiceIds() {
    //
    return this._selectedServiceIds;
  }

  @action
  selectOne(serviceId: string) {
    runInAction(() => {
      this._selectedServiceIds = [...this._selectedServiceIds, serviceId];
    });
  }

  @action
  clearOne(serviceId: string) {
    this._selectedServiceIds = this._selectedServiceIds.filter(
      (selectedServiceId) => selectedServiceId !== serviceId
    );
  }

  @action
  selectAll() {
    this._selectedServiceIds = this._myLearningCards.map(
      (tableView) => tableView.id
    );
  }

  @action
  clearAll() {
    this._selectedServiceIds = [];
  }

  @action
  clearAllSelectedServiceIds() {
    this._selectedServiceIds = [];
  }

  // Lectures ----------------------------------------------------------------------------------------------------------

  @action
  clearLectures() {
    //
    return runInAction(() => (this._lectures = []));
  }

  @action
  clearCollegeLectures() {
    //
    return runInAction(() => (this._userLectureCards = []));
  }

  @action
  async findPagingCollegeLectures(
    collegeId: string,
    limit: number,
    offset: number,
    orderBy: OrderByType
  ) {
    //
    const response =
      (await findByQdo({
        collegeIds: collegeId,
        limit,
        offset,
        orderBy,
      })) || new OffsetElementList<UserLectureCard>();

    const lectureOffsetElementList = new OffsetElementList<UserLectureCard>(
      response
    );
    const userLanguage = SkProfileService.instance.skProfile.language;

    runInAction(
      () =>
        (this._userLectureCards = this._userLectureCards.concat(
          parseUserLectureCards(lectureOffsetElementList.results, userLanguage)
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
    const response =
      (await findByQdo({
        channelIds: channelId,
        limit,
        offset,
        orderBy,
      })) || new OffsetElementList<UserLectureCard>();
    const lectureOffsetElementList = new OffsetElementList<UserLectureCard>(
      response
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
  async findPagingChannelOrderLectures(
    collegeId: string,
    channelId: string,
    limit: number,
    offset: number,
    orderBy: OrderByType
  ) {
    //
    if (offset >= 8) {
      sessionStorage.setItem('channelOffset', JSON.stringify(offset + limit));
    }

    const response =
      (await findByQdo({
        collegeIds: collegeId,
        channelIds: channelId,
        limit,
        offset,
        orderBy,
      })) || new OffsetElementList<UserLectureCard>();

    const lectureOffsetElementList = new OffsetElementList<UserLectureCard>(
      response
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
      (lecture) => new LectureModel(lecture)
    );

    runInAction(
      () =>
        (this._requiredLectures = this._requiredLectures.concat(
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
      (lecture) => new LectureModel(lecture)
    );

    // jz - 강사 상세 페이지
    // runInAction(
    //   () =>
    //     (this._lectures = this._lectures.concat(
    //       lectureOffsetElementList.results
    //     ))
    // );
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
      (lecture) => new LectureModel(lecture)
    );

    // add totalLectureCount by gon
    // jz - shared
    // runInAction(() => {
    //   this._lectures = this._lectures.concat(lectureOffsetElementList.results);
    //   this.totalLectureCount = lectureOffsetElementList.totalCount;
    // });
    return lectureOffsetElementList;
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
    const recommendLectureListRdo =
      await this.lectureFlowApi.findAllRecommendLectures(lectureRdo);

    runInAction(() => {
      this._recommendLectureListRdo.totalCount =
        recommendLectureListRdo.totalCount;
      this._recommendLectureListRdo.recommendLectureRdos =
        this._recommendLectureListRdo.recommendLectureRdos.concat(
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
    const recommendLectureListRdo =
      await this.lectureFlowApi.findAllRecommendLectures(lectureRdo);

    if (
      recommendLectureListRdo.recommendLectureRdos &&
      recommendLectureListRdo.recommendLectureRdos.length === 1
    ) {
      const recommendLecture = recommendLectureListRdo.recommendLectureRdos[0];

      runInAction(
        () =>
          (this.recommendLecture.lectures.results =
            this.recommendLecture.lectures.results.concat(
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

  @action
  async countLearningTab() {
    const countModel = await countLearningTab();
    const requiredCount = await countRequiredCards();

    runInAction(() => {
      this.inProgressCount = (countModel && countModel.inProgressCount) || 0;

      this.bookmarkCount = (countModel && countModel.bookmarkCount) || 0;

      this.requiredLecturesCount = requiredCount || 0;

      this.completedCount = (countModel && countModel.completedCount) || 0;

      this.retryCount = (countModel && countModel.retryCount) || 0;
    });
  }

  ////////////////////////////////////////////////////////// 개편 //////////////////////////////////////////////////////////
  @observable
  _lectureTableViews: LectureTableViewModel[] = [];

  @observable
  _lectureTableViewCount: number = 0;

  _lectureFilterRdoV2: LectureFilterRdoModelV2 = new LectureFilterRdoModelV2();

  @computed get lectureTableViews() {
    return this._lectureTableViews;
  }

  @computed get lectureTableCount() {
    return this._lectureTableViewCount;
  }

  initFilterRdo() {
    this._lectureFilterRdoV2 = new LectureFilterRdoModelV2();
  }

  setFilterRdoByConditions(conditions: FilterCondition) {
    this._lectureFilterRdoV2.setByConditions(conditions);
    this._lectureFilterRdoV2.setDefaultOffset();
  }

  @action
  clearAllTableViews() {
    this._lectureTableViews = [];
    this._lectureTableViewCount = 0;
  }

  @action
  async findAllRqdTableViews() {
    return this.findAllRequiredCards();
  }

  @action
  async findAllRqdTableViewsByConditions() {
    return this.findAllRequiredCards();
  }

  @action
  async findAllRequiredCards(): Promise<boolean> {
    const cardRdo = this._lectureFilterRdoV2.toCardRdo();
    const offsetRequiredCard = await findCardsByRdo(cardRdo);

    if (
      offsetRequiredCard &&
      offsetRequiredCard.results &&
      offsetRequiredCard.results.length > 0
    ) {
      const cardIds = offsetRequiredCard.results.map((result) => result.id);
      const cardStudents = await findCardStudentsByCardIds(cardIds);
      const cardNotes =
        (await this.myTrainingApi.findCardNoteList(cardIds)) || [];

      const lectureTableViews = offsetRequiredCard.results.map((card) => {
        const mainCategory = card.categories.find(
          (category) => category.mainCategory === true
        ) || {
          collegeId: '',
          channelId: '',
          mainCategory: false,
        };

        const student =
          cardStudents &&
          cardStudents.find((student) => student.lectureId === card.id);

        const useNote =
          (cardNotes &&
            cardNotes.length > 0 &&
            cardNotes.some((note: any) => {
              if (note?.cardId === card.id) {
                return true;
              }
              return false;
            })) ||
          false;

        if (student) {
          const lectureTableView = new LectureTableViewModel();
          lectureTableView.serviceId = card.id;
          lectureTableView.type = card.type;
          lectureTableView.category = mainCategory;
          lectureTableView.difficultyLevel = card.difficultyLevel || '';
          // 김민준
          lectureTableView.name = card.name;
          lectureTableView.learningTime = card.learningTime;
          lectureTableView.learningState = student.learningState;
          lectureTableView.updateTime = student.modifiedTime;
          lectureTableView.updateTimeForTest = student.modifiedTimeForTest;
          lectureTableView.passedLearningCount = student.completePhaseCount;
          lectureTableView.totalLearningCount = student.phaseCount;
          lectureTableView.useNote = useNote;

          return lectureTableView;
        }

        const lectureTableView = new LectureTableViewModel();
        lectureTableView.serviceId = card.id;
        lectureTableView.type = card.type;
        lectureTableView.category = mainCategory!;
        lectureTableView.difficultyLevel = card.difficultyLevel!;
        // 김민준
        lectureTableView.name = card.name;
        lectureTableView.learningTime = card.learningTime;
        lectureTableView.useNote = useNote;

        return lectureTableView;
      });

      runInAction(() => {
        this._lectureTableViews = lectureTableViews;
        this._lectureTableViewCount = offsetRequiredCard.totalCount;
      });

      return false;
    }

    return true;
  }

  @action
  async findAllRqdTableViewsWithPage(offset: Offset) {
    this._lectureFilterRdoV2.setOffset(offset);

    const cardRdo = this._lectureFilterRdoV2.toCardRdo();
    const offsetRequiredCard = await findCardsByRdo(cardRdo);
    if (
      offsetRequiredCard &&
      offsetRequiredCard.results &&
      offsetRequiredCard.results.length > 0
    ) {
      const cardIds = offsetRequiredCard.results.map((card) => card.id);
      const cardStudents = await findCardStudentsByCardIds(cardIds);
      const cardNotes =
        (await this.myTrainingApi.findCardNoteList(cardIds)) || [];

      const addLectureTableViews = offsetRequiredCard.results.map((card) => {
        const mainCategory = card.categories.find(
          (category) => category.mainCategory === true
        ) || {
          collegeId: '',
          channelId: '',
          mainCategory: false,
        };

        const student =
          cardStudents &&
          cardStudents.find((student) => student.lectureId === card.id);

        const useNote =
          (cardNotes &&
            cardNotes.length > 0 &&
            cardNotes.some((note: any) => {
              if (note?.cardId === card.id) {
                return true;
              }
              return false;
            })) ||
          false;

        if (student) {
          const lectureTableView = new LectureTableViewModel();
          lectureTableView.serviceId = card.id;
          lectureTableView.type = card.type;
          lectureTableView.category = mainCategory;
          lectureTableView.difficultyLevel = card.difficultyLevel || '';
          // 김민준
          lectureTableView.name = card.name;
          lectureTableView.learningTime = card.learningTime;
          lectureTableView.learningState = student.learningState;
          lectureTableView.updateTime = student.updateTime;
          lectureTableView.updateTimeForTest = student.updateTimeForTest;
          lectureTableView.passedLearningCount = student.completePhaseCount;
          lectureTableView.totalLearningCount = student.phaseCount;
          lectureTableView.useNote = useNote;

          return lectureTableView;
        }

        const lectureTableView = new LectureTableViewModel();
        lectureTableView.serviceId = card.id;
        lectureTableView.type = card.type;
        lectureTableView.category = mainCategory!;
        lectureTableView.difficultyLevel = card.difficultyLevel!;
        // 김민준
        lectureTableView.name = card.name;
        lectureTableView.learningTime = card.learningTime;
        lectureTableView.useNote = useNote;

        return lectureTableView;
      });

      runInAction(() => {
        this._lectureTableViews = [
          ...this._lectureTableViews,
          ...addLectureTableViews,
        ];
        this._lectureTableViewCount = offsetRequiredCard.totalCount;
      });
    }
  }

  @action
  sortTableViews(column: string, direction: Direction) {
    const propKey = converToKey(column);

    if (direction === Direction.ASC) {
      this._lectureTableViews = this._lectureTableViews.sort(
        (a, b) => a[propKey] - b[propKey]
      );
      return;
    }
    if (direction === Direction.DESC) {
      this._lectureTableViews = this._lectureTableViews.sort(
        (a, b) => b[propKey] - a[propKey]
      );
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
  StudentFlowApi.instance,
  MyTrainingApi.instance
);

export default LectureService;

/* globals */
const converToKey = (column: string): any => {
  switch (column) {
    case '학습시간':
      return 'learningTime';
    case '최근학습일':
      return 'updateTime';
    case '스탬프':
      return 'stampCount';
    case '등록일':
      return 'creationTime';
    default:
      return '';
  }
};

export const convertToKeyInMyLearningTable = (column: string): any => {
  switch (column) {
    case '학습시간':
      return 'learningTime';
    case '학습완료일':
      return 'passedTime';
    case '최근학습일':
    case '취소/미이수일':
      return 'modifiedTime';
    case '스탬프':
      return 'stampCount';
    default:
      return '';
  }
};
