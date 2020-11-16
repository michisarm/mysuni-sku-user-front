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

  aplAllowTime: number = 0; /* 개인 학습시간 */
  lectureTimeSummary: LectureTimeSummary = new LectureTimeSummary(); /* 강의시간 */

  @computed get totalSuniLearningTime() {
    return this.suniLearningTime - this.myCompanyInSuniLearningTime;
  }

  @computed get totalMyCompanyLearningTime() {
    return this.myCompanyLearningTime + this.myCompanyInSuniLearningTime;
  }

  @computed get totalSuniMyCompanyLectureTime() {
    return this.suniLearningTime + this.myCompanyLearningTime + this.aplAllowTime + this.lectureTimeSummary.totalCollegeTime
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
