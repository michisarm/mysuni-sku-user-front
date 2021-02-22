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
  const { questionNumber } = lectureSurveyItem;

  const numberCountMap = answerList?.find(
    f => f.questionNumber === questionNumber
  )?.summaryItems.numberCountMap;
  const yesCount = numberCountMap !== undefined ? numberCountMap[1] : 0;
  const noCount = numberCountMap !== undefined ? numberCountMap[2] : 0;

  const totalCount = lectureSurveySummary?.respondentCount?.respondentCount;
  const yesPercent =
    totalCount !== undefined
      ? toNumber(((yesCount / totalCount) * 100).toFixed(1))
      : 0;
  const noPercent =
    totalCount !== undefined
      ? toNumber(((noCount / totalCount) * 100).toFixed(1))
      : 0;

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
      {/* 추후 bar 차트로 변경해야 함 */}
      yes: {yesCount || 0} 퍼센트: {yesPercent || 0}
      <br />
      no: {noCount || 0} 퍼센트: {noPercent || 0}
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveySummaryBooleanView;
