import React, { useCallback } from 'react';
import {
  selectBooleanAnswer,
  selectSentenceAnswer,
} from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';

interface LectureSurveyBooleanViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveyBooleanView: React.FC<LectureSurveyBooleanViewProps> = function LectureSurveyBooleanView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
}) {
  const onChangeValue = useCallback(() => {
    const next =
      lectureSurveyAnswerItem !== undefined &&
      lectureSurveyAnswerItem.itemNumbers !== undefined &&
      lectureSurveyAnswerItem.itemNumbers[0] === '1'
        ? '0'
        : '1';
    selectBooleanAnswer(lectureSurveyItem, next);
  }, [lectureSurveyItem, lectureSurveyAnswerItem]);
  const { questionNumber } = lectureSurveyItem;

  return (
    <LectureSurveyChoiceLayout {...lectureSurveyItem}>
      <div className="preview">
        <div
          className="lms-toggle init"
          style={{ position: 'relative', top: '0' }}
        >
          {/*처음 로딩시 className="lms-switch init"*/}
          {/*클릭이후  className="lms-switch"*/}
          <label
            htmlFor={questionNumber}
            className={`lms-switch ${
              lectureSurveyAnswerItem === undefined ||
              lectureSurveyAnswerItem.itemNumbers === undefined
                ? 'init'
                : ''
            }`}
          >
            <input
              type="checkbox"
              id={questionNumber}
              checked={
                lectureSurveyAnswerItem !== undefined &&
                lectureSurveyAnswerItem.itemNumbers !== undefined &&
                lectureSurveyAnswerItem.itemNumbers[0] === '1'
              }
              onChange={onChangeValue}
            />
            <span className="slider" />
            <span className="lms-radio-text" />
          </label>
        </div>
      </div>
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveyBooleanView;
