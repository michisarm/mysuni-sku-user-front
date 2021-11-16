import {
  IObservableArray,
  observable,
  action,
  computed,
  runInAction,
} from 'mobx';
import { autobind, CachingFetch, Offset } from '@nara.platform/accent';
import { OffsetElementList } from 'shared/model';
import InMyLectureTableViewModel from 'myTraining/model/InMyLectureTableViewModel';
import InMyLectureFilterRdoModel from 'myTraining/model/InMyLectureFilterRdoModel';
import InMyLectureApi from '../apiclient/InMyLectureApi';
import InMyLectureModel from '../../model/InMyLectureModel';
import InMyLectureRdoModel from '../../model/InMyLectureRdoModel';
import InMyLectureCdoModel from '../../model/InMyLectureCdoModel';
import FilterCountViewModel from '../../model/FilterCountViewModel';
import { FilterCondition } from '../../model/FilterCondition';
import { Direction } from '../../model/Direction';
import InMyLectureCdo from '../../../lecture/detail/model/InMyLectureCdo';
import MyTrainingApi from '../apiclient/MyTrainingApi';

@autobind
class InMyLectureService {
  //
  static instance: InMyLectureService;

  private inMyLectureApi: InMyLectureApi;

  private myTrainingApi: MyTrainingApi;

  @observable
  _inMyLectures: InMyLectureModel[] = [];

  @observable
  _inMyLectureAll: InMyLectureModel[] = [];

  inMyLectureAllCachingFetch: CachingFetch = new CachingFetch(2000);

  @observable
  inMyLecture: InMyLectureModel = new InMyLectureModel();

