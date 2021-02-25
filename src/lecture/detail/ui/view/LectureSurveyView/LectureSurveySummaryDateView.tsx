import React, { useCallback, useEffect, useState } from 'react';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import { Icon, Button } from 'semantic-ui-react';

interface LectureSurveyDateViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveySummaryDateView: React.FC<LectureSurveyDateViewProps> = function LectureSurveySummaryDateView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
}) {
  const { sentencesMap } = lectureSurveyItem;
  const sentence = lectureSurveyAnswerItem?.sentence;
  const [number, setNumber] = useState(9);

  const setCheckNumber = () => {
    setNumber(number + 9);
  };

  if (sentencesMap === undefined) {
    return null;
  }

  const lastIndex = Object.keys(sentencesMap).length || 0;

  return (
    <LectureSurveyChoiceLayout {...lectureSurveyItem}>
      <br />
      <b>{sentence}</b>
      <br />
      {Object.keys(sentencesMap)
        .sort((a, b) => (a > b ? 1 : -1))
        .map((key, index) => (
          <>
            {index >= 0 && index <= number ? (
              <div
                className={`ui right-top-count input ${
                  key === sentence ? 'active' : ''
                }`}
              >
                {key} ({sentencesMap[key]})
                <br />
              </div>
            ) : (
              ''
            )}
          </>
        ))}
      {lastIndex - 1 > number ? (
        <div>
          <Button icon className="left moreview" onClick={setCheckNumber}>
            <Icon className="moreview" />
            더보기 ({lastIndex - number - 1}개)
          </Button>
        </div>
      ) : (
        ''
      )}
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveySummaryDateView;
