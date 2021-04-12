import {
  IObservableArray,
  action,
  computed,
  observable,
  runInAction,
} from 'mobx';
import { autobind, Offset } from '@nara.platform/accent';
import { CubeType, OffsetElementList } from 'shared/model';
import MyTrainingFilterRdoModel from 'myTraining/model/MyTrainingFilterRdoModel';
import MyTrainingTableViewModel from 'myTraining/model/MyTrainingTableViewModel';
import MyTrainingApi from '../apiclient/MyTrainingApi';
import MyTrainingModel from '../../model/MyTrainingModel';
import MyTrainingRdoModel from '../../model/MyTrainingRdoModel';
import { FilterCondition } from '../../model/FilterCondition';
import { Direction } from '../../model/Direction';
import { MyLearningContentType } from '../../ui/model/MyLearningContentType';
import { MyContentType } from '../../ui/model/MyContentType';

@autobind
class MyTrainingService {
  //
  static instance: MyTrainingService;

  private myTrainingApi: MyTrainingApi;

  @observable
  _myTrainings: MyTrainingModel[] = [];

  @observable
  _myTrainingsExcel: MyTrainingModel[] = [];

  @observable
  inprogressCount: number = 0;

  @observable
  enrolledCount: number = 0;

  @observable
  completedCount: number = 0;

  @observable
  retryCount: number = 0;

  @observable
  myStampCount: number = 0;

  @observable
  thisYearMyStampCount: number = 0;

  @observable
  personalBoardInprogressCount: number = 0;

  @observable
  personalBoardCompletedCount: number = 0;

  constructor(myTrainingApi: MyTrainingApi) {
    this.myTrainingApi = myTrainingApi;
  }

  @computed
  get myTrainings() {
    //
    const myTrainings = this._myTrainings as IObservableArray;
    return myTrainings.peek();
  }

  // My Trainings ----------------------------------------------------------------------------------------------------------

  @action
  clear() {
    this._myTrainings = [];
  }

  @action
  async getAllLearningPassedFromStorage() {
    //
    this._myTrainings = [];

    const savedLearningPassed =
      window.navigator.onLine &&
      window.sessionStorage.getItem('learningPassed');
    if (savedLearningPassed && savedLearningPassed.length > 0) {
      const learningPassed: MyTrainingModel[] = JSON.parse(savedLearningPassed)
        .results as MyTrainingModel[];
      this._myTrainings = this._myTrainings.concat(learningPassed);
    }

    return this._myTrainings;
  }

  @action
  async fetchAndAddAllMyTrainingsWithState(
    state: string,
    limit: number,
    offset: number,
    channelIds: string[] = []
  ) {
    //
    const rdo = MyTrainingRdoModel.newWithState(
      state,
      limit,
      offset,
      channelIds
    );
    const offsetList = await this.myTrainingApi.fetchAllMyTrainings(rdo);

    runInAction(
      () => (this._myTrainings = this._myTrainings.concat(offsetList.results))
    );
    return offsetList;
  }

  @action
  async findAllMyTrainingsWithState(
    state: string,
    limit: number,
    offset: number,
    channelIds: string[] = [],
    fromMain: boolean = false
  ) {
    //

    /* 메인페이지에서 호출 시. */
    const rdo = fromMain
      ? MyTrainingRdoModel.newWithStateFromMain(
        state,
        limit,
        offset,
        channelIds,
        'main'
      )
      : MyTrainingRdoModel.newWithState(state, limit, offset, channelIds);

    const offsetList: OffsetElementList<MyTrainingModel> = await this.myTrainingApi.findAllMyTrainings(
      rdo
    );
    if (fromMain) {
      //window.sessionStorage.removeItem('InProgressLearningList');
      //this.clear();
      window.sessionStorage.setItem(
        'InProgressLearningList',
        JSON.stringify(offsetList)
      );
    }

    runInAction(() => (this._myTrainings = offsetList.results));
    return offsetList;
  }

  @action
  async setMyTrainingsWithState(lectures: OffsetElementList<MyTrainingModel>) {
    //
    const myTrainings = lectures.results.map(
      result => new MyTrainingModel(result)
    );

    runInAction(() => (this._myTrainings = myTrainings));
    return lectures;
  }

