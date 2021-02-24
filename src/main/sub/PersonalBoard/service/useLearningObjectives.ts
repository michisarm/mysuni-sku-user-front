import { findLearningObjectives, findTotalMyLearningSummary } from '../api/personalBoardApi';
import { setBadgeLearningTimeItem, setLearningObjectivesItem } from '../store/PersonalBoardStore';

export function requestLearningObjectives() {
  findLearningObjectives().then((test) => {
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