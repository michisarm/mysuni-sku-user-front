import { decorate, observable } from 'mobx';
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
});

export default MyLearningSummaryModel;
