import React from 'react';
import {
  isMySuniCollege,
  isMySuniCollegeById,
  useAllColleges,
} from '../../../../shared/service/requestAllColleges';
import { getCollgeName } from '../../../../shared/service/useCollege/useRequestCollege';
import { timeToHourMinutePaddingFormat } from '../../../../shared/helper/dateTimeHelper';
import ReplayCollegeLearningTimeModel from '../../../model/ReplayCollegeLearningTimeModel';

interface ReplayMyLearningTimeViewProps {
  replayLearningTimes: ReplayCollegeLearningTimeModel[];
}

export default function ReplayMyLearningTimeView({
  replayLearningTimes,
}: ReplayMyLearningTimeViewProps) {
  //
  const allColleges = useAllColleges();

  const renderCollegeTimeList = () => {
    //
    const result: JSX.Element[] = [];

    allColleges.filter(isMySuniCollege).map((c, idx) => {
      const time = replayLearningTimes
        .filter((d) => d.collegeId == c.id)
        .map((c) => c.replayLearningTime || 0)
        .reduce((a, b) => a + b, 0);

      result.push(
        <li key={c.id}>
          <span className={`name b${idx + 1}`} style={{ width: 230 }}>
            {getCollgeName(c.id)}
          </span>
          <span className="time">{timeToHourMinutePaddingFormat(time)}</span>
        </li>
      );
    });

    const index = result.length;

    const replayLearningTimeMap = new Map<
      string,
      ReplayCollegeLearningTimeModel
    >();

    replayLearningTimes &&
      replayLearningTimes
        .filter((c) => !isMySuniCollegeById(c.collegeId))
        .map((a) => {
          if (replayLearningTimeMap.has(a.collegeId)) {
            const replayLearningTimes = replayLearningTimeMap.get(a.collegeId);

            if (replayLearningTimes !== undefined) {
              replayLearningTimes.replayLearningTime += a.replayLearningTime;
            }
          } else {
            replayLearningTimeMap.set(a.collegeId, a);
          }
        });

    const iterator = replayLearningTimeMap.keys();

    for (let i = 0; i < replayLearningTimeMap.size; i++) {
      const key = iterator.next().value;

      if (replayLearningTimeMap.has(key)) {
        const replayLearningTimes = replayLearningTimeMap.get(key);

        if (replayLearningTimes !== undefined) {
          result.push(
            <li key={replayLearningTimes.id}>
              <span className={`name b${index + i}`} style={{ width: 230 }}>
                {getCollgeName(replayLearningTimes.id)}
              </span>
              <span className="time">
                {timeToHourMinutePaddingFormat(
                  replayLearningTimes.replayLearningTime
                )}
              </span>
            </li>
          );
        }
      }
    }

    return result;
  };

  return <ul className="bullet-list2">{renderCollegeTimeList()}</ul>;
}
