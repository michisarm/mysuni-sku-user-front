import { findLearningObjectives, updateLearningObjectives } from '../api/personalBoardApi';
import { getLearningObjectivesItem, setLearningObjectivesItem } from '../store/PersonalBoardStore';

export function requestLearningObjectives() {
  findLearningObjectives().then((learningObjectives) => {
    setLearningObjectivesItem({
      AnnualLearningObjectives: learningObjectives.goal.hour,
      WeekAttendanceGoal: learningObjectives.goal.attendance,
      DailyLearningTimeHour: learningObjectives.goal.dailyTime.hours,
      DailyLearningTimeMinute: learningObjectives.goal.dailyTime.minutes,
    })
  })
}
export function saveLearningObjectives() {
  const param = getLearningObjectivesItem()
  updateLearningObjectives(param!).then(() => {
    requestLearningObjectives()
  })

}