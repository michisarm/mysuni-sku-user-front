import SkProfileApi from 'profile/present/apiclient/SkProfileApi';
import { LearningGoal } from '../../../../profile/model/LearningGoal';
import {
  findLearningObjectives,
  updateLearningObjectives,
} from '../api/personalBoardApi';
import {
  getLearningObjectivesItem,
  setLearningObjectivesItem,
} from '../store/PersonalBoardStore';
import { NameValueList } from 'shared/model';

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

export async function saveLearningObjectives() {
  const param = getLearningObjectivesItem();
  if (param !== undefined) {
    const params: LearningGoal = {
      attendance: param.WeekAttendanceGoal,
      dailyTime: {
        hours: param.DailyLearningTimeHour,
        minutes: param.DailyLearningTimeMinute,
      },
      hour: param.AnnualLearningObjectives,
    };
    const LearningGoal: NameValueList = {
      nameValues: [
        {
          name: 'learningGoal',
          value: JSON.stringify(params),
        },
      ],
    };

    await SkProfileApi.instance.modifyStudySummary(LearningGoal).then(() => {
      requestLearningObjectives();
    });
  }
}
