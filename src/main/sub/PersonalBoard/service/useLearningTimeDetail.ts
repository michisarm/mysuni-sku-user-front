import { findMyLearningSummaryYear } from '../api/personalBoardApi';
import { setLearningTimeDetailItem } from '../store/PersonalBoardStore';

export function requestLearningTimeDetail() {
  findMyLearningSummaryYear().then((result) => {
    setLearningTimeDetailItem({
      suniLearningTime:
        result.suniLearningTime - result.myCompanyInSuniLearningTime, //mySuni
      displayMyCompanyLearningTime:
        result.myCompanyLearningTime + result.myCompanyInSuniLearningTime, //관계사
      aplAllowTime: result.aplAllowTime, //개인학습
      totalCollegeTime: result.totalCollegeTime, //강의시간
    });
  });
}
