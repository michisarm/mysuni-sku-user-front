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

  // @action
  // async findAllMyTrainingsWithState(
  //   state: string,
  //   limit: number,
  //   offset: number,
  //   channelIds: string[] = [],
  //   fromMain: boolean = false
  // ) {
  //   //
  //
  //   /* 메인페이지에서 호출 시. */
  //   const rdo = fromMain
  //     ? MyTrainingRdoModel.newWithStateFromMain(
  //         state,
  //         limit,
  //         offset,
  //         channelIds,
  //         'main'
  //       )
  //     : MyTrainingRdoModel.newWithState(state, limit, offset, channelIds);
  //
  //   const offsetList: OffsetElementList<MyTrainingModel> = await this.myTrainingApi.findAllMyTrainings(
  //     rdo
  //   );
  //   if (fromMain) {
  //     //window.sessionStorage.removeItem('InProgressLearningList');
  //     //this.clear();
  //     window.sessionStorage.setItem(
  //       'InProgressLearningList',
  //       JSON.stringify(offsetList)
  //     );
  //   }
  //
  //   runInAction(() => (this._myTrainings = offsetList.results));
  //   return offsetList;
  // }

  @action
  async setMyTrainingsWithState(lectures: OffsetElementList<MyTrainingModel>) {
    //
    const myTrainings = lectures.results.map(
      (result) => new MyTrainingModel(result)
    );

    runInAction(() => (this._myTrainings = myTrainings));
    return lectures;
  }

  // @action
  // async findAndAddAllMyTrainingsWithState(
  //   state: string,
  //   limit: number,
  //   offset: number,
  //   channelIds: string[] = []
  // ) {
  //   //
  //   if (state === 'Completed' || state === 'Passed') {
  //     const learningPassed = sessionStorage.getItem('learningPassed');
  //     if (learningPassed) {
  //       let result: MyTrainingModel[] = [];
  //       const parseElement: OffsetElementList<MyTrainingModel> =
  //         JSON.parse(learningPassed);
  //       const offsetList: OffsetElementList<MyTrainingModel> =
  //         new OffsetElementList<MyTrainingModel>();
  //       offsetList.results = offsetList.results.concat(
  //         parseElement.results.map((e) => new MyTrainingModel(e))
  //       );
  //
  //       if (channelIds.length === 0) {
  //         result = offsetList.results;
  //         // if (result.length > 0) {
  //         //   sessionStorage.setItem('endDate', result[0].endDate);
  //         // }
  //       } else {
  //         for (let i = 0; i < channelIds.length; i++) {
  //           for (let j = 0; j < offsetList.results.length; j++) {
  //             if (offsetList.results[j].category.channel.id === channelIds[i]) {
  //               result.push(offsetList.results[j]);
  //             }
  //           }
  //         }
  //       }
  //
  //       // @ts-ignore
  //       result.sort((a, b) => b.endDate - a.endDate);
  //       const useResult: MyTrainingModel[] = result.slice(
  //         offset,
  //         limit + offset
  //       );
  //       offsetList.totalCount = result.length;
  //
  //       runInAction(
  //         () => (this._myTrainings = this._myTrainings.concat(useResult))
  //       );
  //       return offsetList;
  //     }
  //   }
  //
  //   const rdo = MyTrainingRdoModel.newWithState(
  //     state,
  //     limit,
  //     offset,
  //     channelIds
  //   );
  //   const offsetList = await this.myTrainingApi.findAllMyTrainings(rdo);
  //   runInAction(
  //     () => (this._myTrainings = this._myTrainings.concat(offsetList.results))
  //   );
  //   return offsetList;
  // }

  // @action
  // async findAllMyTrainingsWithRequired(
  //   limit: number,
  //   offset: number,
  //   channelIds: string[] = []
  // ) {
  //   //
  //   const rdo = MyTrainingRdoModel.newWithRequired(limit, offset, channelIds);
  //   const offsetList = await this.myTrainingApi.findAllMyTrainings(rdo);
  //
  //   runInAction(() => (this._myTrainings = offsetList.results));
  //
  //   return offsetList;
  // }

  // @action
  // async findAndAddAllMyTrainingsWithRequired(
  //   limit: number,
  //   offset: number,
  //   channelIds: string[] = []
  // ) {
  //   //
  //   const rdo = MyTrainingRdoModel.newWithRequired(limit, offset, channelIds);
  //   const offsetList = await this.myTrainingApi.findAllMyTrainings(rdo);

  //   runInAction(
  //     () => (this._myTrainings = this._myTrainings.concat(offsetList.results))
  //   );
  //   return offsetList;
  // }

  // @action
  // async findAndAddAllMyCommunityTrainings(limit: number, offset: number) {
  //   //
  //   const rdo = MyTrainingRdoModel.newWithCubeType(
  //     CubeType.Community,
  //     limit,
  //     offset
  //   );
  //   const trainingOffsetElementList =
  //     await this.myTrainingApi.findAllMyTrainings(rdo);

  //   runInAction(
  //     () =>
  //       (this._myTrainings = this._myTrainings.concat(
  //         trainingOffsetElementList.results
  //       ))
  //   );

  //   return trainingOffsetElementList;
  // }

  @action
  async countMyTrainingsWithStamp(
    channelIds: string[] = [],
    startDate?: number,
    endDate?: number
  ) {
    //
    const rdo = MyTrainingRdoModel.new(0, 0, channelIds, startDate, endDate);
    const trainingOffsetElementList =
      await this.myTrainingApi.findAllMyTrainingsWithStamp(rdo);
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

  @observable
  _myTrainingTableViewCount2: number = 0;

  _myTrainingFilterRdo: MyTrainingFilterRdoModel =
    new MyTrainingFilterRdoModel();

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

  @computed get myTrainingTableCount2() {
    return this._myTrainingTableViewCount2;
  }

  @action
  async findAllTabCount() {
    const offsetTableViews: OffsetElementList<MyTrainingTableViewModel> | null =
      await this.myTrainingApi.findEnrollTableViews(this._myTrainingFilterRdo);
    runInAction(
      () =>
        (this._myTrainingTableViewCount2 =
          (offsetTableViews &&
            offsetTableViews.results &&
            offsetTableViews.results.length > 0 &&
            offsetTableViews.totalCount) ||
          0)
    );
  }

  @action
  clearAllTableViews() {
    this._myTrainingTableViews = [];
    this._myTrainingTableViewCount = 0;
    // this._myTrainingTableViewCount2 = 0;
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
    if (
      this._myTrainingFilterRdo.myTrainingState ===
      MyLearningContentType.InProgress
    ) {
      if (this.inProgressTableViews.length > 0) {
        // const cardIds = this.inProgressTableViews.slice(0, 20).map(result => result.serviceId);
        // const cardNotes = await this.myTrainingApi.findCardNoteList(cardIds) || [];

        // // 노트 작성여부 추가
        // const updateNoteInProgressTableViews = this.inProgressTableViews.slice(0, 20).map(result => {
        //   if(cardNotes && cardNotes.length){
        //     result.useNote = cardNotes.some(
        //       (note: any) => {
        //         if(result.serviceType === "Card"){
        //           if(note?.cardId === result.serviceId){
        //             return true;
        //           }
        //         }else if(result.serviceType === "Cube"){
        //           if(note?.cardId === result.cardId && note?.cardId === result.cardId){
        //             return true;
        //           }
        //         }
        //         return false;
        //       }) || false;
        //   }
        //   return new MyTrainingTableViewModel(result)
        // });

        const updateNoteInProgressTableViews = await this.setTableViewsNoteInfo(
          this.inProgressTableViews.slice(0, 20)
        );

        runInAction(() => {
          this._myTrainingTableViews = updateNoteInProgressTableViews;
          this._myTrainingTableViewCount = this.inProgressTableCount;
        });
        return false;
      }
    }

    if (this._myTrainingFilterRdo.myTrainingState === 'Completed') {
      if (this.completedTableViews.length > 0) {
        const updateCompletedTableViews = await this.setTableViewsNoteInfo(
          this.completedTableViews.slice(0, 20)
        );

        // this._myTrainingTableViews = this.completedTableViews.slice(0, 20);
        runInAction(() => {
          this._myTrainingTableViews = updateCompletedTableViews;
          this._myTrainingTableViewCount = this.completedTableCount;
        });
        return false;
      }
    }

    const offsetTableViews: OffsetElementList<MyTrainingTableViewModel> =
      await this.myTrainingApi.findAllTableViews(this._myTrainingFilterRdo);

    if (
      offsetTableViews &&
      offsetTableViews.results &&
      offsetTableViews.results.length > 0
    ) {
      // const cardIds = new Set<string>();
      // const cubeIds = new Set<string>();

      // offsetTableViews.results.slice(0, 20).map((result: any) => {
      //   // map.set(result.serviceId, result.serviceType);
      //   if(result.cubeType && result.category){
      //     if(result.serviceType === "Card"){
      //       if(result.serviceId) cardIds.add(result.serviceId);
      //     }else if(result.serviceType === "Cube"){
      //       if(result.cardId && result.serviceId){
      //         cardIds.add(result.cardId);
      //         cubeIds.add(result.serviceId);
      //       }
      //     }
      //   }
      // });

      // const noteDatas: any = [];

      // if(cardIds.size > 0 && cubeIds.size > 0){
      //   const cubeNotes = await this.myTrainingApi.findCubeNoteList(Array.from(cardIds), Array.from(cubeIds)) || []
      //   noteDatas.concat(cubeNotes);
      // }

      // if(cardIds.size > 0 && cubeIds.size === 0){
      //   const cardNotes = await this.myTrainingApi.findCardNoteList(Array.from(cardIds)) || [];
      //   noteDatas.concat(cardNotes);
      // }

      // const updateMyTrainingTableViews = offsetTableViews.results.map((result:any) => {
      //   if(noteDatas.length > 0){
      //     result.useNote = noteDatas.some(
      //       (note: any) => {
      //         if(result.serviceType === "Card"){
      //           if(note?.cardId === result.serviceId){
      //             return true;
      //           }
      //         }else if(result.serviceType === "Cube"){
      //           if(note?.cardId === result.cardId && note?.cardId === result.cardId){
      //             return true;
      //           }
      //         }
      //         return false;
      //       }) || false;
      //   }
      //   return new MyTrainingTableViewModel(result)
      // });

      const updateMyTrainingTableViews = await this.setTableViewsNoteInfo(
        offsetTableViews.results
      );

      runInAction(() => {
        this._myTrainingTableViews = updateMyTrainingTableViews;
        this._myTrainingTableViewCount = offsetTableViews.totalCount;
      });
      return false;
    }
    return true;
  }

  @action
  async findEnrollTableViews() {
    const offsetTableViews: OffsetElementList<MyTrainingTableViewModel> | null =
      await this.myTrainingApi.findEnrollTableViews(this._myTrainingFilterRdo);

    const cardIds = offsetTableViews?.results.map((card) => card.cardId) || [];

    const cardNotes =
      (await this.myTrainingApi.findCardNoteList(cardIds)) || [];

    const enrolledLectures = offsetTableViews?.results.map((card) => {
      const enrolledLecture = card;
      enrolledLecture.useNote = cardNotes.some(
        (note) => note.cardId === card.cardId
      );
      return enrolledLecture;
    });

    if (
      offsetTableViews &&
      offsetTableViews.results &&
      offsetTableViews.results.length > 0
    ) {
      runInAction(() => {
        this._myTrainingTableViews =
          (enrolledLectures &&
            enrolledLectures.map(
              (result) => new MyTrainingTableViewModel(result)
            )) ||
          [];
        this._myTrainingTableViewCount2 = offsetTableViews.totalCount;
      });
      return false;
    }
    return true;
  }

  @action
  async findAllTableViewsWithPage(offset: Offset) {
    if (
      this._myTrainingFilterRdo.myTrainingState ===
        MyLearningContentType.InProgress ||
      this._myTrainingFilterRdo.myTrainingState ===
        MyLearningContentType.Completed
    ) {
      if (this._myTrainingFilterRdo.getFilterCount() === 0) {
        const addTableViews = this.getAddTableViewsFromStorage(offset);
        const updateNoteInProgressTableViews =
          await this.setTableViewsNoteInfoWithPage(addTableViews, offset);
        const totalCount =
          this._myTrainingFilterRdo.myTrainingState ===
          MyLearningContentType.InProgress
            ? this.inProgressTableCount
            : this.completedTableCount;

        runInAction(() => {
          this._myTrainingTableViews = updateNoteInProgressTableViews;
          this._myTrainingTableViewCount = totalCount;
        });

        return;
      } else {
        this._myTrainingFilterRdo.setOffset(offset);

        const offsetTableViews: OffsetElementList<MyTrainingTableViewModel> =
          await this.myTrainingApi.findAllMyTrainingTableViewsSearch(
            this._myTrainingFilterRdo
          );

        if (
          offsetTableViews &&
          offsetTableViews.results &&
          offsetTableViews.results.length
        ) {
          const updateMyTrainingAddTableViews =
            await this.setTableViewsNoteInfo(offsetTableViews.results);

          runInAction(() => {
            this._myTrainingTableViews = [
              ...this._myTrainingTableViews,
              ...updateMyTrainingAddTableViews,
            ];
            this._myTrainingTableViewCount = offsetTableViews.totalCount;
          });
          return;
        }
      }
    }

    this._myTrainingFilterRdo.setOffset(offset);

    const offsetTableViews: OffsetElementList<MyTrainingTableViewModel> =
      await this.myTrainingApi.findAllTableViews(this._myTrainingFilterRdo);

    if (
      offsetTableViews &&
      offsetTableViews.results &&
      offsetTableViews.results.length
    ) {
      const updateMyTrainingAddTableViews = await this.setTableViewsNoteInfo(
        offsetTableViews.results
      );

      runInAction(() => {
        this._myTrainingTableViews = [
          ...this._myTrainingTableViews,
          ...updateMyTrainingAddTableViews,
        ];
        this._myTrainingTableViewCount = offsetTableViews.totalCount;
      });
    }
  }

  private getAddTableViewsFromStorage(
    offset: Offset
  ): MyTrainingTableViewModel[] {
    const endIndex = offset.offset + offset.limit;

    if (
      this._myTrainingFilterRdo.myTrainingState ===
      MyLearningContentType.InProgress
    ) {
      return this.inProgressTableViews.slice(0, endIndex);
    }

    if (
      this._myTrainingFilterRdo.myTrainingState ===
      MyLearningContentType.Completed
    ) {
      return this.completedTableViews.slice(0, endIndex);
    }

    return [];
  }

  @action
  async findAllTableViewsByConditions() {
    const offsetMyTrainings: OffsetElementList<MyTrainingTableViewModel> =
      await this.myTrainingApi.findAllMyTrainingTableViewsSearch(
        this._myTrainingFilterRdo
      );

    if (
      offsetMyTrainings &&
      offsetMyTrainings.results &&
      offsetMyTrainings.results.length
    ) {
      const updateMyTrainingTableViews = await this.setTableViewsNoteInfo(
        offsetMyTrainings.results
      );

      runInAction(() => {
        this._myTrainingTableViews = updateMyTrainingTableViews;
        this._myTrainingTableViewCount = offsetMyTrainings.totalCount;
      });

      return false;
    }

    return true;
  }

  async findAllTableViewsForExcel() {
    // 기존의 rdo 를 copy 해 새로운 엑셀 조회용 rdo 생성. ( offset 을 변경함으로 기존의 Rdo 에 영향이 없도록 하기 위함.)
    const filterRdoForExcel: MyTrainingFilterRdoModel =
      new MyTrainingFilterRdoModel(this._myTrainingFilterRdo);

    // 엑셀 조회용 rdo 는 페이징 처리 없이 전체를 조회해야 함.
    filterRdoForExcel.setOffset({ offset: 0, limit: 9999 });
    filterRdoForExcel.changeColumnDirection(this.column, this.direction);

    const myTrainingTableViewsForExcel: MyTrainingTableViewModel[] =
      await this.myTrainingApi.findAllTableViewsForExcel(filterRdoForExcel);

    return myTrainingTableViewsForExcel;
  }

  @action
  selectOne(serviceId: string) {
    this.selectedServiceIds = [...this.selectedServiceIds, serviceId];
  }

  @action
  clearOne(serviceId: string) {
    this.selectedServiceIds = this.selectedServiceIds.filter(
      (selectedServiceId) => selectedServiceId !== serviceId
    );
  }

  @action
  selectAll() {
    this.selectedServiceIds = this._myTrainingTableViews.map(
      (tableView) => tableView.serviceId
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

  // Home > Learning > 학습중, 학습예정, mySUNI 학습완료, 취소/미이수 노트 작성여부 표현하기 위해 추가
  async setTableViewsNoteInfo(tableViews: any[]) {
    const cardIds = new Set<string>();
    const cubeIds = new Set<string>();
    let noteDatas: any = [];

    if (tableViews && tableViews.length > 0) {
      tableViews.map((result: any) => {
        // map.set(result.serviceId, result.serviceType);
        if (result.cubeType && result.category) {
          if (result.serviceType === 'Card') {
            if (result.serviceId) cardIds.add(result.serviceId);
          } else if (result.serviceType === 'Cube') {
            if (result.cardId && result.serviceId) {
              cardIds.add(result.cardId);
              cubeIds.add(result.serviceId);
            }
          }
        }
      });

      if (cardIds.size > 0 && cubeIds.size > 0) {
        const cubeNotes =
          (await this.myTrainingApi.findCubeNoteList(
            Array.from(cardIds),
            Array.from(cubeIds)
          )) || [];
        if (cubeNotes && cubeNotes.length > 0)
          noteDatas = noteDatas.concat(cubeNotes);
      }

      if (cardIds.size > 0 && cubeIds.size === 0) {
        const cardNotes =
          (await this.myTrainingApi.findCardNoteList(Array.from(cardIds))) ||
          [];
        if (cardNotes && cardNotes.length > 0)
          noteDatas = noteDatas.concat(cardNotes);
      }

      const updateTableViews = tableViews.map((result: any) => {
        if (noteDatas.length > 0) {
          result.useNote =
            noteDatas.some((note: any) => {
              if (result.serviceType === 'Card') {
                if (note?.cardId === result.serviceId) {
                  return true;
                }
              } else if (result.serviceType === 'Cube') {
                if (
                  note?.cardId === result.cardId &&
                  note?.cardId === result.cardId
                ) {
                  return true;
                }
              }
              return false;
            }) || false;
        }
        return new MyTrainingTableViewModel(result);
      });

      return updateTableViews;
    } else {
      return tableViews;
    }
  }

  // Home > Learning > 학습중, 학습예정, mySUNI 학습완료, 취소/미이수 노트 작성여부 표현하기 위해 추가
  async setTableViewsNoteInfoWithPage(tableViews: any[], offset: Offset) {
    const cardIds = new Set<string>();
    const cubeIds = new Set<string>();
    let noteDatas: any = [];

    if (tableViews && tableViews.length > 0) {
      tableViews
        .slice(offset.offset, offset.limit + offset.offset)
        .map((result: any) => {
          // map.set(result.serviceId, result.serviceType);
          if (result.cubeType && result.category) {
            if (result.serviceType === 'Card') {
              if (result.serviceId) cardIds.add(result.serviceId);
            } else if (result.serviceType === 'Cube') {
              if (result.cardId && result.serviceId) {
                cardIds.add(result.cardId);
                cubeIds.add(result.serviceId);
              }
            }
          }
        });

      if (cardIds.size > 0 && cubeIds.size > 0) {
        const cubeNotes =
          (await this.myTrainingApi.findCubeNoteList(
            Array.from(cardIds),
            Array.from(cubeIds)
          )) || [];
        if (cubeNotes && cubeNotes.length > 0)
          noteDatas = noteDatas.concat(cubeNotes);
      }

      if (cardIds.size > 0 && cubeIds.size === 0) {
        const cardNotes =
          (await this.myTrainingApi.findCardNoteList(Array.from(cardIds))) ||
          [];
        if (cardNotes && cardNotes.length > 0)
          noteDatas = noteDatas.concat(cardNotes);
      }

      const updateTableViews = tableViews.map((result: any) => {
        if (noteDatas.length > 0) {
          result.useNote =
            noteDatas.some((note: any) => {
              if (result.serviceType === 'Card') {
                if (note?.cardId === result.serviceId) {
                  return true;
                }
              } else if (result.serviceType === 'Cube') {
                if (
                  note?.cardId === result.cardId &&
                  note?.cardId === result.cardId
                ) {
                  return true;
                }
              }
            }) || false;
        }
        return new MyTrainingTableViewModel(result);
      });

      return updateTableViews;
    } else {
      return tableViews;
    }
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
    case '학습예정일':
      return 'sortableLearningStartDate';
    default:
      return '';
  }
};
