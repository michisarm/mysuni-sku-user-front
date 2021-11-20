import { CollegeService } from 'college/stores';
import { observable, action, runInAction, computed } from 'mobx';
import { autobind, CachingFetch } from '@nara.platform/accent';
import moment from 'moment';

import MyLearningSummaryApi from '../apiclient/MyLearningSummaryApi';
import MyLearningSummaryModel from '../../model/MyLearningSummaryModel';
import { findMyInstructTimeSummary } from '../../../lecture/detail/api/cubeApi';
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

  // @observable
  // _lectureTimeSummary?: LectureTimeSummary;

  @observable
  _instructTimeSummary?: InstructorLearningTimeSummary;

  // @computed get lectureTimeSummary() {
  //   return this._lectureTimeSummary;
  // }

  @computed get instructTimeSummary() {
    return this._instructTimeSummary;
  }

  @observable
  displayTotalLearningTime: number = 0;

  @observable
  displayMySuniLearningTime: number = 0;

  @observable
  displayMyCompanyLearningTime: number = 0;

  // @action async findLectureTimeSummary() {
  //   const foundLectureTimeSummary = await findMyLectureTimeSummary();

  //   runInAction(() => {
  //     this._lectureTimeSummary = foundLectureTimeSummary;
  //   });
  // }

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

  // @action
  // async findMyLearningSummary() {
  //   //
  //   const fetched = this.myLearningSummaryCachingFetch.fetch(
  //     () => this.myLearningSummaryApi.findMyLearningSummary(),
  //     (myLearningSummary) =>
  //       runInAction(
  //         () =>
  //           (this.myLearningSummary = new MyLearningSummaryModel(
  //             myLearningSummary
  //           ))
  //       )
  //   );

  //   return fetched
  //     ? this.myLearningSummaryCachingFetch.inProgressFetching
  //     : this.myLearningSummary;
  // }

  // @action
  // async findMyLearningSummaryYear(year: number) {
  //   //
  //   const myLearningSummary =
  //     await this.myLearningSummaryApi.findMyLearningSummaryYear(year);

  //   return runInAction(() => {
  //     this.myLearningSummary = new MyLearningSummaryModel(myLearningSummary);
  //     return myLearningSummary;
  //   });
  // }

  @action
  async findMyLearningSummaryByYear(year: number = moment().year().valueOf()) {
    const learningSummary =
      await this.myLearningSummaryApi.findMyLearningSummaryByYear(year);
    runInAction(() => {
      this.myLearningSummary = new MyLearningSummaryModel(learningSummary);
    });
  }

  @action
  getAllCollegeList() {
    //
    return CollegeService.instance.detailAllColleges;
  }

  @action
  getDisplayMySuniLeaningTime() {
    //
    let totalLearningTime = 0;
    const allCollegeList = this.getAllCollegeList();
    const mySuniIds =
      allCollegeList &&
      allCollegeList.length > 0 &&
      allCollegeList
        .filter((college) => {
          return college.cineroomId.endsWith('c2');
        })
        .map((college) => college.id);

    mySuniIds &&
      this.myLearningSummary.collegeLearningTimes &&
      this.myLearningSummary.collegeLearningTimes.length &&
      this.myLearningSummary.collegeLearningTimes.filter((college) => {
        if (mySuniIds.includes(college.collegeId)) {
          totalLearningTime += college.learningTime;
        }
      });

    runInAction(() => (this.displayMySuniLearningTime = totalLearningTime));
  }

  @action
  getDisplayCompanyLearningTime() {
    //

    const allCollegeList = this.getAllCollegeList();
    const mySuniIds =
      allCollegeList &&
      allCollegeList.length > 0 &&
      allCollegeList
        .filter((college) => {
          return college.cineroomId.endsWith('c2');
        })
        .map((college) => college.id);

    let totalLearningTime = 0;
    mySuniIds &&
      this.myLearningSummary.collegeLearningTimes &&
      this.myLearningSummary.collegeLearningTimes.length &&
      this.myLearningSummary.collegeLearningTimes.filter((college) => {
        if (!mySuniIds.includes(college.collegeId)) {
          totalLearningTime += college.learningTime;
        }
      });

    totalLearningTime += this.myLearningSummary.myCompanyLearningTime;

    runInAction(() => (this.displayMyCompanyLearningTime = totalLearningTime));
  }

  @action
  getDisplayTotalLearningTime() {
    //
    let totalLearningTime = 0;
    if (this.myLearningSummary) {
      // college별
      this.myLearningSummary.collegeLearningTimes &&
        this.myLearningSummary.collegeLearningTimes.length > 0 &&
        this.myLearningSummary.collegeLearningTimes.forEach((college) => {
          totalLearningTime += college.learningTime;
        });

      //개인학습
      this.myLearningSummary.aplTime &&
        (totalLearningTime += this.myLearningSummary.aplTime);
      // 외부 관계사
      this.myLearningSummary.myCompanyLearningTime &&
        (totalLearningTime += this.myLearningSummary.myCompanyLearningTime);
    }

    // 강의 시간
    totalLearningTime +=
      (this.instructTimeSummary &&
        this.instructTimeSummary.sumOfCurrentYearInstructorLearningTime) ||
      0;

    runInAction(() => (this.displayTotalLearningTime = totalLearningTime));
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
