import { action, computed, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import { CubeType, OffsetElementList } from 'shared';
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

  constructor(myTrainingApi: MyTrainingApi) {
    this.myTrainingApi = myTrainingApi;
  }

  @computed
  get myTrainings() {
    //
    const myTrainings = this._myTrainings as any;
    return myTrainings.peek();
  }

  // My Trainings ----------------------------------------------------------------------------------------------------------

  @action
  async findAllMyTrainingsWithState(state: string, limit: number, offset: number) {
    //
    const response = await this.myTrainingApi.findAllMyTrainings(MyTrainingRdoModel.newWithState(state, limit, offset));
    const trainingOffsetElementList = new OffsetElementList<MyTrainingModel>(response);

    trainingOffsetElementList.results = trainingOffsetElementList.results.map((training) => new MyTrainingModel(training));

    return runInAction(() => {
      this._myTrainings = this._myTrainings.concat(trainingOffsetElementList.results);
      return trainingOffsetElementList;
    });
  }

  @action
  async findAllMyTrainingsWithRequired(limit: number, offset: number) {
    //
    const response = await this.myTrainingApi.findAllMyTrainings(MyTrainingRdoModel.newWithRequired(limit, offset));
    const trainingOffsetElementList = new OffsetElementList<MyTrainingModel>(response);

    trainingOffsetElementList.results = trainingOffsetElementList.results.map((training) => new MyTrainingModel(training));

    return runInAction(() => {
      this._myTrainings = this._myTrainings.concat(trainingOffsetElementList.results);
      return trainingOffsetElementList;
    });
  }

  @action
  async findAllMyCommunityTrainings(limit: number, offset: number) {
    //
    const response = await this.myTrainingApi.findAllMyTrainings(MyTrainingRdoModel.newWithCubeType(CubeType.Community, limit, offset));
    const trainingOffsetElementList = new OffsetElementList<MyTrainingModel>(response);

    trainingOffsetElementList.results = trainingOffsetElementList.results.map((training) => new MyTrainingModel(training));

    return runInAction(() => {
      this._myTrainings = this._myTrainings.concat(trainingOffsetElementList.results);
      return trainingOffsetElementList;
    });
  }

  @action
  async findAllMyTrainingsWithStamp(limit: number, offset: number) {
    //
    const response = await this.myTrainingApi.findAllMyTrainingsWithStamp(MyTrainingRdoModel.new(limit, offset));
    const trainingOffsetElementList = new OffsetElementList<MyTrainingModel>(response);

    trainingOffsetElementList.results = trainingOffsetElementList.results.map((training) => new MyTrainingModel(training));

    return runInAction(() => {
      this._myTrainings = this._myTrainings.concat(trainingOffsetElementList.results);
      return trainingOffsetElementList;
    });
  }

  @action
  clear() {
    this._myTrainings = [];
  }
}

MyTrainingService.instance = new MyTrainingService(MyTrainingApi.instance);

export default MyTrainingService;
