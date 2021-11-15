import { findMyLearningSummaryYear } from '../api/personalBoardApi';
import { setLearningTimeDetailItem } from '../store/PersonalBoardStore';

export function requestLearningTimeDetail() {
  findMyLearningSummaryYear().then((result) => {
    setLearningTimeDetailItem({
      suniLearningTime: result.displayMySuniLearningTimeSummary, //mySuni
      displayMyCompanyLearningTime: result.displayMyCompanyLearningTimeSummary, //관계사
      aplAllowTime: result.accumulatedLearningTime, //개인학습
      totalCollegeTime: result.displayTotalLearningTimeSummary, //강의시간
    });
  });
}
