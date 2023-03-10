import { findTotalLearningTime } from '../api/personalBoardApi';
import { setCollegeTopChartItem } from '../store/PersonalBoardStore';
import { getCollgeName } from '../../../../shared/service/useCollege/useRequestCollege';
import {
  setTotalLearningTimeRdo,
  getTotalLearningTimeRdo,
} from '../model/TotalLearningTimeRdo';
import CollegeLearningTimeModel from '../../../../myTraining/model/CollegeLearningTimeModel';

export async function requestCollegePercent() {
  findTotalLearningTime().then((totalLearningTimeRdo) => {
    if (totalLearningTimeRdo === undefined) {
      return;
    }
    setTotalLearningTimeRdo(totalLearningTimeRdo);
    const { collegeLearningTimes } = totalLearningTimeRdo;

    const totalTime = collegeLearningTimes.reduce<number>((p, c) => {
      return p + c.learningTime;
    }, 0);

    const collegeArr = collegeLearningTimes
      .sort((a, b) => b.learningTime - a.learningTime)
      .filter((_, i) => i < 5)
      .map((c) => {
        return {
          college: getCollgeName(c.collegeId),
          percent: Math.floor((c.learningTime / totalTime) * 100),
        };
      });

    setCollegeTopChartItem([...collegeArr]);
  });
}

export function setCollegePercent(
  collegeLearningTimes: CollegeLearningTimeModel[]
) {
  //
  const totalLearningTimeRdo = getTotalLearningTimeRdo();

  if (totalLearningTimeRdo !== undefined) {
    totalLearningTimeRdo.collegeLearningTimes = collegeLearningTimes;
    setTotalLearningTimeRdo(totalLearningTimeRdo);
  }

  const totalTime = collegeLearningTimes.reduce<number>((p, c) => {
    return p + c.learningTime;
  }, 0);

  const collegeArr = collegeLearningTimes
    .sort((a, b) => b.learningTime - a.learningTime)
    .filter((_, i) => i < 5)
    .map((c) => {
      return {
        college: getCollgeName(c.collegeId),
        percent: Math.floor((c.learningTime / totalTime) * 100),
      };
    });

  setCollegeTopChartItem([...collegeArr]);
}

export async function getCollegePercent(
  collegeLearningTimes: CollegeLearningTimeModel[]
) {
  //
  const totalLearningTimeRdo = getTotalLearningTimeRdo();

  if (totalLearningTimeRdo !== undefined) {
    totalLearningTimeRdo.collegeLearningTimes = collegeLearningTimes;
    setTotalLearningTimeRdo(totalLearningTimeRdo);
  }

  const totalTime = collegeLearningTimes.reduce<number>((p, c) => {
    return p + c.learningTime;
  }, 0);

  const collegeArr = collegeLearningTimes
    .sort((a, b) => b.learningTime - a.learningTime)
    .filter((_, i) => i < 5)
    .map((c) => {
      return {
        college: getCollgeName(c.collegeId),
        percent: Math.floor((c.learningTime / totalTime) * 100),
      };
    });

  return collegeArr;
}
