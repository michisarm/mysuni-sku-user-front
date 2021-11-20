import { MyLearningSummaryService } from 'myTraining/stores';
import { setLearningTimeDetailItem } from '../store/PersonalBoardStore';

export async function requestLearningTimeDetail() {
  //
  const myLearningSummaryService = MyLearningSummaryService.instance!;

  const {
    displayMySuniLearningTime,
    displayMyCompanyLearningTime,
    displayTotalLearningTime,
    myLearningSummary,
  } = myLearningSummaryService;

  setLearningTimeDetailItem({
    suniLearningTime: displayMySuniLearningTime,
    displayMyCompanyLearningTime: displayMyCompanyLearningTime,
    totalCollegeTime: displayTotalLearningTime,
    aplAllowTime: (myLearningSummary && myLearningSummary.aplTime) || 0, //개인학습//강의시간
  });
}
