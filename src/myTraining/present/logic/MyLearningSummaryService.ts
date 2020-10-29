
import { observable, action, runInAction, computed } from 'mobx';
import { autobind, CachingFetch } from '@nara.platform/accent';

import MyLearningSummaryApi from '../apiclient/MyLearningSummaryApi';
import MyLearningSummaryModel from '../../model/MyLearningSummaryModel';


@autobind
class MyLearningSummaryService {
  //
  static instance: MyLearningSummaryService;

  private myLearningSummaryApi: MyLearningSummaryApi;

  @observable
  myLearningSummary: MyLearningSummaryModel = {} as MyLearningSummaryModel;

  @observable
  private _totalMyLearningSummary: MyLearningSummaryModel = new MyLearningSummaryModel();

  myLearningSummaryCachingFetch: CachingFetch = new CachingFetch();

  @computed get totalMyLearningSummary() {
    return this._totalMyLearningSummary;
  }

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
  async findMyLearningSummaryV2() {
    this.myLearningSummaryCachingFetch.fetch(
      () => this.myLearningSummaryApi.findMyLearningSummaryV2(),
      (myLearningSummary) => runInAction(() => this._totalMyLearningSummary = new MyLearningSummaryModel(myLearningSummary))
    );
    /* 
        const learningSummary = await this.myLearningSummaryApi.findMyLearningSummaryV2();
        runInAction(() => this.myLearningSummary = new MyLearningSummaryModel(learningSummary)); 
    */
  }

  @action
  async findMyLearningSummaryYear(year: number) {
    const learningSummary = await this.myLearningSummaryApi.findMyLearningSummaryYear(year);
    runInAction(() => this.myLearningSummary = new MyLearningSummaryModel(learningSummary));
  }
}

MyLearningSummaryService.instance = new MyLearningSummaryService(MyLearningSummaryApi.instance);

export default MyLearningSummaryService;
