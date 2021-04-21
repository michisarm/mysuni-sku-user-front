import React, { Fragment, useCallback } from 'react';
import { Checkbox, CheckboxProps, Radio, Image } from 'semantic-ui-react';
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
      <div>
        {lectureSurveyItem.image && <img src={lectureSurveyItem.image} />}
      </div>
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
            <div style={{ marginTop: '10px' }}>
              <Image
                style={{ display: 'inline-block', marginRight: '5px' }}
                src={`${process.env.PUBLIC_URL}/images/all/icon-info-error-16-px.png`}
              />
              <span
                style={{
                  color: '#e1002a',
                  fontSize: '14px',
                  lineHeight: '16px',
                  verticalAlign: 'text-bottom',
                }}
              >
                해당 문항은 필수 항목 입니다.
              </span>
            </div>
          ))}
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveyChoiceView;
