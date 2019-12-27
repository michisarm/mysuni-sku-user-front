
import { observable, action, computed, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
import { OffsetElementList } from 'shared';
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
  async findAllMyTrainings(limit: number, offset: number) {
    //
    const response = await this.myTrainingApi.findAllMyTrainings(MyTrainingRdoModel.new(limit, offset));
    const trainingOffsetElementList = new OffsetElementList<MyTrainingModel>(response);

    trainingOffsetElementList.results = trainingOffsetElementList.results.map((training) => new MyTrainingModel(training));

    return runInAction(() => {
      this._myTrainings = this._myTrainings.concat(trainingOffsetElementList.results);
      return trainingOffsetElementList;
    });
  }
}

MyTrainingService.instance = new MyTrainingService(MyTrainingApi.instance);

export default MyTrainingService;