  @action
  async findAndAddAllMyTrainingsWithState(
    state: string,
    limit: number,
    offset: number,
    channelIds: string[] = []
  ) {
    //
    if (state === 'Completed' || state === 'Passed') {
      const learningPassed = sessionStorage.getItem('learningPassed');
      if (learningPassed) {
        let result: MyTrainingModel[] = [];
        const parseElement: OffsetElementList<MyTrainingModel> = JSON.parse(
          learningPassed
        );
        const offsetList: OffsetElementList<MyTrainingModel> = new OffsetElementList<
          MyTrainingModel
        >();
        offsetList.results = offsetList.results.concat(
          parseElement.results.map(e => new MyTrainingModel(e))
        );

        if (channelIds.length === 0) {
          result = offsetList.results;
          // if (result.length > 0) {
          //   sessionStorage.setItem('endDate', result[0].endDate);
          // }
        } else {
          for (let i = 0; i < channelIds.length; i++) {
            for (let j = 0; j < offsetList.results.length; j++) {
              if (offsetList.results[j].category.channel.id === channelIds[i]) {
                result.push(offsetList.results[j]);
              }
            }
          }
        }

        // @ts-ignore
        result.sort((a, b) => b.endDate - a.endDate);
        const useResult: MyTrainingModel[] = result.slice(
          offset,
          limit + offset
        );
        offsetList.totalCount = result.length;

        runInAction(
          () => (this._myTrainings = this._myTrainings.concat(useResult))
        );
        return offsetList;
      }
    }

    const rdo = MyTrainingRdoModel.newWithState(
      state,
      limit,
      offset,
      channelIds
    );
    const offsetList = await this.myTrainingApi.findAllMyTrainings(rdo);
    runInAction(
      () => (this._myTrainings = this._myTrainings.concat(offsetList.results))
    );
    return offsetList;
  }

  @action
  async findAllMyTrainingsWithRequired(
    limit: number,
    offset: number,
    channelIds: string[] = []
  ) {
    //
    const rdo = MyTrainingRdoModel.newWithRequired(limit, offset, channelIds);
    const offsetList = await this.myTrainingApi.findAllMyTrainings(rdo);

    runInAction(() => (this._myTrainings = offsetList.results));

    return offsetList;
  }

  @action
  async findAndAddAllMyTrainingsWithRequired(
    limit: number,
    offset: number,
    channelIds: string[] = []
  ) {
    //
    const rdo = MyTrainingRdoModel.newWithRequired(limit, offset, channelIds);
    const offsetList = await this.myTrainingApi.findAllMyTrainings(rdo);

    runInAction(
      () => (this._myTrainings = this._myTrainings.concat(offsetList.results))
    );
    return offsetList;
  }

  @action
  async findAndAddAllMyCommunityTrainings(limit: number, offset: number) {
    //
    const rdo = MyTrainingRdoModel.newWithCubeType(
      CubeType.Community,
      limit,
      offset
    );
    const trainingOffsetElementList = await this.myTrainingApi.findAllMyTrainings(
      rdo
    );

    runInAction(
      () =>
        (this._myTrainings = this._myTrainings.concat(
          trainingOffsetElementList.results
        ))
    );

    return trainingOffsetElementList;
  }

  @action
  async countMyTrainingsWithStamp(
    channelIds: string[] = [],
    startDate?: number,
    endDate?: number
  ) {
    //
    const rdo = MyTrainingRdoModel.new(0, 0, channelIds, startDate, endDate);
    const trainingOffsetElementList = await this.myTrainingApi.findAllMyTrainingsWithStamp(
      rdo
    );
    if (trainingOffsetElementList === undefined) {
      return;
    }

    if (startDate === undefined || endDate === undefined) {
      runInAction(
        () => (this.myStampCount = trainingOffsetElementList.totalCount)
      );
    } else {
      runInAction(
        () => (this.thisYearMyStampCount = trainingOffsetElementList.totalCount)
      );
    }

    return trainingOffsetElementList.totalCount;
  }

  @action
  async findAllTabMyTraining() {
    //
    const myTrainingTabModel = await this.myTrainingApi.findAllTabMyTraining();
    runInAction(() => {
      this.inprogressCount = myTrainingTabModel.inprogressCount;
      this.completedCount = myTrainingTabModel.completedCount;
      this.enrolledCount = myTrainingTabModel.enrolledCount;
      this.retryCount = myTrainingTabModel.retryCount;
    });

    return myTrainingTabModel;
  }

  ///////////////////////////////////// 개편되는 MyLearningPage 서비스들 //////////////////////////////////////////////////////////////////////////

