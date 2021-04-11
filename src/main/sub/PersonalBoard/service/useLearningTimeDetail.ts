import { findMyLearningSummaryYear } from '../api/personalBoardApi';
import { setLearningTimeDetailItem } from '../store/PersonalBoardStore';
import { MyLearningSummaryService } from '../../../../myTraining/stores';

export function requestLearningTimeDetail() {
  const myLearningSummary = MyLearningSummaryService.instance.myLearningSummary;

  if (myLearningSummary) {
    setLearningTimeDetailItem({
      suniLearningTime: myLearningSummary.suniLearningTime - myLearningSummary.myCompanyInSuniLearningTime,
      displayMyCompanyLearningTime: myLearningSummary.myCompanyLearningTime - myLearningSummary.myCompanyInSuniLearningTime,
      aplAllowTime: myLearningSummary.aplAllowTime,
      totalCollegeTime: myLearningSummary.totalCollegeTime,
    });

    return;
  }

  findMyLearningSummaryYear().then((result) => {
    setLearningTimeDetailItem({
      suniLearningTime: result.suniLearningTime - result.myCompanyInSuniLearningTime,         //mySuni
      displayMyCompanyLearningTime: result.myCompanyLearningTime + result.myCompanyInSuniLearningTime,   //관계사
      aplAllowTime: result.aplAllowTime,             //강의시간
      totalCollegeTime: result.totalCollegeTime,          //개인학습
    })
  })
}