  constructor(inMyLectureApi: InMyLectureApi, myTrainingApi: MyTrainingApi) {
    this.inMyLectureApi = inMyLectureApi;
    this.myTrainingApi = myTrainingApi;
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
    this._inMyLectureAll.forEach((inMyLecture) => {
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
    await this.inMyLectureApi
      .addInMyLecture(inMyLectureCdoModel)
      .then((response) => {
        if (response && response.length > 0) {
          runInAction(() => this.findAllInMyLectures());
        }
        return response;
      })
      .catch((reason: any) => {
        return null;
      });
  }

  @action
  async addInMyLectureCard(inMyLectureCdo: InMyLectureCdo) {
    await this.inMyLectureApi
      .addInMyLectureCard(inMyLectureCdo)
      .then((response) => {
        if (response && response.length > 0) {
          runInAction(() => this.findAllInMyLectures());
        }
      });
  }

  @action
  async removeInMyLecture(inMyLectureId: string) {
    await this.inMyLectureApi
      .removeInMyLecture(inMyLectureId)
      .then(() => {
        return runInAction(() => this.findAllInMyLectures());
      })
      .catch((reason: any) => {
        return null;
      });
  }

  @action
  async removeInMyLectureCard(serviceId: string) {
    await this.inMyLectureApi
      .removeInMyLectureCard(serviceId, serviceId)
      .then(() => {
        return runInAction(() => this.findAllInMyLectures());
      })
      .catch((reason: any) => {
        return reason;
      });
  }

  @action
  async findInMyLectures(
    limit: number,
    offset: number,
    channelIds: string[] = []
  ) {
    //
    const response = await this.inMyLectureApi.findInMyLectures(
      InMyLectureRdoModel.new(limit, offset, channelIds)
    );
    const lecturesOffsetElementList = new OffsetElementList<InMyLectureModel>(
      response
    );

    lecturesOffsetElementList.results = lecturesOffsetElementList.results.map(
      (lecture) => new InMyLectureModel(lecture)
    );

    runInAction(
      () =>
        (this._inMyLectures = this._inMyLectures.concat(
          lecturesOffsetElementList.results
        ))
    );
    return lecturesOffsetElementList;
  }

  // InMyLectureAll ----------------------------------------------------------------------------------------------------

  @action
  async findAllInMyLectures() {
    //
    const fetched = this.inMyLectureAllCachingFetch.fetch(
      () => this.inMyLectureApi.findAllInMyLectures(),
      (inMyLectures) =>
        runInAction(
          () =>
            (this._inMyLectureAll = inMyLectures.map(
              (inMyLecture: InMyLectureModel) =>
                new InMyLectureModel(inMyLecture)
            ))
        )
    );

    return fetched
      ? this.inMyLectureAllCachingFetch.inProgressFetching
      : this.inMyLectureAll;
  }

  // In My Lecture -----------------------------------------------------------------------------------------------------

  @action
  async findInMyLecture(serviceId: string, serviceType: string) {
    //
    const inMyLecture = await this.inMyLectureApi.findInMyLecture(
      InMyLectureRdoModel.newWithSingle(serviceId, serviceType)
    );

    runInAction(() => (this.inMyLecture = new InMyLectureModel(inMyLecture)));
    return inMyLecture;
  }

  @action
  async addInMyLectureInAllList(serviceId: string, serviceType: string) {
    //
    const inMyLecture = await this.inMyLectureApi.findInMyLecture(
      InMyLectureRdoModel.newWithSingle(serviceId, serviceType)
    );

    runInAction(() =>
      this._inMyLectureAll.push(new InMyLectureModel(inMyLecture))
    );
    return inMyLecture;
  }

  @action
  removeInMyLectureInAllList(serviceId: string, serviceType: string) {
    //
    const index = this._inMyLectureAll.findIndex(
      (inMyLecture) =>
        inMyLecture.serviceId === serviceId &&
        inMyLecture.serviceType === serviceType
    );
    if (index >= 0) {
      this._inMyLectureAll = this._inMyLectureAll
        .slice(0, index)
        .concat(this._inMyLectureAll.slice(index + 1));
    }
  }

  /////////////////////////////////////// 개편 ///////////////////////////////////////

  @observable
  _inMyLectureTableViews: InMyLectureTableViewModel[] = [];

  @observable
  _inMyLectureTableViewCount: number = 0;

  _inMyLectureFilterRdo: InMyLectureFilterRdoModel =
    new InMyLectureFilterRdoModel();

  // @observable
  // _inMyListCount: number = 0;

  @computed get inMyLectureTableViews() {
    return this._inMyLectureTableViews;
  }

  @computed get inMyLectureTableCount() {
    return this._inMyLectureTableViewCount;
  }

  // @computed get inMyListCount() {
  //   return this._inMyListCount;
  // }

  @action
  clearAllTableViews() {
    this._inMyLectureTableViews = [];
    this._inMyLectureTableViewCount = 0;
  }

  initFilterRdo() {
    this._inMyLectureFilterRdo = new InMyLectureFilterRdoModel();
  }

  setFilterRdoByConditions(conditions: FilterCondition) {
    this._inMyLectureFilterRdo.setByConditions(conditions);
    this._inMyLectureFilterRdo.setDefaultOffset();
  }

  @action
  async findAllTableViews() {
    const offsetTableViews = await this.inMyLectureApi.findAllTableViews(
      this._inMyLectureFilterRdo
    );

    if (
      offsetTableViews &&
      offsetTableViews.results &&
      offsetTableViews.results.length
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

      // let noteDatas: any = [];

      // if(cardIds.size > 0 && cubeIds.size > 0){
      //   const cubeNotes = await this.myTrainingApi.findCubeNoteList(Array.from(cardIds), Array.from(cubeIds)) || []
      //   if(cubeNotes && cubeNotes.length > 0) noteDatas = noteDatas.concat(cubeNotes);
      // }

      // if(cardIds.size > 0 && cubeIds.size === 0){
      //   const cardNotes = await this.myTrainingApi.findCardNoteList(Array.from(cardIds)) || [];
      //   if(cardNotes && cardNotes.length > 0) noteDatas = noteDatas.concat(cardNotes);
      // }

      // const updateNoteInMyLectureTableViews = offsetTableViews.results.map((result:any) => {
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
      //   return new InMyLectureTableViewModel(result)
      // });

      const updateNoteInMyLectureTableViews = await this.setTableViewsNoteInfo(
        offsetTableViews.results
      );

      runInAction(() => {
        this._inMyLectureTableViews = updateNoteInMyLectureTableViews;
        this._inMyLectureTableViewCount = offsetTableViews.totalCount;
      });
      return false;
    }
    return true;
  }

  @action
  async findAllTableViewsByConditions() {
    const offsetTableViews = await this.inMyLectureApi.findAllTableViews(
      this._inMyLectureFilterRdo
    );

    if (
      offsetTableViews &&
      offsetTableViews.results &&
      offsetTableViews.results.length
    ) {
      const updateNoteInMyLectureTableViews = await this.setTableViewsNoteInfo(
        offsetTableViews.results
      );

      runInAction(() => {
        this._inMyLectureTableViews = updateNoteInMyLectureTableViews;
        this._inMyLectureTableViewCount = offsetTableViews.totalCount;
      });
      return false;
    }
    return true;
  }

  @action
  async findAllTableViewsWithPage(offset: Offset) {
    this._inMyLectureFilterRdo.setOffset(offset);

    const offsetTableViews = await this.inMyLectureApi.findAllTableViews(
      this._inMyLectureFilterRdo
    );

    if (
      offsetTableViews &&
      offsetTableViews.results &&
      offsetTableViews.results.length
    ) {
      // const addedTableViews = offsetTableViews.results.map(
      //   (result: any) => new InMyLectureTableViewModel(result)
      // );

      const updateNoteInMyLectureAddTableViews =
        await this.setTableViewsNoteInfo(offsetTableViews.results);

      runInAction(() => {
        this._inMyLectureTableViews = [
          ...this._inMyLectureTableViews,
          ...updateNoteInMyLectureAddTableViews,
        ];
        this._inMyLectureTableViewCount = offsetTableViews.totalCount;
      });
    }
  }

  // @action
  // async findAllTabCount() {
  //   const tabCount = await this.inMyLectureApi.countInMyLectures();

  //   runInAction(() => (this._inMyListCount = tabCount));
  // }

  // @action
  // clearAllTabCount() {
  //   this._inMyListCount = 0;
  // }

  @action
  sortTableViews(column: string, direction: Direction) {
    // 전달되는 컬럼이 오브젝트의 프로퍼티와 상이해, 변환해야함.
    const propKey = converToKey(column);

    if (direction === Direction.ASC) {
      this._inMyLectureTableViews = this._inMyLectureTableViews.sort(
        (a, b) => a[propKey] - b[propKey]
      );
      return;
    }
    if (direction === Direction.DESC) {
      this._inMyLectureTableViews = this._inMyLectureTableViews.sort(
        (a, b) => b[propKey] - a[propKey]
      );
    }
  }

  // Home > Learning > 관심목록 노트 작성여부 표현하기 위해 추가
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
        return new InMyLectureTableViewModel(result);
      });

      return updateTableViews;
    } else {
      return tableViews;
    }
  }
  /////////////////////////////////////// 개편 ///////////////////////////////////////
}

InMyLectureService.instance = new InMyLectureService(
  InMyLectureApi.instance,
  MyTrainingApi.instance
);

export default InMyLectureService;

/* globals */
const converToKey = (column: string): any => {
  switch (column) {
    case '학습시간':
      return 'learningTime';
    case '최근학습일':
      return 'lastStudyDate';
    case '스탬프':
      return 'stampCount';
    case '등록일':
      return 'createDate';
    default:
      return '';
  }
};