  @observable
  _myTrainingTableViews: MyTrainingTableViewModel[] = [];

  @observable
  _myTrainingTableViewCount: number = 0;

  _myTrainingFilterRdo: MyTrainingFilterRdoModel = new MyTrainingFilterRdoModel();

  private inProgressTableViews: MyTrainingTableViewModel[] = [];

  private inProgressTableCount: number = 0;

  private completedTableViews: MyTrainingTableViewModel[] = [];

  private completedTableCount: number = 0;

  private column: string = '';

  private direction: string = '';

  @observable
  selectedServiceIds: string[] = [];

  @computed get myTrainingTableViews() {
    //
    return this._myTrainingTableViews;
  }

  @computed get myTrainingTableCount() {
    return this._myTrainingTableViewCount;
  }

  @action
  async findAllTabCount() {
    const myTrainingTabModel = await this.myTrainingApi.findAllTabCount();
    if (myTrainingTabModel) {
      runInAction(() => {
        this.inprogressCount = myTrainingTabModel.inprogressCount;
        this.completedCount = myTrainingTabModel.completedCount;
        this.enrolledCount = myTrainingTabModel.enrolledCount;
        this.retryCount = myTrainingTabModel.retryCount;
      });
    }
  }

  @action
  async findLearningCount() {
    const learningCount = await this.myTrainingApi.findLearningCount();
    if (learningCount) {
      runInAction(() => {
        this.personalBoardInprogressCount = learningCount.inprogressCount;
        this.personalBoardCompletedCount = learningCount.completedCount;
      });
    }
  }

  @action
  clearAllTableViews() {
    this._myTrainingTableViews = [];
    this._myTrainingTableViewCount = 0;
  }

  initFilterRdo(contentType: MyContentType) {
    this._myTrainingFilterRdo = MyTrainingFilterRdoModel.create(contentType);
  }

  changeFilterRdoWithViewType() {
    this._myTrainingFilterRdo.setDefaultOffset();
  }

  setFilterRdoByConditions(conditions: FilterCondition) {
    /* 조건이 변경되면 offset 을 초기화 해, 새롭게 조회함. */
    this._myTrainingFilterRdo.setByConditions(conditions);
    this._myTrainingFilterRdo.setDefaultOffset();
  }

  changeFilterRdoWithOffset(offset: Offset) {
    this._myTrainingFilterRdo.setOffset(offset);
  }

  @action
  async findAllTableViews() {
    /* session storage 에 학습중 & 학습완료 데이터가 있다면 session storage 에서 데이터를 조회함. */
    /* 학습중 */
    if (this._myTrainingFilterRdo.myTrainingState === 'InProgress') {
      if (!this.inProgressTableViews.length) {
        const inProgressJson = sessionStorage.getItem('inProgressTableViews');
        if (inProgressJson) {
          const inProgressStorage: MyTrainingTableViewModel[] = JSON.parse(
            inProgressJson
          );
          if (inProgressStorage && inProgressStorage.length) {
            this.inProgressTableViews = inProgressStorage.map(
              (inProgress: MyTrainingTableViewModel) =>
                new MyTrainingTableViewModel(inProgress)
            );
            this.inProgressTableCount = inProgressStorage.length;
          }
        }
      }

      if (this.inProgressTableViews.length) {
        this._myTrainingTableViews = this.inProgressTableViews.slice(0, 20);
        this._myTrainingTableViewCount = this.inProgressTableCount;
        return false;
      }
    }

    /* 학습완료 */
    if (this._myTrainingFilterRdo.myTrainingState === 'Completed') {
      if (!this.completedTableViews.length) {
        const completedJson = sessionStorage.getItem('completedTableViews');
        if (completedJson) {
          const completedStorage: any[] = JSON.parse(completedJson);
          if (completedStorage && completedStorage.length) {
            this.completedTableViews = completedStorage.map(
              completed => new MyTrainingTableViewModel(completed)
            );
            this.completedTableCount = completedStorage.length;
          }
        }
      }

      if (this.completedTableViews.length) {
        /* 전체보기 */
        this._myTrainingTableViews = this.completedTableViews.slice(0, 20);
        this._myTrainingTableViewCount = this.completedTableCount;
        return false;
      }
    }

    // 기존의 조건을 담고 있는 rdo와 새로운 조건을 가지는 rdo 병합.
    const offsetTableViews: OffsetElementList<MyTrainingTableViewModel> = await this.myTrainingApi.findAllTableViews(
      this._myTrainingFilterRdo
    );

    if (
      offsetTableViews &&
      offsetTableViews.results &&
      offsetTableViews.results.length
    ) {
      runInAction(() => {
        this._myTrainingTableViews = offsetTableViews.results.map(
          result => new MyTrainingTableViewModel(result)
        );
        this._myTrainingTableViewCount = offsetTableViews.totalCount;
      });
      return false;
    }
    return true;
  }

