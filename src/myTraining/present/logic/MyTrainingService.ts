import {
  IObservableArray,
  action,
  computed,
  observable,
  runInAction,
} from 'mobx';
import { autobind } from '@nara.platform/accent';
import { CubeType, OffsetElementList } from 'shared/model';
import MyTrainingApi from '../apiclient/MyTrainingApi';
import MyTrainingModel from '../../model/MyTrainingModel';
import MyTrainingRdoModel from '../../model/MyTrainingRdoModel';
import MyTrainingSimpleModel from '../../model/MyTrainingSimpleModel';

@autobind
class MyTrainingService {
  //
  static instance: MyTrainingService;

  private myTrainingApi: MyTrainingApi;

  @observable
  _myTrainings: MyTrainingModel[] = [];

  @observable
  inprogressCount: number = 0;

  @observable
  enrolledCount: number = 0;

  @observable
  completedCount: number = 0;

  @observable
  retryCount: number = 0;

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
      const oldInProgressJson = sessionStorage.getItem('InProgressLearningList');
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
          this.findAllMyTrainingsWithState('InProgress', 8, 0,[], true);
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
    const rdo = MyTrainingRdoModel.newWithState(
      state,
      limit,
      offset,
      channelIds
    );
    const offsetList = await this.myTrainingApi.findAllMyTrainings(rdo);
    if (fromMain) {
      //window.sessionStorage.removeItem('InProgressLearningList');
      this.clear();
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
  async countMyTrainingsWithStamp(channelIds: string[] = []) {
    //
    const rdo = MyTrainingRdoModel.new(1, 0, channelIds);
    const trainingOffsetElementList = await this.myTrainingApi.findAllMyTrainingsWithStamp(
      rdo
    );

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
}

MyTrainingService.instance = new MyTrainingService(MyTrainingApi.instance);

export default MyTrainingService;

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
