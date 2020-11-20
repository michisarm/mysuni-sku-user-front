import { IObservableArray, action, computed, observable, runInAction } from 'mobx';
import { autobind, Offset } from '@nara.platform/accent';
import { CubeType, OffsetElementList } from 'shared/model';
import MyTrainingFilterRdoModel from 'myTraining/model/MyTrainingFilterRdoModel';
import { Direction } from 'myTraining/ui/view/table/MyLearningTableHeader';
import { FilterCondition } from 'myTraining/ui/view/filterbox/MultiFilterBox';
import { MyContentType, ViewType } from 'myTraining/ui/logic/MyLearningListContainerV2';
import { MyLearningContentType } from 'myTraining/ui/model';
import MyTrainingTableViewModel from 'myTraining/model/MyTrainingTableViewModel';
import MyTrainingApi from '../apiclient/MyTrainingApi';
import MyTrainingModel from '../../model/MyTrainingModel';
import MyTrainingRdoModel from '../../model/MyTrainingRdoModel';
import MyTrainingSimpleModel from '../../model/MyTrainingSimpleModel';
import FilterCountViewModel from 'myTraining/model/FilterCountViewModel';



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
  async saveAllLearningPassedToStorage(state: string, endDate: string) {
    //
    await this.myTrainingApi
      .saveAllLearningPassedToStorage(state, endDate)
      .then((response: any) => {
        if (response) {
          if (response.data !== null && response.data !== '') {
            this.setCombineLearningPassedFromStorage(
              JSON.stringify(response.data)
            );
          }
        }
      });
  }

  @action
  async saveNewLearningPassedToStorage(state: string) {
    //
    const endDate: string | null = sessionStorage.getItem('endDate');
    if (endDate) {
      await this.myTrainingApi
        .saveAllLearningPassedToStorage(state, endDate)
        .then((response: any) => {
          if (response) {
            if (response.data !== null && response.data !== '') {
              this.setCombineLearningPassedFromStorage(
                JSON.stringify(response.data)
              );
            }
          }
        });
    } else {
      this.saveAllLearningPassedToStorage('Passed', '0');
    }
  }

  @action
  async setCombineLearningPassedFromStorage(data: string) {
    //

    if (data.length > 0) {
      const newModel: OffsetElementList<MyTrainingSimpleModel> = JSON.parse(
        data
      );
      // if (newModel.results.length > 0) {
      //   console.log('newModel Count : ', newModel.results.length);
      // }
      const oldJson = sessionStorage.getItem('learningPassed');
      const oldInProgressJson = sessionStorage.getItem(
        'InProgressLearningList'
      );
      if (oldJson) {
        if (oldJson.length > 0) {
          const oldModel: OffsetElementList<MyTrainingSimpleModel> = JSON.parse(
            oldJson
          );
          // console.log('oldModel Count : ', oldModel.results.length);
          if (oldModel.results.length > 0) {
            newModel.results = newModel.results.concat(oldModel.results);
          }
        }
      }

      // console.log('total Count : ', newModel.results.length);

      if (newModel && newModel.results && newModel.results.length > 0) {
        sessionStorage.setItem('endDate', newModel.results[0].endDate);
        sessionStorage.setItem('learningPassed', JSON.stringify(newModel));
      }

      if (oldInProgressJson) {
        if (oldInProgressJson.length > 0) {
          //window.sessionStorage.removeItem('InProgressLearningList');
          //this.findAllMyTrainingsWithState('InProgress', 8, 0,[], true);
          const rdo = MyTrainingRdoModel.newWithState('InProgress', 8, 0, []);
          const offsetList = await this.myTrainingApi.findAllMyTrainings(rdo);
          //window.sessionStorage.removeItem('InProgressLearningList');
          window.sessionStorage.setItem('InProgressLearningList', JSON.stringify(offsetList));
        }
      }
    }
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
    const rdo = fromMain ? MyTrainingRdoModel.newWithStateFromMain(state, limit, offset, channelIds, 'main') :
      MyTrainingRdoModel.newWithState(state, limit, offset, channelIds);


    const offsetList = await this.myTrainingApi.findAllMyTrainings(rdo);
    if (fromMain) {
      //window.sessionStorage.removeItem('InProgressLearningList');
      //this.clear();
      window.sessionStorage.setItem('InProgressLearningList', JSON.stringify(offsetList));
    }

    runInAction(() => (this._myTrainings = offsetList.results));
    return offsetList;
  }

  @action
  async setMyTrainingsWithState(lectures: OffsetElementList<MyTrainingModel>) {
    //
    const offsetList = lectures;

    runInAction(() => (this._myTrainings = offsetList.results));
    return offsetList;
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
  async findAndAddAllMyTrainingsWithStamp(
    limit: number,
    offset: number,
    channelIds: string[] = []
  ) {
    //
    const rdo = MyTrainingRdoModel.new(limit, offset, channelIds);
    const trainingOffsetElementList = await this.myTrainingApi.findAllMyTrainingsWithStamp(
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
  async findAndAddAllMyTrainingsWithStampForExcel(limit: number, offset: number, channelIds: string[] = []) {
    //
    const rdo = MyTrainingRdoModel.new(limit, offset, channelIds);
    const trainingOffsetElementList = await this.myTrainingApi.findAllMyTrainingsWithStamp(rdo);

    runInAction(() => this._myTrainingsExcel = this._myTrainingsExcel.concat(trainingOffsetElementList.results));
    return trainingOffsetElementList;
  }

  @action
  async countMyTrainingsWithStamp(channelIds: string[] = []) {
    //
    const rdo = MyTrainingRdoModel.new(1, 0, channelIds);
    const trainingOffsetElementList = await this.myTrainingApi.findAllMyTrainingsWithStamp(rdo);

    runInAction(() => this.myStampCount = trainingOffsetElementList.totalCount);

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

  // store 에서 관리가 되나, 변동사항이 있더라도 리 랜더링하지 않음. observable하지 않음.
  _myTrainingFilterRdo: MyTrainingFilterRdoModel = new MyTrainingFilterRdoModel();

  @observable
  private _filterCountViews: FilterCountViewModel[] = [];

  @observable
  private _totalFilterCountView: FilterCountViewModel = new FilterCountViewModel;

  private inProgressTableViews: MyTrainingTableViewModel[] = [];

  private inProgressTableCount: number = 0;

  private completedTableViews: MyTrainingTableViewModel[] = [];

  private completedTableCount: number = 0;

  @observable
  selectedServiceIds: string[] = [];

  @computed get myTrainingTableViews() {
    //
    return this._myTrainingTableViews;
  }

  @computed get myTrainingTableCount() {
    return this._myTrainingTableViewCount;
  }

  @computed get filterCountViews() {
    return this._filterCountViews;
  }

  @computed get totalFilterCountView() {
    return this._totalFilterCountView;
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
  clearAllTableViews() {
    this._myTrainingTableViews = [];
    this._myTrainingTableViewCount = 0;
  }

  initFilterRdo(contentType: MyContentType) {
    this._myTrainingFilterRdo = MyTrainingFilterRdoModel.create(contentType);
  }

  changeFilterRdoWithViewType(viewType: ViewType) {
    if (viewType === 'All') {
      viewType = '';
    }

    this._myTrainingFilterRdo.changeViewType(viewType);
    this._myTrainingFilterRdo.setDefaultOffset();
  }

  changeFilterRdoWithConditions(conditions: FilterCondition) {
    /* 조건이 변경되면 offset 을 초기화 해, 새롭게 조회함. */
    this._myTrainingFilterRdo.changeConditions(conditions);
    this._myTrainingFilterRdo.setDefaultOffset();
  }

  changeFilterRdoWithOffset(offset: Offset) {
    this._myTrainingFilterRdo.changeOffset(offset);
  }

  getFilterCount() {
    return this._myTrainingFilterRdo.getFilterCount();
  }

  @action
  async findAllTableViews() {
    /* session storage 에 학습중 & 학습완료 데이터가 있다면 session storage 에서 데이터를 조회함. */

    /* 학습중 */
    if (this._myTrainingFilterRdo.contentType === 'InProgress') {
      const inProgressJson = sessionStorage.getItem('inProgressTableViews');
      if (inProgressJson) {
        const inProgressStorage: MyTrainingTableViewModel[] = JSON.parse(inProgressJson);
        if (inProgressStorage && inProgressStorage.length > 0) {
          const inProgressTableViews = inProgressStorage.map((inProgress: MyTrainingTableViewModel) => new MyTrainingTableViewModel(inProgress));
          if (this._myTrainingFilterRdo.viewType === 'Course') {
            /* 코스만보기 */
            const courseTableViews = inProgressTableViews.filter(tableView => !tableView.isCardType());

            console.log('courseTableViews :: ', courseTableViews);
            console.log('courseTableViews length :: ', courseTableViews.length);

            this._myTrainingTableViews = courseTableViews.slice(0, 20);
            this._myTrainingTableViewCount = courseTableViews.length;
            return false;
          }

          /* 전체보기 */
          this._myTrainingTableViews = this.inProgressTableViews.slice(0, 20);
          this._myTrainingTableViewCount = this.inProgressTableCount;
          return false;
        }
      }
    }

    /* 학습완료 */
    if (this._myTrainingFilterRdo.contentType === 'Completed') {
      const completedJson = sessionStorage.getItem('completedTableViews');
      if (completedJson) {
        const completedStorage: MyTrainingTableViewModel[] = JSON.parse(completedJson);
        if (completedStorage && completedStorage.length > 0) {
          const completedTableViews = completedStorage.map(completed => new MyTrainingTableViewModel(completed));
          if (this._myTrainingFilterRdo.viewType === 'Course') {
            /* 코스만보기 */
            const courseTableViews = completedTableViews.filter(tableView => tableView.serviceType !== 'CARD');

            console.log('completed courseTableViews :: ', courseTableViews);
            console.log('completed courseTableViews length :: ', courseTableViews.length);
            this._myTrainingTableViews = courseTableViews.slice(0, 20);
            this._myTrainingTableViewCount = courseTableViews.length;
            return false;
          }

          /* 전체보기 */
          this._myTrainingTableViews = this.completedTableViews.slice(0, 20);
          this._myTrainingTableViewCount = this.completedTableCount;
          return false;
        }
      }
    }

    // 기존의 조건을 담고 있는 rdo와 새로운 조건을 가지는 rdo 병합.
    const offsetTableViews: OffsetElementList<MyTrainingTableViewModel> = await this.myTrainingApi.findAllTableViews(this._myTrainingFilterRdo);

    if (offsetTableViews &&
      offsetTableViews.results &&
      offsetTableViews.results.length) {
      runInAction(() => {
        this._myTrainingTableViews = offsetTableViews.results.map(result => new MyTrainingTableViewModel(result));
        this._myTrainingTableViewCount = offsetTableViews.totalCount;
      });
      return false;
    }
    return true;
  }

  @action
  async findAllStampTableViews() {

    const offsetTableViews: OffsetElementList<MyTrainingTableViewModel> = await this.myTrainingApi.findAllStampTableViews(this._myTrainingFilterRdo);

    if (offsetTableViews &&
      offsetTableViews.results &&
      offsetTableViews.results.length) {
      runInAction(() => {
        this._myTrainingTableViews = offsetTableViews.results.map(result => new MyTrainingTableViewModel(result));
        this._myTrainingTableViewCount = offsetTableViews.totalCount;
      });
      return false;
    }
    return true;
  }

  @action
  async findAllStampTableViewsByConditions() {
    const offsetTableViews: OffsetElementList<MyTrainingTableViewModel> = await this.myTrainingApi.findAllStampTableViews(this._myTrainingFilterRdo);

    if (offsetTableViews &&
      offsetTableViews.results &&
      offsetTableViews.results.length) {
      runInAction(() => {
        this._myTrainingTableViews = offsetTableViews.results.map(result => new MyTrainingTableViewModel(result));
        this._myTrainingTableViewCount = offsetTableViews.totalCount;
      });
      return false;
    }
    return true;
  }

  @action
  async findAllStampTableViewsWithPage(offset: Offset) {
    this._myTrainingFilterRdo.changeOffset(offset);

    const offsetTableViews: OffsetElementList<MyTrainingTableViewModel> = await this.myTrainingApi.findAllStampTableViews(this._myTrainingFilterRdo);

    if (offsetTableViews &&
      offsetTableViews.results &&
      offsetTableViews.results.length) {
      const addedTableViews = offsetTableViews.results.map(result => new MyTrainingTableViewModel(result));
      runInAction(() => this._myTrainingTableViews = [...this._myTrainingTableViews, ...addedTableViews]);
    }
  }


  @action
  async findAllTableViewsWithPage(offset: Offset) {
    /* session storage 에 학습중 & 학습완료 데이터가 있다면 session storage 에서 데이터를 조회함. */
    if (this._myTrainingFilterRdo.getFilterCount() === 0) {
      /* 조건이 없을 경우에만 session storage 에서 데이터를 가져옴. */
      const addedTableViews = this.getAddedTableViewsFromStorage(offset);
      if (addedTableViews && addedTableViews.length) {
        this._myTrainingTableViews = [...this.myTrainingTableViews, ...addedTableViews];
        return;
      }
    }

    this._myTrainingFilterRdo.changeOffset(offset);

    const offsetTableViews: OffsetElementList<MyTrainingTableViewModel> = await this.myTrainingApi.findAllTableViews(this._myTrainingFilterRdo);

    if (
      offsetTableViews &&
      offsetTableViews.results &&
      offsetTableViews.results.length) {
      const addedTableViews = offsetTableViews.results.map(result => new MyTrainingTableViewModel(result));
      runInAction(() => {
        this._myTrainingTableViews = [...this._myTrainingTableViews, ...addedTableViews];
      });
    }
  }

  /* session storage 로부터 페이징 처리 후 추가되어야 하는 데이터를 조회함. */
  private getAddedTableViewsFromStorage(offset: Offset): MyTrainingTableViewModel[] {
    const { contentType, viewType } = this._myTrainingFilterRdo;

    const startIndex = offset.offset;
    const endIndex = offset.offset + offset.limit;

    if (contentType === MyLearningContentType.InProgress) {
      if (viewType === 'Course') {
        const courseTableViews = this.inProgressTableViews.filter(tableView => tableView.serviceType !== 'CARD');
        return courseTableViews.slice(startIndex, endIndex);
      }

      return this.inProgressTableViews.slice(startIndex, endIndex);
    }

    if (contentType === MyLearningContentType.Completed) {
      if (viewType === 'Course') {
        const courseTableViews = this.completedTableViews.filter(tableView => tableView.serviceType !== 'CARD');
        return courseTableViews.slice(startIndex, endIndex);
      }

      return this.completedTableViews.slice(startIndex, endIndex);
    }

    return [];
  }

  @action
  async findAllTableViewsWithServiceType(serviceType: string) {
    this._myTrainingFilterRdo.changeOffset({ offset: 0, limit: 20 });
    this._myTrainingFilterRdo.changeServiceType(serviceType.toUpperCase());

    const offsetTableViews: OffsetElementList<MyTrainingTableViewModel> = await this.myTrainingApi.findAllTableViews(this._myTrainingFilterRdo);

    if (
      offsetTableViews &&
      offsetTableViews.results &&
      offsetTableViews.results.length) {

      runInAction(() => {
        this._myTrainingTableViews = offsetTableViews.results.map(result => new MyTrainingTableViewModel(result));
        this._myTrainingTableViewCount = offsetTableViews.totalCount;
      });
    }
  }

  @action
  async findAllTableViewsByConditions() {
    const offsetMyTrainings: OffsetElementList<MyTrainingTableViewModel> = await this.myTrainingApi.findAllTableViews(this._myTrainingFilterRdo);

    if (
      offsetMyTrainings &&
      offsetMyTrainings.results &&
      offsetMyTrainings.results.length) {

      runInAction(() => {
        this._myTrainingTableViews = offsetMyTrainings.results.map(offsetMyTraining => new MyTrainingTableViewModel(offsetMyTraining));
        this._myTrainingTableViewCount = offsetMyTrainings.totalCount;
      });

      return false;
    }

    return true;
  }

  async findAllTableViewsForExcel() {
    // 기존의 rdo 를 copy 해 새로운 엑셀 조회용 rdo 생성. ( offset 을 변경함으로 기존의 Rdo 에 영향이 없도록 하기 위함.)
    const filterRdoForExcel: MyTrainingFilterRdoModel = new MyTrainingFilterRdoModel(this._myTrainingFilterRdo);

    // 엑셀 조회용 rdo 는 페이징 처리 없이 전체를 조회해야 함.
    filterRdoForExcel.changeOffset({ offset: 0, limit: 9999 });

    const myTrainingTableViewsForExcel: MyTrainingTableViewModel[] = await this.myTrainingApi.findAllTableViewsForExcel(filterRdoForExcel);

    return myTrainingTableViewsForExcel;
  }

  async findAllStampTableViewsForExcel() {
    const filterRdoForExcel: MyTrainingFilterRdoModel = new MyTrainingFilterRdoModel(this._myTrainingFilterRdo);

    filterRdoForExcel.changeOffset({ offset: 0, limit: 9999 });

    const offsetMyTrainings: OffsetElementList<MyTrainingTableViewModel> = await this.myTrainingApi.findAllStampTableViews(filterRdoForExcel);
    const myTrainingV2sForExcel = offsetMyTrainings.results.map(offsetMyTraining => new MyTrainingTableViewModel(offsetMyTraining));

    return myTrainingV2sForExcel;
  }

  /* 메인 페이지 진입 시 session storage 에 전체 학습중 데이터를 저장하기 위한 service. */
  async findAllInProgressTableViewsForStorage() {
    const filterRdo = MyTrainingFilterRdoModel.createForStorage(MyLearningContentType.InProgress, { offset: 0, limit: 9999 });

    const offsetInProgress: OffsetElementList<MyTrainingTableViewModel> = await this.myTrainingApi.findAllTableViews(filterRdo);
    if (offsetInProgress &&
      offsetInProgress.results &&
      offsetInProgress.results.length) {
      const inProgressTableViews = offsetInProgress.results.map(inProgressTableView => new MyTrainingTableViewModel(inProgressTableView));

      return inProgressTableViews;
    }

    return null;
  }

  /* 메인 페이지 진입 시 session storage 에 전체 학습완료 데이터를 저장하기 위한 service. */
  async findAllCompletedTableViewsForStorage() {
    const filterRdo = MyTrainingFilterRdoModel.createForStorage(MyLearningContentType.Completed, { offset: 0, limit: 9999 });

    const offsetCompleted: OffsetElementList<MyTrainingTableViewModel> = await this.myTrainingApi.findAllTableViews(filterRdo);
    if (offsetCompleted &&
      offsetCompleted.results &&
      offsetCompleted.results.length) {
      const completedTableViews = offsetCompleted.results.map(completedTableView => new MyTrainingTableViewModel(completedTableView));
      this.completedTableViews = completedTableViews;
      this.completedTableCount = completedTableViews.length;

      return completedTableViews;
    }

    return null;
  }

  @action
  async findAllFilterCountViews() {
    const response = await this.myTrainingApi.findAllFilterCountViews(this._myTrainingFilterRdo);

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
  selectOne(serviceId: string) {
    this.selectedServiceIds = [...this.selectedServiceIds, serviceId];
  }

  @action
  clearOne(serviceId: string) {
    this.selectedServiceIds = this.selectedServiceIds.filter(selectedServiceId => selectedServiceId !== serviceId);
  }

  @action
  selectAll() {
    this.selectedServiceIds = this._myTrainingTableViews.map(tableView => tableView.serviceId);
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

    if (direction === Direction.ASC) {
      this._myTrainingTableViews = this._myTrainingTableViews.sort((a, b) => a[propKey] - b[propKey]);
      return;
    }
    if (direction === Direction.DESC) {
      this._myTrainingTableViews = this._myTrainingTableViews.sort((a, b) => b[propKey] - a[propKey]);
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

// console.log('offset : ', offset);
// console.log('limit : ', limit + offset);
// if (channelIds.length > 0) {
//   // const result: ConcatArray<MyTrainingModel> = [];
//   const trst: MyTrainingModel[][] = [];
//   const rest: MyTrainingModel[] = [];
//
//   for (let i = 0; i < channelIds.length; i++) {
//     for (let j = 0; j < offsetList.results.length; j++) {
//       if (offsetList.results[j].category.channel.id === channelIds[i]){
//         rest.push(offsetList.results[j]);
//       }
//     }
//     //trst.push(offsetList.results.filter(e => e.category.channel.id === channelIds[i]));
//   }
//
//   // @ts-ignore
//   rest.sort((a, b) => b.endDate - a.endDate).slice(offset, limit + offset);
//
//   offsetList.totalCount = rest.length;
//
//   console.log(rest);
//
//   // const result = offsetList.results.slice(offset, limit + offset).find(e => e.category.channel.id === channelIds[0]);
//   const result = offsetList.results.filter(e => e.category.channel.id === channelIds[0]).slice(offset, limit + offset);
//   // @ts-ignore
//   runInAction(() => this._myTrainings = this._myTrainings.concat(rest));
//   return offsetList;
// } else {
//   const result = offsetList.results.slice(offset, limit + offset);
//   // @ts-ignore
//   runInAction(() => this._myTrainings = this._myTrainings.concat(result));
//   return offsetList;
// }
// 1
