import { IObservableArray, action, computed, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import { CubeType, OffsetElementList } from 'shared/model';
import MyTrainingApi from '../apiclient/MyTrainingApi';
import MyTrainingModel from '../../model/MyTrainingModel';
import MyTrainingRdoModel from '../../model/MyTrainingRdoModel';


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
  async findAllLearningPassed(state: string, offset: number, limit: number, channelIds: string[] = []) {
    const rdoModel = MyTrainingRdoModel.newWithState(state, limit, offset, channelIds);
    await this.myTrainingApi.findAllLearningPassed(rdoModel)
      .then((response: any) => {
        if (response) {
          window.sessionStorage.setItem('learningPassed', JSON.stringify(response.data));
        }
        else {
          window.sessionStorage.setItem('learningPassed', '');
        }
      });
  }

  @action
  async fetchAndAddAllMyTrainingsWithState(state: string, limit: number, offset: number, channelIds: string[] = []) {
    //
    const rdo = MyTrainingRdoModel.newWithState(state, limit, offset, channelIds);
    const offsetList = await this.myTrainingApi.fetchAllMyTrainings(rdo);

    runInAction(() => this._myTrainings = this._myTrainings.concat(offsetList.results));
    return offsetList;
  }

  @action
  async findAllMyTrainingsWithState(state: string, limit: number, offset: number, channelIds: string[] = [], fromMain: boolean = false) {
    //
    const rdo = MyTrainingRdoModel.newWithState(state, limit, offset, channelIds);
    const offsetList = await this.myTrainingApi.findAllMyTrainings(rdo);

    if (fromMain) {
      window.sessionStorage.setItem('InProgressLearningList', JSON.stringify(offsetList));
    }

    runInAction(() => this._myTrainings = offsetList.results);
    return offsetList;
  }

  @action
  async setMyTrainingsWithState(lectures: OffsetElementList<MyTrainingModel>) {
    //
    const offsetList = lectures;

    runInAction(() => this._myTrainings = offsetList.results);
    return offsetList;
  }

  @action
  async findAndAddAllMyTrainingsWithState(state: string, limit: number, offset: number, channelIds: string[] = []) {
    //
    const rdo = MyTrainingRdoModel.newWithState(state, limit, offset, channelIds);
    const offsetList = await this.myTrainingApi.findAllMyTrainings(rdo);

    runInAction(() => this._myTrainings = this._myTrainings.concat(offsetList.results));
    return offsetList;
  }

  @action
  async findAllMyTrainingsWithRequired(limit: number, offset: number, channelIds: string[] = []) {
    //
    const rdo = MyTrainingRdoModel.newWithRequired(limit, offset, channelIds);
    const offsetList = await this.myTrainingApi.findAllMyTrainings(rdo);

    runInAction(() => this._myTrainings = offsetList.results);
    return offsetList;
  }

  @action
  async findAndAddAllMyTrainingsWithRequired(limit: number, offset: number, channelIds: string[] = []) {
    //
    const rdo = MyTrainingRdoModel.newWithRequired(limit, offset, channelIds);
    const offsetList = await this.myTrainingApi.findAllMyTrainings(rdo);

    runInAction(() => this._myTrainings = this._myTrainings.concat(offsetList.results));
    return offsetList;
  }

  @action
  async findAndAddAllMyCommunityTrainings(limit: number, offset: number) {
    //
    const rdo = MyTrainingRdoModel.newWithCubeType(CubeType.Community, limit, offset);
    const trainingOffsetElementList = await this.myTrainingApi.findAllMyTrainings(rdo);

    runInAction(() => this._myTrainings = this._myTrainings.concat(trainingOffsetElementList.results));
    return trainingOffsetElementList;
  }

  @action
  async findAndAddAllMyTrainingsWithStamp(limit: number, offset: number, channelIds: string[] = []) {
    //
    const rdo = MyTrainingRdoModel.new(limit, offset, channelIds);
    const trainingOffsetElementList = await this.myTrainingApi.findAllMyTrainingsWithStamp(rdo);

    runInAction(() => this._myTrainings = this._myTrainings.concat(trainingOffsetElementList.results));
    return trainingOffsetElementList;
  }

  @action
  async countMyTrainingsWithStamp(channelIds: string[] = []) {
    //
    const rdo = MyTrainingRdoModel.new(1, 0, channelIds);
    const trainingOffsetElementList = await this.myTrainingApi.findAllMyTrainingsWithStamp(rdo);

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