  @action
  async findAllTableViewsWithPage(offset: Offset) {
    if (this._myTrainingFilterRdo.getFilterCount() === 0) {
      const addedTableViews = this.getAddedTableViewsFromStorage(offset);

      runInAction(() => {
        this._myTrainingTableViews = [...addedTableViews];
        this._myTrainingTableViewCount = this.inProgressTableCount;
      });

      return;
    }

    this._myTrainingFilterRdo.setOffset(offset);

    const offsetTableViews: OffsetElementList<MyTrainingTableViewModel> = await this.myTrainingApi.findAllTableViews(
      this._myTrainingFilterRdo
    );

    if (
      offsetTableViews &&
      offsetTableViews.results &&
      offsetTableViews.results.length
    ) {
      const addedTableViews = offsetTableViews.results.map(
        result => new MyTrainingTableViewModel(result)
      );
      runInAction(() => {
        this._myTrainingTableViews = [
          ...this._myTrainingTableViews,
          ...addedTableViews,
        ];

        this._myTrainingTableViewCount = offsetTableViews.totalCount;
      });
    }
  }

  /* session storage 로부터 페이징 처리 후 추가되어야 하는 데이터를 조회함. */
  private getAddedTableViewsFromStorage(offset: Offset): MyTrainingTableViewModel[] {
    const { myTrainingState } = this._myTrainingFilterRdo;
    const endIndex = offset.offset + offset.limit;

    if (myTrainingState === MyLearningContentType.InProgress) {
      if (!this.inProgressTableViews.length) {
        const inProgressJson = sessionStorage.getItem('inProgressTableViews');
        if (inProgressJson) {
          const inProgressStorage: MyTrainingTableViewModel[] = JSON.parse(
            inProgressJson
          );
          if (inProgressStorage && inProgressStorage.length) {
            this.inProgressTableViews = inProgressStorage.map(
              (inProgress: MyTrainingTableViewModel) =>
                new MyTrainingTableViewModel(inProgress)
            );
            this.inProgressTableCount = inProgressStorage.length;
          }
        }
      }

      return this.inProgressTableViews.slice(0, endIndex);
    }

    if (myTrainingState === MyLearningContentType.Completed) {
      if (!this.completedTableViews.length) {
        const completedJson = sessionStorage.getItem('completedTableViews');
        if (completedJson) {
          const completedStorage: any[] = JSON.parse(completedJson);
          if (completedStorage && completedStorage.length) {
            this.completedTableViews = completedStorage.map(
              completed => new MyTrainingTableViewModel(completed)
            );
            this.completedTableCount = completedStorage.length;
          }
        }
      }
      return this.completedTableViews.slice(0, endIndex);
    }

    return [];
  }

  @action
  async findAllTableViewsWithServiceType(serviceType: string) {
    this._myTrainingFilterRdo.setOffset({ offset: 0, limit: 20 });

    const offsetTableViews: OffsetElementList<MyTrainingTableViewModel> = await this.myTrainingApi.findAllTableViews(
      this._myTrainingFilterRdo
    );

    if (
      offsetTableViews &&
      offsetTableViews.results &&
      offsetTableViews.results.length
    ) {
      runInAction(() => {
        this._myTrainingTableViews = offsetTableViews.results.map(
          result => new MyTrainingTableViewModel(result)
        );
        this._myTrainingTableViewCount = offsetTableViews.totalCount;
      });
    }
  }

  @action
  async findAllTableViewsByConditions() {
    const offsetMyTrainings: OffsetElementList<MyTrainingTableViewModel> = await this.myTrainingApi.findAllTableViews(
      this._myTrainingFilterRdo
    );

    if (
      offsetMyTrainings &&
      offsetMyTrainings.results &&
      offsetMyTrainings.results.length
    ) {
      runInAction(() => {
        this._myTrainingTableViews = offsetMyTrainings.results.map(
          offsetMyTraining => new MyTrainingTableViewModel(offsetMyTraining)
        );
        this._myTrainingTableViewCount = offsetMyTrainings.totalCount;
      });

      return false;
    }

    return true;
  }

