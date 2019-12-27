import { decorate, observable } from 'mobx';
import { DramaEntityObservableModel } from 'shared';



class MyLearningSummary extends DramaEntityObservableModel {
  //
  year: number= 0;
  totalLearningTime: number= 0;
  suniLearningTime: number= 0;
  myCompanyLearningTime: number= 0;
  completeLectureCount: number= 0;
  acheiveStampCount: number= 0;


  constructor(summary?: MyLearningSummary) {
    //
    super();

    if (summary) {
      Object.assign(this, { ...summary });
    }
  }
}

decorate(MyLearningSummary, {
  year: observable,
  totalLearningTime: observable,
  suniLearningTime: observable,
  myCompanyLearningTime: observable,
  completeLectureCount: observable,
  acheiveStampCount: observable,
});

export default MyLearningSummary;
