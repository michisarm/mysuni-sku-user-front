
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
  async findMyLearningSummaryYear(year: number) {
    //
    const myLearningSummary = await this.myLearningSummaryApi.findMyLearningSummaryYear(year);

    return runInAction(() => {
      this.myLearningSummary = new MyLearningSummaryModel(myLearningSummary);
      return myLearningSummary;
    });
  }

  ////////////////////////////////////////////// 개편 //////////////////////////////////////////////
  @action
  async findTotalMyLearningSummary() {
    this.myLearningSummaryCachingFetch.fetch(
      () => this.myLearningSummaryApi.findTotalMyLearningSummary(),
      (totalMyLearningSummary) => runInAction(() => this._totalMyLearningSummary = new MyLearningSummaryModel(totalMyLearningSummary))
    );
  }

  @action
  async findMyLearningSummaryByYear(year: number) {
    const learningSummary = await this.myLearningSummaryApi.findMyLearningSummaryByYear(year);
    runInAction(() => this.myLearningSummary = new MyLearningSummaryModel(learningSummary));
  }
  ////////////////////////////////////////////// 개편 //////////////////////////////////////////////
}

MyLearningSummaryService.instance = new MyLearningSummaryService(MyLearningSummaryApi.instance);

export default MyLearningSummaryService;
