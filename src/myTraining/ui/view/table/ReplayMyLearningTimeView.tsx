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
      const time =
        (replayLearningTimes &&
          replayLearningTimes.find((d) => d.collegeId == c.id)
            ?.replayLearningTime) ||
        0;
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

    replayLearningTimes &&
      replayLearningTimes
        .filter((c) => !isMySuniCollegeById(c.collegeId))
        .map((c, idx) => {
          const time = c.replayLearningTime || 0;
          result.push(
            <li key={c.collegeId}>
              <span className={`name b${index + idx}`} style={{ width: 230 }}>
                {getCollgeName(c.collegeId)}
              </span>
              <span className="time">
                {timeToHourMinutePaddingFormat(time)}
              </span>
            </li>
          );
        });

    return result;
  };

  return <ul className="bullet-list2">{renderCollegeTimeList()}</ul>;
}
