import React from 'react';
import { timeToHourMinutePaddingFormat } from '../../../shared/helper/dateTimeHelper';
import {
  isMySuniCollege,
  useAllColleges,
} from '../../../shared/service/requestAllColleges';
import { CollegeLearningTime } from '../../../main/sub/PersonalBoard/model/TotalLearningTimeRdo';
import { getCollgeName } from '../../../shared/service/useCollege/useRequestCollege';

interface MySuniCollegeTimeViewProps {
  collegeLearningTimes: CollegeLearningTime[];
}

export default function MySuniCollegeTimeView({
  collegeLearningTimes,
}: MySuniCollegeTimeViewProps) {
  const allColleges = useAllColleges();

  // const totalLearningTimeRdo = useTotalLearningTimeRdo();
  // //
  // const { collegeLearningTimes } = totalLearningTimeRdo;

  return (
    <ul className="bullet-list2">
      {allColleges &&
        allColleges.filter(isMySuniCollege).map((c, idx) => {
          const time =
            collegeLearningTimes.find((d) => d.collegeId == c.id)
              ?.learningTime || 0;
          return (
            <li key={c.id}>
              <span className={`name b${idx + 1}`} style={{ width: 230 }}>
                {getCollgeName(c.id)}
              </span>
              <span className="time">
                {timeToHourMinutePaddingFormat(time)}
              </span>
            </li>
          );
        })}
    </ul>
  );
}
