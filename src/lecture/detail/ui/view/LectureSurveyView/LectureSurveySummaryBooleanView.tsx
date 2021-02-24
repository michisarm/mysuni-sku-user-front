import React, { ChangeEvent, useCallback } from 'react';
import { Checkbox, Form, Icon, Radio, Input } from 'semantic-ui-react';
import {
  selectSentenceAnswer,
  selectBooleanAnswer,
} from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import LectureSurveyState from '../../../viewModel/LectureSurveyState';
import {
  useLectureSurveyAnswerSummaryList,
  useLectureSurveySummary,
} from 'lecture/detail/store/LectureSurveyStore';
import { toInteger, toNumber } from 'lodash';
import { number } from '@storybook/addon-knobs';

interface LectureSurveySummaryBooleanViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveySummaryBooleanView: React.FC<LectureSurveySummaryBooleanViewProps> = function LectureSurveySummaryBooleanView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
}) {
  const answerList = useLectureSurveyAnswerSummaryList();
  const lectureSurveySummary = useLectureSurveySummary();

  const onChangeValue = useCallback(() => {
    const next =
      lectureSurveyAnswerItem !== undefined &&
      lectureSurveyAnswerItem.itemNumbers !== undefined &&
      lectureSurveyAnswerItem.itemNumbers[0] === '1'
        ? '0'
        : '1';
    selectBooleanAnswer(lectureSurveyItem, next);
  }, [lectureSurveyItem, lectureSurveyAnswerItem]);
  const { questionNumber, numberCountMap } = lectureSurveyItem;

  let yesCount = 0;
  let noCount = 0;
  let yesAvg = '';
  let noAvg = '';

  const respondCount = lectureSurveySummary?.respondentCount.respondentCount;

  if (numberCountMap !== undefined && respondCount !== undefined) {
    yesCount = numberCountMap[1];
    noCount = numberCountMap[0];

    yesAvg = Math.round((yesCount / respondCount) * 100).toFixed(1);
    noAvg = Math.round((noCount / respondCount) * 100).toFixed(1);
  }

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
        {yesCount || 0} {yesAvg || 0}
        <br />
        {noCount || 0} {noAvg || 0}
      </div>
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveySummaryBooleanView;
