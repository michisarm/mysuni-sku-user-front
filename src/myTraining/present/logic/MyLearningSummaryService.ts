import { observable, action, runInAction, computed } from 'mobx';
import { autobind, CachingFetch } from '@nara.platform/accent';

import MyLearningSummaryApi from '../apiclient/MyLearningSummaryApi';
import MyLearningSummaryModel from '../../model/MyLearningSummaryModel';
import { LectureTimeSummary } from '../../../personalcube/personalcube/model/LectureTimeSummary';
import {
  findMyLectureTimeSummary,
  findMyInstructTimeSummary,
} from '../../../lecture/detail/api/cubeApi';
import { InstructorLearningTimeSummary } from 'personalcube/personalcube/model/InstructorLearningTimeSummary';

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

  @observable
  _instructTimeSummary?: InstructorLearningTimeSummary;

  @computed get lectureTimeSummary() {
    return this._lectureTimeSummary;
  }

  @computed get instructTimeSummary() {
    return this._instructTimeSummary;
  }

  @action async findLectureTimeSummary() {
    const foundLectureTimeSummary = await findMyLectureTimeSummary();

    runInAction(() => {
      this._lectureTimeSummary = foundLectureTimeSummary;
    });
  }

  @action async findInstructTimeSummary() {
    const foundLectureTimeSummary = await findMyInstructTimeSummary();

    runInAction(() => {
      this._instructTimeSummary = foundLectureTimeSummary;
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
      (myLearningSummary) =>
        runInAction(
          () =>
            (this.myLearningSummary = new MyLearningSummaryModel(
              myLearningSummary
            ))
        )
    );

    return fetched
      ? this.myLearningSummaryCachingFetch.inProgressFetching
      : this.myLearningSummary;
  }

  @action
  async findMyLearningSummaryYear(year: number) {
    //
    const myLearningSummary =
      await this.myLearningSummaryApi.findMyLearningSummaryYear(year);

    return runInAction(() => {
      this.myLearningSummary = new MyLearningSummaryModel(myLearningSummary);
      return myLearningSummary;
    });
  }

  @action
  async findMyLearningSummaryByYear(year: number) {
    const learningSummary =
      await this.myLearningSummaryApi.findMyLearningSummaryByYear(year);
    runInAction(
      () =>
        (this.myLearningSummary = new MyLearningSummaryModel(learningSummary))
    );
  }
  ////////////////////////////////////////////// 개편 //////////////////////////////////////////////

  @action
  async findTotalMyLearningSummaryDash() {
    const test = await this.myLearningSummaryApi.findTotalMyLearningSummary();
    return runInAction(() => {
      this.totalMyLearningSummaryDash = new MyLearningSummaryModel(test);
    });
  }
}

MyLearningSummaryService.instance = new MyLearningSummaryService(
  MyLearningSummaryApi.instance
);

export default MyLearningSummaryService;
