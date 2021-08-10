import {
  findLearningObjectives,
  updateLearningObjectives,
} from '../api/personalBoardApi';
import {
  getLearningObjectivesItem,
  setLearningObjectivesItem,
} from '../store/PersonalBoardStore';

export function requestLearningObjectives() {
  findLearningObjectives().then((learningObjectives) => {
    setLearningObjectivesItem({
      AnnualLearningObjectives:
        learningObjectives.additionalUserInfo.learningGoal.hour,
      WeekAttendanceGoal:
        learningObjectives.additionalUserInfo.learningGoal.attendance,
      DailyLearningTimeHour:
        learningObjectives.additionalUserInfo.learningGoal.dailyTime.hours,
      DailyLearningTimeMinute:
        learningObjectives.additionalUserInfo.learningGoal.dailyTime.minutes,
    });
  });
}

export function saveLearningObjectives() {
  const param = getLearningObjectivesItem();
  updateLearningObjectives(param!).then(() => {
    requestLearningObjectives();
  });
}
