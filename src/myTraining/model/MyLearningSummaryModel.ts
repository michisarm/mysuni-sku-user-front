import { decorate, observable, computed } from 'mobx';
import { getCollegeTime } from 'personalcube/personalcube/model/LectureTimeSummary';
import { DramaEntityObservableModel } from 'shared/model';
import CollegeLearningTimeModel from './CollegeLearningTimeModel';
import ReplayCollegeLearningTimeModel from './ReplayCollegeLearningTimeModel';

class MyLearningSummaryModel {
  //
  // college별 학습시간
  collegeLearningTimes: CollegeLearningTimeModel[] = [];
  // college별 재학습시간
  replayLearningTimes: ReplayCollegeLearningTimeModel[] = [];
  // 외부 관계사 학습시간
  myCompanyLearningTime: number = 0;
  // apl : 개인학습
  aplTime: number = 0;

  // year: number = 0;
  // totalLearningTime: number = 0;
  // suniLearningTime: number = 0;
  // myCompanyLearningTime: number = 0;
  // completeLectureCount: number = 0;
  // acheiveStampCount: number = 0;
  // achieveBadgeCount: number = 0;

  // aiCollegeTime: number = 0;
  // dtCollegeTime: number = 0;
  // happyCollegeTime: number = 0;
  // svCollegeTime: number = 0;
  // designCollegeTime: number = 0;
  // globalCollegeTime: number = 0;
  // leadershipCollegeTime: number = 0;
  // managementCollegeTime: number = 0;
  // energySolutionCollegeTime: number = 0;

  // bmDesignerCollegeTime: number = 0;
  // semiconductorCollegeTime: number = 0;
  // skManagementCollegeTime: number = 0;
  // skAcademyCollegeTime: number = 0;
  // lifeStyleCollegeTime: number = 0;
  // myCompanyInSuniLearningTime: number = 0;

  // /* 개인 학습(인정)시간 */
  // aplAllowTime: number = 0;

  // /* 누적시간 */
  // totalSuniLearningTime: number = 0;
  // totalMyCompanyLearningTime: number = 0;
  // totalAplAllowTime: number = 0;
  // totalCompleteLectureCount: number = 0;
  // totalCollegeTime: number = 0;

  // /* mySUNI 학습시간 */
  // @computed get displayMySUNILearningTime(): number {
  //   return this.suniLearningTime - this.myCompanyInSuniLearningTime;
  // }

  // /* 관계사 학습시간 */
  // @computed get displayMyCompanyLearningTime(): number {
  //   return this.myCompanyLearningTime + this.myCompanyInSuniLearningTime;
  // }

  constructor(summary?: MyLearningSummaryModel) {
    if (summary) {
      Object.assign(this, { ...summary });

      this.collegeLearningTimes =
        (summary.collegeLearningTimes &&
          summary.collegeLearningTimes.length > 0 && [
            ...summary.collegeLearningTimes,
          ]) ||
        [];

      this.replayLearningTimes =
        (summary.replayLearningTimes &&
          summary.replayLearningTimes.length > 0 && [
            ...summary.replayLearningTimes,
          ]) ||
        [];
    }
  }
}

decorate(MyLearningSummaryModel, {
  collegeLearningTimes: observable,
  replayLearningTimes: observable,
  myCompanyLearningTime: observable,
  aplTime: observable,
  // year: observable,
  // totalLearningTime: observable,
  // suniLearningTime: observable,
  // myCompanyLearningTime: observable,
  // completeLectureCount: observable,
  // acheiveStampCount: observable,
  // achieveBadgeCount: observable,
  // aiCollegeTime: observable,
  // dtCollegeTime: observable,
  // happyCollegeTime: observable,
  // svCollegeTime: observable,
  // designCollegeTime: observable,
  // globalCollegeTime: observable,
  // leadershipCollegeTime: observable,
  // managementCollegeTime: observable,
  // energySolutionCollegeTime: observable,
  // bmDesignerCollegeTime: observable,
  // semiconductorCollegeTime: observable,
  // skManagementCollegeTime: observable,
  // skAcademyCollegeTime: observable,
  // lifeStyleCollegeTime: observable,
  // myCompanyInSuniLearningTime: observable,
  // aplAllowTime: observable,
  // totalSuniLearningTime: observable,
  // totalMyCompanyLearningTime: observable,
  // totalAplAllowTime: observable,
  // totalCompleteLectureCount: observable,
  // totalCollegeTime: observable,
});

export default MyLearningSummaryModel;
