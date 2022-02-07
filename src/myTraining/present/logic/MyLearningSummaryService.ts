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

  @observable
  displayReplayLearningTime: number = 0;

  // @action async findLectureTimeSummary() {
  //   const foundLectureTimeSummary = await findMyLectureTimeSummary();

  //   runInAction(() => {
  //     this._lectureTimeSummary = foundLectureTimeSummary;
  //   });
  // }

  @action async findInstructTimeSummary(year: number = moment().year()) {
    const foundLectureTimeSummary = await findMyInstructTimeSummary(year);

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
  async findMyLearningSummaryByYear(
    year?: number
  ): Promise<MyLearningSummaryModel> {
    //
    const learningSummary = await this.myLearningSummaryApi.findMyLearningSummaryByYear(
      year || moment().year()
    );
    runInAction(() => {
      this.myLearningSummary = new MyLearningSummaryModel(learningSummary);
    });

    return learningSummary;
  }

  @action
  async findMyLearningSummaryModalByYear(
    year?: number
  ): Promise<MyLearningSummaryModel> {
    //
    const learningSummary = await this.myLearningSummaryApi.findMyLearningSummaryByYear(
      year || moment().year()
    );

    return learningSummary;
  }

  @action
  getAllCollegeList() {
    //
    return CollegeService.instance.detailAllColleges;
  }

  @action
  getDisplayMySuniLeaningTime(myLearningSummaryModel?: MyLearningSummaryModel) {
    //
    const myLearningSummary = myLearningSummaryModel
      ? myLearningSummaryModel
      : this.myLearningSummary;
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
      myLearningSummary.collegeLearningTimes &&
      myLearningSummary.collegeLearningTimes.length &&
      myLearningSummary.collegeLearningTimes.filter((college) => {
        if (mySuniIds.includes(college.collegeId)) {
          totalLearningTime += college.learningTime;
        }
      });

    runInAction(
      () =>
        !myLearningSummary &&
        (this.displayMySuniLearningTime = totalLearningTime)
    );

    return totalLearningTime;
  }

  @action
  getDisplayCompanyLearningTime(
    myLearningSummaryModel?: MyLearningSummaryModel
  ) {
    //
    const myLearningSummary = myLearningSummaryModel
      ? myLearningSummaryModel
      : this.myLearningSummary;
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
      myLearningSummary.collegeLearningTimes &&
      myLearningSummary.collegeLearningTimes.length &&
      myLearningSummary.collegeLearningTimes.filter((college) => {
        if (!mySuniIds.includes(college.collegeId)) {
          totalLearningTime += college.learningTime;
        }
      });

    totalLearningTime += myLearningSummary.myCompanyLearningTime;

    runInAction(
      () =>
        !myLearningSummaryModel &&
        (this.displayMyCompanyLearningTime = totalLearningTime)
    );

    return totalLearningTime;
  }

  @action
  getDisplayReplayLeaningTime(myLearningSummaryModel?: MyLearningSummaryModel) {
    //
    const myLearningSummary = myLearningSummaryModel
      ? myLearningSummaryModel
      : this.myLearningSummary;
    let totalLearningTime = 0;

    myLearningSummary.replayLearningTimes &&
      myLearningSummary.replayLearningTimes.length &&
      myLearningSummary.replayLearningTimes.map((college) => {
        totalLearningTime += college.replayLearningTime;
      });

    runInAction(
      () =>
        !myLearningSummary &&
        (this.displayReplayLearningTime = totalLearningTime)
    );

    return totalLearningTime;
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

    // 복습 시간
    this.myLearningSummary.replayLearningTimes &&
      this.myLearningSummary.replayLearningTimes.length > 0 &&
      this.myLearningSummary.replayLearningTimes.forEach((college) => {
        totalLearningTime += college.replayLearningTime;
      });

    return runInAction(
      () => (this.displayTotalLearningTime = totalLearningTime)
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
