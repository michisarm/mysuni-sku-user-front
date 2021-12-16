import React, { Fragment, useCallback } from 'react';
import { Checkbox, CheckboxProps, Radio, Image } from 'semantic-ui-react';
import { selectCriterionAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import LectureSurveyState from '../../../viewModel/LectureSurveyState';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface LectureSurveyCriterionViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
  lectureSurveyState?: LectureSurveyState;
}

const LectureSurveyCriterionView: React.FC<LectureSurveyCriterionViewProps> =
  function LectureSurveyCriterionView({
    lectureSurveyItem,
    lectureSurveyAnswerItem,
    lectureSurveyState,
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
            choices.map((choice) => (
              <Fragment key={choice.no}>
                <Radio
                  className="base"
                  label={choice.title}
                  value={choice.no}
                  checked={
                    lectureSurveyAnswerItem !== undefined &&
                    lectureSurveyAnswerItem.criteriaItem !== undefined &&
                    lectureSurveyAnswerItem.criteriaItem?.value === choice.no
                  }
                  onChange={onChangeValue}
                  readOnly={false}
                />
                {choice.image && <img src={choice.image} />}
              </Fragment>
            ))}
          {canMultipleAnswer &&
            choices &&
            choices.map((choice) => (
              <Fragment key={choice.no}>
                <Checkbox
                  className="base"
                  label={choice.title}
                  value={choice.no}
                  checked={
                    lectureSurveyAnswerItem !== undefined &&
                    lectureSurveyAnswerItem.criteriaItem !== undefined &&
                    lectureSurveyAnswerItem.criteriaItem?.value === choice.no
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
                  <PolyglotText
                    defaultString="해당 문항은 필수 항목 입니다."
                    id="survey-필수항목-alert3"
                  />
                </span>
              </div>
            ))}
      </LectureSurveyChoiceLayout>
    );
  };

export default LectureSurveyCriterionView;
