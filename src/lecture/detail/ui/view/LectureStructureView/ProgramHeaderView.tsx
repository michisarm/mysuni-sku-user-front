import React from 'react';
import { timeToHourMinuteFormat } from '../../../../../shared/helper/dateTimeHelper';
import { State } from '../../../viewModel/LectureState';

interface ProgramHeaderViewProps {
  name: string;
  state?: State;
  learningTime: number;
  additionalLearningTime: number;
}

const ProgramHeaderView: React.FC<ProgramHeaderViewProps> = function ProgramHeaderView({
  name,
  state,
  learningTime,
  additionalLearningTime,
}) {
  return (
    <div className="cube-state-holder">
      <div className="cube-state-title intro-vr2">
        <span>{name}</span>
        <div className="cube-state-bottom">
          {/* {!isNaN(learningTime) && (
            <span>{timeToHourMinuteFormat(learningTime)}</span>
          )} */}
          {/* {!isNaN(additionalLearningTime) && additionalLearningTime > 0 && (
            <strong>
              {`+ ${timeToHourMinuteFormat(additionalLearningTime)}`}
            </strong>
          )} */}
          <span
            className={`label-state-learning ${state === 'Progress' &&
              'proceeding'} ${state === 'Completed' && 'complete'}`}
          >
            <span>진행상태</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgramHeaderView;