  async findAllTableViewsForExcel() {
    // 기존의 rdo 를 copy 해 새로운 엑셀 조회용 rdo 생성. ( offset 을 변경함으로 기존의 Rdo 에 영향이 없도록 하기 위함.)
    const filterRdoForExcel: MyTrainingFilterRdoModel = new MyTrainingFilterRdoModel(
      this._myTrainingFilterRdo
    );

    // 엑셀 조회용 rdo 는 페이징 처리 없이 전체를 조회해야 함.
    filterRdoForExcel.setOffset({ offset: 0, limit: 9999 });
    filterRdoForExcel.changeColumnDirection(this.column, this.direction);

    const myTrainingTableViewsForExcel: MyTrainingTableViewModel[] = await this.myTrainingApi.findAllTableViewsForExcel(
      filterRdoForExcel
    );

    return myTrainingTableViewsForExcel;
  }

  async findAllInProgressStorage() {
    const filterRdo = MyTrainingFilterRdoModel.createForInProgressStorage();
    const offsetInProgress: OffsetElementList<MyTrainingTableViewModel> = await this.myTrainingApi.findAllTableViews(filterRdo);

    if (
      offsetInProgress &&
      offsetInProgress.results &&
      offsetInProgress.results.length > 0
    ) {
      this.inProgressTableViews = offsetInProgress.results.map(inProgressTableView => new MyTrainingTableViewModel(inProgressTableView));
      this.inProgressTableCount = offsetInProgress.totalCount;

      return this.inProgressTableViews;
    }

    return null;
  }

  async findAllCompletedStorage() {
    const filterRdo = MyTrainingFilterRdoModel.createForCompletedStorage();
    const offsetCompleted: OffsetElementList<MyTrainingTableViewModel> = await this.myTrainingApi.findAllTableViews(filterRdo);

    if (
      offsetCompleted &&
      offsetCompleted.results &&
      offsetCompleted.results.length > 0
    ) {
      this.completedTableViews = offsetCompleted.results.map(completedTableView => new MyTrainingTableViewModel(completedTableView));
      this.completedTableCount = offsetCompleted.totalCount;

      return this.completedTableViews;
    }

    return null;
  }

  @action
  selectOne(serviceId: string) {
    this.selectedServiceIds = [...this.selectedServiceIds, serviceId];
  }

  @action
  clearOne(serviceId: string) {
    this.selectedServiceIds = this.selectedServiceIds.filter(
      selectedServiceId => selectedServiceId !== serviceId
    );
  }

  @action
  selectAll() {
    this.selectedServiceIds = this._myTrainingTableViews.map(
      tableView => tableView.serviceId
    );
  }

  @action
  clearAll() {
    this.selectedServiceIds = [];
  }

  @action
  clearAllSelectedServiceIds() {
    this.selectedServiceIds = [];
  }

  @action
  sortTableViews(column: string, direction: Direction) {
    // 전달되는 컬럼이 오브젝트의 프로퍼티와 상이해, 변환해야함.
    const propKey = convertToKey(column);

    this.column = propKey;
    this.direction = direction;

    if (direction === Direction.ASC) {
      this._myTrainingTableViews = this._myTrainingTableViews.sort(
        (a, b) => a[propKey] - b[propKey]
      );
      return;
    }
    if (direction === Direction.DESC) {
      this._myTrainingTableViews = this._myTrainingTableViews.sort(
        (a, b) => b[propKey] - a[propKey]
      );
    }
  }

  @action
  clearAllTabCount() {
    this.inprogressCount = 0;
    this.completedCount = 0;
    this.enrolledCount = 0;
    this.retryCount = 0;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default MyTrainingService;

Object.defineProperty(MyTrainingService, 'instance', {
  value: new MyTrainingService(MyTrainingApi.instance),
  writable: false,
  configurable: false,
});

export const convertToKey = (column: string): any => {
  switch (column) {
    case '학습시간':
      return 'learningTime';
    case '학습시작일':
      return 'startDate';
    case '최근학습일':
      return 'time';
    case '학습완료일':
    case '획득일자':
      return 'endDate';
    case '스탬프':
      return 'stampCount';
    case '등록일':
      return 'createDate';
    case '취소/미이수일':
      return 'time';
    default:
      return '';
  }
};