import React, { useCallback } from 'react';
import { Checkbox, CheckboxProps, Radio } from 'semantic-ui-react';
import { selectChoiceAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';

interface LectureSurveyItemProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveyChoiceView: React.FC<LectureSurveyItemProps> = function LectureSurveyChoiceView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
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
            <>
              <Radio
                key={choice.no}
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
            </>
          ))}
        {canMultipleAnswer &&
          choices &&
          choices.map(choice => (
            <>
              <Checkbox
                key={choice.no}
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
            </>
          ))}
      </div>
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveyChoiceView;
