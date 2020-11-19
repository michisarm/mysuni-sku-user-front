import { decorate, observable, computed } from 'mobx';
import LectureTimeSummary from 'personalcube/personalcube/model/LectureTimeSummary';
import { DramaEntityObservableModel } from 'shared/model';

class MyLearningSummaryModel extends DramaEntityObservableModel {
  //
  year: number = 0;
  totalLearningTime: number = 0;
  suniLearningTime: number = 0;
  myCompanyLearningTime: number = 0;
  completeLectureCount: number = 0;
  acheiveStampCount: number = 0;
  achieveBadgeCount: number = 0;

  /* college 별 학습시간 */
  aiCollegeTime: number = 0;
  dtCollegeTime: number = 0;
  happyCollegeTime: number = 0;
  svCollegeTime: number = 0;
  designCollegeTime: number = 0;
  globalCollegeTime: number = 0;
  leadershipCollegeTime: number = 0;
  managementCollegeTime: number = 0;
  energySolutionCollegeTime: number = 0;

  semiconductorCollegeTime: number = 0;
  skManagementCollegeTime: number = 0;
  skAcademyCollegeTime: number = 0;
  lifeStyleCollegeTime: number = 0;
  myCompanyInSuniLearningTime: number = 0;

  /* 개인 학습(인정)시간 */
  aplAllowTime: number = 0;
  /* 강의시간 */
  lectureTimeSummary: LectureTimeSummary = new LectureTimeSummary();

  /* mySUNI 학습시간 */
  @computed get displayMySUNILearningTime(): number {
    return this.suniLearningTime - this.myCompanyInSuniLearningTime;
  }

  /* 관계사 학습시간 */
  @computed get displayMyCompanyLearningTime(): number {
    return this.myCompanyLearningTime + this.myCompanyInSuniLearningTime;
  }

  /* 총 학습시간 */
  @computed get displayTotalLearningTime(): number {
    /*
      1. mySUNI 학습시간
      2. 관계사 학습시간
      3. 개인 학습시간
      4. 강의시간
    */
    if (this.lectureTimeSummary) {
      /* lectureTimeSummary 는 object 이므로 null 처리를 꼭 해주도록 한다. */
      return this.suniLearningTime + this.myCompanyLearningTime + this.aplAllowTime + this.lectureTimeSummary.totalCollegeTime;
    }

    return this.suniLearningTime + this.myCompanyLearningTime + this.aplAllowTime;
  }

  constructor(summary?: MyLearningSummaryModel) {
    super();
    if (summary) {
      Object.assign(this, { ...summary });
    }
  }
}

decorate(MyLearningSummaryModel, {
  year: observable,
  totalLearningTime: observable,
  suniLearningTime: observable,
  myCompanyLearningTime: observable,
  completeLectureCount: observable,
  acheiveStampCount: observable,
  achieveBadgeCount: observable,
  aiCollegeTime: observable,
  dtCollegeTime: observable,
  happyCollegeTime: observable,
  svCollegeTime: observable,
  designCollegeTime: observable,
  globalCollegeTime: observable,
  leadershipCollegeTime: observable,
  managementCollegeTime: observable,
  energySolutionCollegeTime: observable,
  semiconductorCollegeTime: observable,
  skManagementCollegeTime: observable,
  skAcademyCollegeTime: observable,
  lifeStyleCollegeTime: observable,
  myCompanyInSuniLearningTime: observable,
  aplAllowTime: observable,
  lectureTimeSummary: observable
});

export default MyLearningSummaryModel;
