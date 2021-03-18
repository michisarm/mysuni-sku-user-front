import { findTotalMyLearningSummary, getBadgeLearningCompanyAvg, getCountOfBadges } from '../api/personalBoardApi';
import {  setBadgeLearningTimeItem, getBadgeLearningTimeItem, } from '../store/PersonalBoardStore';

export async function requestBadgeLearningTime(companyCode: string) {

  const countInfo = await getCountOfBadges()
  const badgeLearningTime = await getBadgeLearningTimeItem()
  const badgeLearningCompanyAvg = await getBadgeLearningCompanyAvg(companyCode)
  let mylearningTime = 0

  if(badgeLearningTime !== undefined) {
    mylearningTime =badgeLearningTime.mylearningTimeHour * 60 + badgeLearningTime.mylearningTimeMinute
  }
  findTotalMyLearningSummary().then(() => {
    if(countInfo) {
      setBadgeLearningTimeItem({
        badgeMyCount: countInfo!.issuedCount,
        AllBadgeMyCount: countInfo!.totalCount,
        companyAvgBadgeCount: badgeLearningCompanyAvg ? badgeLearningCompanyAvg.badgeAverage : 0,
        allCompanyAvgBadgeCount: countInfo!.totalCount,
        allMylearningTime: mylearningTime > badgeLearningCompanyAvg.learningTimeAverage ? mylearningTime * 110 : badgeLearningCompanyAvg * 110,
        mylearningTimeHour: badgeLearningTime!.mylearningTimeHour,
        mylearningTimeMinute: badgeLearningTime!.mylearningTimeMinute,
        companyAvglearningTime: badgeLearningCompanyAvg ? Math.round(badgeLearningCompanyAvg.learningTimeAverage) : 0,
        allCompanyAvglearningTime: mylearningTime > badgeLearningCompanyAvg.learningTimeAverage ? mylearningTime * 110 : badgeLearningCompanyAvg * 110,
      })
    }
  })
}
