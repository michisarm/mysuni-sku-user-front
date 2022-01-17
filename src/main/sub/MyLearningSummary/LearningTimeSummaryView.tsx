import React from 'react';
import { Popup } from 'semantic-ui-react';
import moment from 'moment';
import LearningTimeView from './LearningTimeView';
import AccruedLearningTimeView from './AccruedLearningTimeView';
import LearningObjectives from '../PersonalBoard/viewModel/LearningObjectives';
import { convertProgressValue } from './convertProgressValue';
import {
  PolyglotText,
  getPolyglotText,
} from '../../../shared/ui/logic/PolyglotText';

interface LearningTimeSummaryViewProps {
  year: string;
  totalLearningTime: number;
  learningGoalHour: number;
}

export default function LearningTimeSummaryView({
  year,
  totalLearningTime,
  learningGoalHour,
}: LearningTimeSummaryViewProps) {
  console.log(totalLearningTime);
  console.log(learningGoalHour);
  let LearningObjectivesPer = Math.floor(
    (totalLearningTime / (learningGoalHour * 60)) * 100
  );

  if (LearningObjectivesPer > 100) {
    LearningObjectivesPer = 100;
  } else if (LearningObjectivesPer === Infinity) {
    LearningObjectivesPer = 0;
  }

  return (
    <div className="main-gauge ">
      <span
        className="gauge-badge"
        dangerouslySetInnerHTML={{
          __html: getPolyglotText(
            `{year}년 학습시간`,
            'home-Summary-학습시간',
            {
              year,
            }
          ),
        }}
      />

      <Popup
        trigger={
          <div
            className={`gauge-content gauge-time${
              LearningObjectivesPer
                ? LearningObjectivesPer === 100
                  ? 100
                  : convertProgressValue(LearningObjectivesPer)
                : 5
            }`}
          >
            <div className="gauge-content-box">
              <p>
                <LearningTimeView learningTime={totalLearningTime} />
              </p>
              <span>{learningGoalHour}h</span>
            </div>
          </div>
        }
        style={style}
        position="bottom center"
        wide
      >
        <span className="personal_pop_tit">
          <PolyglotText
            defaultString="누적 학습시간"
            id="home-Summary-누적시간"
          />
        </span>
        <span>
          <strong>
            <LearningTimeView learningTime={totalLearningTime} />
          </strong>
        </span>
      </Popup>
    </div>
  );
}

const style = {
  borderRadius: '0.375rem',
  textAlign: 'center',
  fontSize: '0.875rem',
  border: '1px solid #aaaaaa',
  color: '#4c4c4c',
};
