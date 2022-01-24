import { getBadgeLearningCompanyAvg } from '../api/personalBoardApi';
import {
  setBadgeLearningTimeItem,
  getBadgeLearningTimeItem,
} from '../store/PersonalBoardStore';
import { findBadgesWithStudentCount } from '../../../../certification/api/BadgeApi';
import moment from 'moment';

export async function requestBadgeLearningTime(
  companyCode: string,
  year: number = moment().year()
) {
  // const countInfo = await getCountOfBadges()
  const allBadgeCount = await findBadgesWithStudentCount();
  const badgeLearningTime = await getBadgeLearningTimeItem();
  const badgeLearningCompanyAvg = await getBadgeLearningCompanyAvg(
    companyCode,
    year
  );
  let mylearningTime = 0;

  if (badgeLearningTime !== undefined) {
    mylearningTime =
      badgeLearningTime.mylearningTimeHour * 60 +
      badgeLearningTime.mylearningTimeMinute;
  }
  if (allBadgeCount) {
    setBadgeLearningTimeItem({
      badgeMyCount: allBadgeCount.issuedCount,
      AllBadgeMyCount: allBadgeCount.badgeCount,
      companyAvgBadgeCount: badgeLearningCompanyAvg
        ? badgeLearningCompanyAvg.badgeAverage
        : 0,
      allCompanyAvgBadgeCount: allBadgeCount.badgeCount,
      allMylearningTime:
        mylearningTime > badgeLearningCompanyAvg.learningTimeAverage
          ? mylearningTime * 110
          : badgeLearningCompanyAvg * 110,
      mylearningTimeHour: badgeLearningTime!.mylearningTimeHour,
      mylearningTimeMinute: badgeLearningTime!.mylearningTimeMinute,
      companyAvglearningTime: badgeLearningCompanyAvg
        ? Math.round(badgeLearningCompanyAvg.learningTimeAverage)
        : 0,
      allCompanyAvglearningTime:
        mylearningTime > badgeLearningCompanyAvg.learningTimeAverage
          ? mylearningTime * 110
          : badgeLearningCompanyAvg * 110,
    });
  }
}
