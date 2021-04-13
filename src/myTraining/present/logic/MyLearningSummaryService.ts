
import { observable, action, runInAction, computed } from 'mobx';
import { autobind, CachingFetch } from '@nara.platform/accent';

import MyLearningSummaryApi from '../apiclient/MyLearningSummaryApi';
import MyLearningSummaryModel from '../../model/MyLearningSummaryModel';
import { LectureTimeSummary } from '../../../personalcube/personalcube/model/LectureTimeSummary';
import { findMyLectureTimeSummary } from '../../../lecture/detail/api/cubeApi';


@autobind
class MyLearningSummaryService {
  //
  static instance: MyLearningSummaryService;

  private myLearningSummaryApi: MyLearningSummaryApi;

  @observable
  myLearningSummary: MyLearningSummaryModel = {} as MyLearningSummaryModel;

  @observable
  totalMyLearningSummaryDash: MyLearningSummaryModel = {} as MyLearningSummaryModel;

  @observable
  _lectureTimeSummary?: LectureTimeSummary;

  @computed get lectureTimeSummary() {
    return this._lectureTimeSummary;
  }

  @action async findLectureTimeSummary() {
    const foundLectureTimeSummary = await findMyLectureTimeSummary();

    runInAction(() => {
      this._lectureTimeSummary = foundLectureTimeSummary;
    });
  }

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

  @action
  async findMyLearningSummaryByYear(year: number) {
    const learningSummary = await this.myLearningSummaryApi.findMyLearningSummaryByYear(year);
    runInAction(() => this.myLearningSummary = new MyLearningSummaryModel(learningSummary));
  }
  ////////////////////////////////////////////// 개편 //////////////////////////////////////////////

  @action
  async findTotalMyLearningSummaryDash() {
    const test = await this.myLearningSummaryApi.findTotalMyLearningSummary()
    return runInAction(() => {
      this.totalMyLearningSummaryDash = new MyLearningSummaryModel(test)
    })
  }
}

MyLearningSummaryService.instance = new MyLearningSummaryService(MyLearningSummaryApi.instance);

export default MyLearningSummaryService;
