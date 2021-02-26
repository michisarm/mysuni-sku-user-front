import React, { Fragment, useCallback } from 'react';
import { Checkbox, CheckboxProps, Radio, Icon } from 'semantic-ui-react';
import { selectChoiceAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import LectureSurveyState from '../../../viewModel/LectureSurveyState';

interface LectureSurveyItemProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
  lectureSurveyState?: LectureSurveyState;
}

const LectureSurveyChoiceView: React.FC<LectureSurveyItemProps> = function LectureSurveyChoiceView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
  lectureSurveyState,
}) {
  const onChangeValue = useCallback(
    (_: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
      if (data.value === undefined) {
        return;
      }
      selectChoiceAnswer(lectureSurveyItem, data.value);
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
                  lectureSurveyAnswerItem.itemNumbers !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers.includes(`${choice.no}`)
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
                  lectureSurveyAnswerItem.itemNumbers !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers.includes(`${choice.no}`)
                }
                onChange={onChangeValue}
                readOnly={false}
              />
              {choice.image && <img src={choice.image} />}
            </Fragment>
          ))}
      </div>

      {lectureSurveyState === undefined ||
        (lectureSurveyState.state === 'Progress' &&
          lectureSurveyItem.isRequired === true &&
          lectureSurveyAnswerItem === undefined && (
            <>
              <Icon className="icon exclamation circle " />
              <span>필수문항 응답 후 제출해주세요.</span>
            </>
          ))}
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveyChoiceView;
