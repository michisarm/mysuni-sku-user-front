import React, { Fragment, useCallback, useEffect } from 'react';
import { Checkbox, CheckboxProps, Radio, Icon, Input } from 'semantic-ui-react';
import { selectChoiceAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import { getLectureSurveyAnswerSummaryList } from 'lecture/detail/store/LectureSurveyStore';

interface LectureSurveyItemProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveySummaryChoiceView: React.FC<LectureSurveyItemProps> = function LectureSurveySummaryChoiceView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
}) {
  const answerList = getLectureSurveyAnswerSummaryList();
  const onChangeValue = useCallback(
    (_: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
      if (data.value === undefined) {
        return;
      }
      selectChoiceAnswer(lectureSurveyItem, data.value);
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
            return (
              <Fragment key={choice.no}>
                <Radio
                  className="base"
                  label={choice.title}
                  value={choice.no}
                  checked={
                    lectureSurveyAnswerItem !== undefined &&
                    lectureSurveyAnswerItem.itemNumbers !== undefined &&
                    lectureSurveyAnswerItem.itemNumbers.includes(`${choice.no}`)
                  }
                  onChange={onChangeValue}
                  readOnly={false}
                />
                {choice.count || '0'}
                {choice.image && <img src={choice.image} />}
              </Fragment>
            );
          })}

        {canMultipleAnswer &&
          choices &&
          choices.map((choice, index) => {
            return (
              <Fragment key={choice.no}>
                <Checkbox
                  className="base"
                  label={choice.title}
                  value={choice.no}
                  checked={
                    lectureSurveyAnswerItem !== undefined &&
                    lectureSurveyAnswerItem.itemNumbers !== undefined &&
                    lectureSurveyAnswerItem.itemNumbers.includes(`${choice.no}`)
                  }
                  onChange={onChangeValue}
                  readOnly={false}
                />
                {choice.count || '0'}
                {choice.image && <img src={choice.image} />}
              </Fragment>
            );
          })}
      </div>
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveySummaryChoiceView;
