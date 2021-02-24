import moment from 'moment';
import { BadgeService } from 'lecture/stores';
import { getDashBoardSentence } from '../api/dashBoardSentenceApi';
import { setDashBoardSentenceItem } from '../store/DashBoardSentenceStore';

export async function requestDashBoardSentence() {
  console.log('000000000000000')
  // const dashBoardSentence = await getDashBoardSentence()
  // const badgeLearningTime = await getBadgeLearningTimeItem()
  // const badgeLearningCompanyAvg = await getBadgeLearningCompanyAvg(companyCode)

  // let mylearningTime = 0
  // if(badgeLearningTime !== undefined) {
  //   mylearningTime =badgeLearningTime.mylearningTimeHour * 60 + badgeLearningTime.mylearningTimeMinute
  // }
  setDashBoardSentenceItem({
    dashboardSentence: [{
      0:'1111111111111111111111',
      1:'22222222222222222222222',
      2:'33333333333333333333333',
      3:'4444444444444444444444',
      4:'5555555555555555'
    }],
    recentlyShowNumber: 0
  })
  
  // getDashBoardSentence().then((item) => {
  //   console.log('item', item)
  //   console.log('111111111111')
  //   setDashBoardSentenceItem({
  //     dashboardSentence: [{
  //       0:'1111111111111111111111',
  //       1:'22222222222222222222222',
  //       2:'33333333333333333333333',
  //       3:'4444444444444444444444',
  //       4:'5555555555555555'
  //     }],
  //     recentlyShowNumber: 0
  //   })
  // })
}
