import { decorate, observable } from 'mobx';
import { DramaEntityObservableModel } from 'shared';



class MyLearningSummaryModel extends DramaEntityObservableModel {
  //
  year: number= 0;
  totalLearningTime: number= 0;
  suniLearningTime: number= 0;
  myCompanyLearningTime: number= 0;
  completeLectureCount: number= 0;
  acheiveStampCount: number= 0;


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
});

export default MyLearningSummaryModel;
