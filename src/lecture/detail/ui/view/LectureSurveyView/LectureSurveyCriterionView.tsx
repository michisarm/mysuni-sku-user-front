import React, { Fragment, useCallback } from 'react';
import { Checkbox, CheckboxProps, Radio, Icon } from 'semantic-ui-react';
import { selectCriterionAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import LectureSurveyState from '../../../viewModel/LectureSurveyState';

interface LectureSurveyCriterionViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
  lectureSurveyState?: LectureSurveyState;
}

const LectureSurveyCriterionView: React.FC<LectureSurveyCriterionViewProps> = function LectureSurveyCriterionView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
  lectureSurveyState
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

      {lectureSurveyState === undefined ||
        lectureSurveyState.state === 'Progress' && 
        lectureSurveyItem.isRequired === true && 
        lectureSurveyAnswerItem === undefined && (
          <>
            <Icon className="icon listdel24" />
            <span style={{margin: '0 0 0 7px'}}>필수문항 응답 후 제출해주세요.</span>
          </>
        )
      }

    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveyCriterionView;
