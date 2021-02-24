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
  useLectureSurveySummary,
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
  const lectureSurveySummary = useLectureSurveySummary();
  const respondCount = lectureSurveySummary?.respondentCount.respondentCount;
  const { canMultipleAnswer, choices, questionNumber } = lectureSurveyItem;

  return (
    <LectureSurveyChoiceLayout {...lectureSurveyItem}>
      <div className="course-survey-list">
        {!canMultipleAnswer &&
          choices &&
          choices.map(choice => {
            const criterionAvg =
              choice.count !== undefined &&
              respondCount !== undefined &&
              ((choice.count / respondCount) * 100).toFixed(1);

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
                  readOnly={true}
                />
                {choice.count || '0'}
                <br />
                {criterionAvg || 0}
                {choice.image && <img src={choice.image} />}
              </Fragment>
            );
          })}
        {canMultipleAnswer &&
          choices &&
          choices.map(choice => {
            const criterionAvg =
              choice.count !== undefined &&
              respondCount !== undefined &&
              ((choice.count / respondCount) * 100).toFixed(1);
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
                  readOnly={true}
                />
                {choice.count || '0'}
                <br />
                {criterionAvg || 0}
                {choice.image && <img src={choice.image} />}
              </Fragment>
            );
          })}
      </div>
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveySummaryCriterionView;
