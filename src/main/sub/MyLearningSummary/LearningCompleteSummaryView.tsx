import React from 'react';
import { Popup } from 'semantic-ui-react';
import moment from 'moment';
import { convertProgressValue } from './convertProgressValue';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';

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
  const complateLearningValue = Math.round(
    (completeLectureCount /
      (personalBoardInprogressCount + completeLectureCount)) *
      100
  );

  return (
    <div className="main-gauge">
      <span
        className="gauge-badge"
        dangerouslySetInnerHTML={{
          __html: getPolyglotText(
            `{year}년 완료학습`,
            'home-Summary-완료학습학습완료',
            {
              year: CURRENT_YEAR.toString(),
            }
          ),
        }}
      />

      <Popup
        trigger={
          <div
            className={`gauge-content gauge-com${
              complateLearningValue
                ? convertProgressValue(complateLearningValue)
                : 5
            }`}
          >
            <div className="gauge-content-box">
              <p>{completeLectureCount}</p>
              <span>
                <PolyglotText
                  defaultString="학습중"
                  id="home-Summary-완료학습학습중"
                />{' '}
                {personalBoardInprogressCount}
              </span>
            </div>
          </div>
        }
        style={style}
        position="bottom center"
        wide
      >
        <span className="personal_pop_tit">
          <PolyglotText
            defaultString="누적 완료학습"
            id="home-Summary-완료학습누적갯수"
          />
        </span>
        <span
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              '<strong>{personalBoardCompletedCount}</strong>개',
              'home-Summary-개',
              { personalBoardCompletedCount: personalBoardCompletedCount + '' }
            ),
          }}
        />
      </Popup>
    </div>
  );
}

const CURRENT_YEAR = moment().year();

const style = {
  borderRadius: '0.375rem',
  textAlign: 'center',
  fontSize: '0.875rem',
  border: '1px solid #aaaaaa',
  color: '#4c4c4c',
};
