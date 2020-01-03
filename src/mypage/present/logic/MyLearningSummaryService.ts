
import { observable, action, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import MyLearningSummaryApi from '../apiclient/MyLearningSummaryApi';
import MyLearningSummaryModel from '../../model/MyLearningSummaryModel';


@autobind
class MyLearningSummaryService {
  //
  static instance: MyLearningSummaryService;

  private myLearningSummaryApi: MyLearningSummaryApi;

  @observable
  myLearningSummary: MyLearningSummaryModel = {} as MyLearningSummaryModel;

  constructor(myLearningSummaryApi: MyLearningSummaryApi) {
    this.myLearningSummaryApi = myLearningSummaryApi;
  }

  // Summary ----------------------------------------------------------------------------------------------------------

  @action
  async findMyLearningSummary() {
    //
    const myLearningSummary = await this.myLearningSummaryApi.findMyLearningSummary();

    return runInAction(() => {
      this.myLearningSummary = new MyLearningSummaryModel(myLearningSummary);
      return myLearningSummary;
    });
  }

  @action
  async findMyLearningSummaryYear(year: number) {
    //
    const myLearningSummary = await this.myLearningSummaryApi.findMyLearningSummaryYear(year);

    return runInAction(() => {
      this.myLearningSummary = new MyLearningSummaryModel(myLearningSummary);
      return myLearningSummary;
    });
  }
}

MyLearningSummaryService.instance = new MyLearningSummaryService(MyLearningSummaryApi.instance);

export default MyLearningSummaryService;
