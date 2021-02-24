import moment from 'moment';
import { findTotalMyLearningSummary, getBadgeLearningCompanyAvg, getCountOfBadges } from '../api/personalBoardApi';
import {  setBadgeLearningTimeItem, getBadgeLearningTimeItem, } from '../store/PersonalBoardStore';
import { BadgeService } from 'lecture/stores';

export async function requestBadgeLearningTime(companyCode: string) {

  const countInfo = await getCountOfBadges()
  const badgeLearningTime = await getBadgeLearningTimeItem()
  const badgeLearningCompanyAvg = await getBadgeLearningCompanyAvg(companyCode)

  let mylearningTime = 0
  if(badgeLearningTime !== undefined) {
    mylearningTime =badgeLearningTime.mylearningTimeHour * 60 + badgeLearningTime.mylearningTimeMinute
  }
  
  findTotalMyLearningSummary().then((test) => {
    setBadgeLearningTimeItem({
      badgeMyCount: countInfo!.issuedCount,
      AllBadgeMyCount: countInfo!.totalCount,
      companyAvgBadgeCount: badgeLearningCompanyAvg.badgeAverage,
      allCompanyAvgBadgeCount: countInfo!.totalCount,
      allMylearningTime: mylearningTime > badgeLearningCompanyAvg.learningTimeAverage ? mylearningTime * 110 : badgeLearningCompanyAvg * 110,
      mylearningTimeHour: badgeLearningTime!.mylearningTimeHour,
      mylearningTimeMinute: badgeLearningTime!.mylearningTimeMinute,
      companyAvglearningTime: badgeLearningCompanyAvg.learningTimeAverage,
      allCompanyAvglearningTime: mylearningTime > badgeLearningCompanyAvg.learningTimeAverage ? mylearningTime * 110 : badgeLearningCompanyAvg * 110,
    })
  })
}
