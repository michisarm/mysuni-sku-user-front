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

  // let booleanMap : string[] = [];
  // let countMap : number[] = [];

  // answerList?.map(answer => {
  //   if(answer.summaryItems.answerItemType === 'Boolean') {
  //     booleanMap = Object.keys(answer.summaryItems.numberCountMap);
  //     countMap = Object.values(answer.summaryItems.numberCountMap);
  //   }
  // })

  // const totalCount = lectureSurveySummary?.respondentCount.respondentCount;
  // const yesCount = countMap[1];
  // const noCount = countMap[0];
  // let yesPercent: number = 0;
  // let noPercent: number = 0;

  // if (totalCount !== undefined) {
  //   yesPercent = toNumber(((yesCount / totalCount) * 100).toFixed(1));
  //   noPercent = toNumber(((noCount / totalCount) * 100).toFixed(1));
  // }

  const numberCountMap = answerList?.find(
    f => f.questionNumber === questionNumber
  )?.summaryItems.numberCountMap;

  console.log(numberCountMap);

  // const count =
  //   numberCountMap !== undefined ? numberCountMap[choice.no.toString()] : 0;

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
      {/* yes: {yesCount || 0} 퍼센트: {yesPercent || 0}
      <br />
      no: {noCount || 0} 퍼센트: {noPercent || 0} */}
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveySummaryBooleanView;
