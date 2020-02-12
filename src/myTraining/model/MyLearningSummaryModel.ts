import { decorate, observable } from 'mobx';
import { DramaEntityObservableModel } from 'shared/model';


class MyLearningSummaryModel extends DramaEntityObservableModel {
  //
  year: number= 0;
  totalLearningTime: number= 0;
  suniLearningTime: number= 0;
  myCompanyLearningTime: number= 0;
  completeLectureCount: number= 0;
  acheiveStampCount: number= 0;

  aiCollegeTime: number= 0;
  dtCollegeTime: number= 0;
  happyCollegeTime: number= 0;
  svCollegeTime: number= 0;
  designCollegeTime: number= 0;
  globalCollegeTime: number= 0;
  leadershipCollegeTime: number= 0;
  managementCollegeTime: number= 0;

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
  aiCollegeTime: observable,
  dtCollegeTime: observable,
  happyCollegeTime: observable,
  svCollegeTime: observable,
  designCollegeTime: observable,
  globalCollegeTime: observable,
  leadershipCollegeTime: observable,
  managementCollegeTime: observable,
});

export default MyLearningSummaryModel;
