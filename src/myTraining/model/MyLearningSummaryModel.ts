import { decorate, observable, computed } from 'mobx';
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

  aiCollegeTime: number = 0;
  dtCollegeTime: number = 0;
  happyCollegeTime: number = 0;
  svCollegeTime: number = 0;
  designCollegeTime: number = 0;
  globalCollegeTime: number = 0;
  leadershipCollegeTime: number = 0;
  managementCollegeTime: number = 0;
  energySolutionCollegeTime: number = 0;

  bmDesignerCollegeTime: number = 0;
  semiconductorCollegeTime: number = 0;
  skManagementCollegeTime: number = 0;
  skAcademyCollegeTime: number = 0;
  lifeStyleCollegeTime: number = 0;
  myCompanyInSuniLearningTime: number = 0;

  /* 개인 학습(인정)시간 */
  aplAllowTime: number = 0;

  /* 누적시간 */
  totalSuniLearningTime: number = 0;
  totalMyCompanyLearningTime: number = 0;
  totalAplAllowTime: number = 0;
  totalCompleteLectureCount: number = 0;

  /* mySUNI 학습시간 */
  @computed get displayMySUNILearningTime(): number {
    return this.suniLearningTime - this.myCompanyInSuniLearningTime;
  }

  /* 관계사 학습시간 */
  @computed get displayMyCompanyLearningTime(): number {
    return this.myCompanyLearningTime + this.myCompanyInSuniLearningTime;
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
  bmDesignerCollegeTime: observable,
  semiconductorCollegeTime: observable,
  skManagementCollegeTime: observable,
  skAcademyCollegeTime: observable,
  lifeStyleCollegeTime: observable,
  myCompanyInSuniLearningTime: observable,
  aplAllowTime: observable,
  totalSuniLearningTime: observable,
  totalMyCompanyLearningTime: observable,
  totalAplAllowTime: observable,
  totalCompleteLectureCount: observable,
});

export default MyLearningSummaryModel;
