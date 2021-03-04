import { findLearningObjectives, findTotalMyLearningSummary } from '../api/personalBoardApi';
import { setBadgeLearningTimeItem, setLearningObjectivesItem } from '../store/PersonalBoardStore';

export function requestLearningObjectives() {
  console.log('이거타야지')
  findLearningObjectives().then((test) => {
    console.log('test', test)
    setLearningObjectivesItem({
      AnnualLearningObjectives: 10,
      WeekAttendanceGoal: 10,
      DailyLearningTimeHour: 10,
      DailyLearningTimeMinute: 10,
    })
  })
}
export function saveLearningObjectives() {
  console.log('목표 설정 api 호출')
}