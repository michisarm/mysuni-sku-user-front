import React, { Fragment, useCallback } from 'react';
import { Checkbox, CheckboxProps, Radio } from 'semantic-ui-react';
import { selectCriterionAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';

interface LectureSurveyCriterionViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveyCriterionView: React.FC<LectureSurveyCriterionViewProps> = function LectureSurveyCriterionView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
}) {
  const onChangeValue = useCallback(
    (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
      if (data.value === undefined) {
        return;
      }
      selectCriterionAnswer(lectureSurveyItem, data.value);
    },
    [lectureSurveyItem]
  );

  const { canMultipleAnswer, choices } = lectureSurveyItem;
  return (
    <LectureSurveyChoiceLayout {...lectureSurveyItem}>
      <div className="course-survey-list">
        {!canMultipleAnswer &&
          choices &&
          choices.map(choice => (
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
              {choice.image && <img src={choice.image} />}
            </Fragment>
          ))}
        {canMultipleAnswer &&
          choices &&
          choices.map(choice => (
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
              {choice.image && <img src={choice.image} />}
            </Fragment>
          ))}
      </div>
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveyCriterionView;
