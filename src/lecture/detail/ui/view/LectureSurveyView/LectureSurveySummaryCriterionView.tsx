import React, { Fragment, useCallback, useEffect } from 'react';
import { Checkbox, CheckboxProps, Radio, Icon } from 'semantic-ui-react';
import { selectCriterionAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import LectureSurveyState from '../../../viewModel/LectureSurveyState';
import {
  getLectureSurveyAnswerSummaryList,
  useLectureSurveyAnswerSummaryList,
} from 'lecture/detail/store/LectureSurveyStore';

interface LectureSurveySummaryCriterionViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveySummaryCriterionView: React.FC<LectureSurveySummaryCriterionViewProps> = function LectureSurveySummaryCriterionView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
}) {
  const answerList = useLectureSurveyAnswerSummaryList();
  const onChangeValue = useCallback(
    (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
      if (data.value === undefined) {
        return;
      }
      selectCriterionAnswer(lectureSurveyItem, data.value);
    },
    [lectureSurveyItem]
  );

  const { canMultipleAnswer, choices, questionNumber } = lectureSurveyItem;
  return (
    <LectureSurveyChoiceLayout {...lectureSurveyItem}>
      <div className="course-survey-list">
        {!canMultipleAnswer &&
          choices &&
          choices.map((choice, index) => {
            const criteriaItemCountMap = answerList?.find(
              f => f.questionNumber === questionNumber
            )?.summaryItems.criteriaItemCountMap;
            const count =
              criteriaItemCountMap !== undefined
                ? criteriaItemCountMap[choice.no.toString()]
                : 0;

            return (
              <Fragment key={choice.no}>
                <Radio
                  className="base"
                  label={choice.title}
                  value={choice.no}
                  checked={
                    lectureSurveyAnswerItem !== undefined &&
                    lectureSurveyAnswerItem.criteriaItem !== undefined &&
                    lectureSurveyAnswerItem.criteriaItem.value === choice.no
                  }
                  onChange={onChangeValue}
                  readOnly={false}
                />
                {count || 0}
                {choice.image && <img src={choice.image} />}
              </Fragment>
            );
          })}
        {canMultipleAnswer &&
          choices &&
          choices.map((choice, index) => {
            const criteriaItemCountMap = answerList?.find(
              f => f.questionNumber === questionNumber
            )?.summaryItems.criteriaItemCountMap;
            const count =
              criteriaItemCountMap !== undefined
                ? criteriaItemCountMap[choice.no.toString()]
                : 0;

            return (
              <Fragment key={choice.no}>
                <Checkbox
                  className="base"
                  label={choice.title}
                  value={choice.no}
                  checked={
                    lectureSurveyAnswerItem !== undefined &&
                    lectureSurveyAnswerItem.criteriaItem !== undefined &&
                    lectureSurveyAnswerItem.criteriaItem.value === choice.no
                  }
                  onChange={onChangeValue}
                  readOnly={false}
                />
                {count || 0}
                {choice.image && <img src={choice.image} />}
              </Fragment>
            );
          })}
      </div>
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveySummaryCriterionView;
