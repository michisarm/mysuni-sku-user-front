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
import { findByRdo, countRequiredCards } from '../../../detail/api/cardApi';
import { CardWithCardRealtedCount } from '../../../model/CardWithCardRealtedCount';
import { Direction } from '../../../../myTraining/model/Direction';
import { FilterCondition } from '../../../../myTraining/model/FilterCondition';
import { findCardStudentsByCardIds } from '../../../../certification/api/CardStudentApi';
import LectureTableViewModel from '../../../model/LectureTableViewModel';
import MyTrainingApi from '../../../../myTraining/present/apiclient/MyTrainingApi';

@autobind
class LectureService {
  //
  static instance: LectureService;

  private lectureApi: LectureApi;

  private lectureFlowApi: LectureFlowApi;

  private studentFlowApi: StudentFlowApi;

  private myTrainingApi: MyTrainingApi;

  @observable
  _lectures: CardWithCardRealtedCount[] = [];

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
    runInAction(() => this.subLectureViewsMap.set(courseId, lectureViews));
  }

  // 권장과정
  @observable
  requiredLecturesCount: number = 0;

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
  get lectures(): CardWithCardRealtedCount[] {
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
    const response =
      (await findByRdo({
        collegeIds: collegeId,
        limit,
        offset,
        orderBy,
      })) || new OffsetElementList<CardWithCardRealtedCount>();

    const lectureOffsetElementList =
      new OffsetElementList<CardWithCardRealtedCount>(response);

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
    const response =
      (await findByRdo({
        channelIds: channelId,
        limit,
        offset,
        orderBy,
      })) || new OffsetElementList<CardWithCardRealtedCount>();
    const lectureOffsetElementList =
      new OffsetElementList<CardWithCardRealtedCount>(response);

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
      (await findByRdo({
        collegeIds: collegeId,
        channelIds: channelId,
        limit,
        offset,
        orderBy,
      })) || new OffsetElementList<CardWithCardRealtedCount>();

    const lectureOffsetElementList =
      new OffsetElementList<CardWithCardRealtedCount>(response);

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
  async countRequiredLectures() {
    const count = await countRequiredCards();

    if (count !== undefined) {
      runInAction(() => {
        this.requiredLecturesCount = count;
      });
    }
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
    const offsetRequiredCard = await findByRdo(cardRdo);

    if (
      offsetRequiredCard &&
      offsetRequiredCard.results &&
      offsetRequiredCard.results.length > 0
    ) {
      const cardIds = offsetRequiredCard.results.map(
        (result) => result.card.id
      );
      const cardStudents = await findCardStudentsByCardIds(cardIds);
      const cardNotes =
        (await this.myTrainingApi.findCardNoteList(cardIds)) || [];

      const lectureTableViews = offsetRequiredCard.results.map((result) => {
        const card = result.card;
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
          // lectureTableView.name = card.name;
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
        // lectureTableView.name = card.name;
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
    const offsetRequiredCard = await findByRdo(cardRdo);

    if (
      offsetRequiredCard &&
      offsetRequiredCard.results &&
      offsetRequiredCard.results.length > 0
    ) {
      const cardIds = offsetRequiredCard.results.map(
        (result) => result.card.id
      );
      const cardStudents = await findCardStudentsByCardIds(cardIds);
      const cardNotes =
        (await this.myTrainingApi.findCardNoteList(cardIds)) || [];

      const addLectureTableViews = offsetRequiredCard.results.map((result) => {
        const card = result.card;
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
          // lectureTableView.name = card.name;
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
        // lectureTableView.name = card.name;
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
