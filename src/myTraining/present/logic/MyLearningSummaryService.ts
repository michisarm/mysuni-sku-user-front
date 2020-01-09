
import { observable, action, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';

import { CachingFetch } from 'shared';
import MyLearningSummaryApi from '../apiclient/MyLearningSummaryApi';
import MyLearningSummaryModel from '../../model/MyLearningSummaryModel';


@autobind
class MyLearningSummaryService {
  //
  static instance: MyLearningSummaryService;

  private myLearningSummaryApi: MyLearningSummaryApi;

  @observable
  myLearningSummary: MyLearningSummaryModel = {} as MyLearningSummaryModel;

  myLearningSummaryCachingFetch: CachingFetch = new CachingFetch();


  constructor(myLearningSummaryApi: MyLearningSummaryApi) {
    this.myLearningSummaryApi = myLearningSummaryApi;
  }

  // Summary ----------------------------------------------------------------------------------------------------------

  @action
  async findMyLearningSummary() {
    //
    const fetched = this.myLearningSummaryCachingFetch.fetch(
      () => this.myLearningSummaryApi.findMyLearningSummary(),
      (myLearningSummary) => runInAction(() => this.myLearningSummary = new MyLearningSummaryModel(myLearningSummary)),
    );

    return fetched ? this.myLearningSummaryCachingFetch.inProgressFetching : this.myLearningSummary;
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
