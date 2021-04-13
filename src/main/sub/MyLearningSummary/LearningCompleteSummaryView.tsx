import React from 'react';
import { Popup } from 'semantic-ui-react';
import moment from 'moment';
import { convertProgressValue } from './convertProgressValue';


interface LearningCompleteSummaryViewProps {
  completeLectureCount: number;
  personalBoardInprogressCount: number;
  personalBoardCompletedCount: number;
}

export default function LearningCompleteSummaryView({
  completeLectureCount,
  personalBoardInprogressCount,
  personalBoardCompletedCount,
}: LearningCompleteSummaryViewProps) {
  const complateLearningValue = Math.round((completeLectureCount / (personalBoardInprogressCount + completeLectureCount)) * 100);
  
  return (
    <div className="main-gauge">
      <span className="gauge-badge">{CURRENT_YEAR + "년 완료학습"}</span>
        <Popup
          trigger={
            <div className={`gauge-content gauge-com${complateLearningValue ? convertProgressValue(complateLearningValue) : 5}`}>
              <div className="gauge-content-box">
                <p>{completeLectureCount}</p>
                <span>학습중 {personalBoardInprogressCount}</span>
              </div>
            </div>
          }
          style={style}
          position="bottom center"
          wide
        >
          <span className="personal_pop_tit">
            누적 완료학습
          </span>
          <span>
            <strong>{personalBoardCompletedCount}</strong>개
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
