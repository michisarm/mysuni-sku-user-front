import React from 'react';
import { Popup } from 'semantic-ui-react';
import moment from 'moment';
import LearningTimeView from './LearningTimeView';
import AccruedLearningTimeView from './AccruedLearningTimeView';
import LearningObjectives from '../PersonalBoard/viewModel/LearningObjectives';
import { convertProgressValue } from './convertProgressValue';


interface LearningTimeSummaryViewProps {
  totalLearningTime: number;
  totalAccrueLearningTime: number;
  learningObjectives: LearningObjectives;
}


export default function LearningTimeSummaryView({
  totalLearningTime,
  totalAccrueLearningTime,
  learningObjectives,
}: LearningTimeSummaryViewProps) {

  let LearningObjectivesPer = Math.floor((totalLearningTime/ (learningObjectives!.AnnualLearningObjectives*60)) * 100)
  
  if( learningObjectives.AnnualLearningObjectives !== 0 && LearningObjectivesPer > 100) {
    LearningObjectivesPer = 100
  } else if (LearningObjectivesPer === Infinity) {
    LearningObjectivesPer = 0
  }

  return (
    <div className="main-gauge ">
      <span className="gauge-badge">{CURRENT_YEAR + "년 학습시간"}</span>
      <Popup
        trigger={
          <div className={`gauge-content gauge-time${LearningObjectivesPer ? (LearningObjectivesPer === 100 ? 100 : convertProgressValue(LearningObjectivesPer)) : 5}`}>
            <div className="gauge-content-box">
              <p>
                <LearningTimeView 
                  learningTime={totalLearningTime}
                />
              </p>
              <span>목표 {learningObjectives!.AnnualLearningObjectives}h</span>
            </div>
          </div>
        }
        style={style}
        position="bottom center"
        wide
      >
        <span className="personal_pop_tit">
        누적 학습시간
        </span>
        <span>
          <strong>
            <AccruedLearningTimeView 
              accruedLearningTime={totalAccrueLearningTime}
            />
          </strong>
        </span>
      </Popup>
    </div>
  );
}

const CURRENT_YEAR = moment().year();

const style = {
  borderRadius: "0.375rem",
  textAlign: "center",
  fontSize: "0.875rem",
  border: "1px solid #aaaaaa",
  color: "#4c4c4c",
};