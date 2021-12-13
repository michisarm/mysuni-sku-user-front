import { LectureSurveyItem } from 'lecture/detail/viewModel/LectureSurvey';
import React, { useState, useCallback, Fragment } from 'react';
import { CheckboxProps, Radio } from 'semantic-ui-react';
import { selectChoiceAnswer } from 'lecture/detail/service/useLectureSurvey/utility/saveLectureSurveyState';
import LectureSurveyState, {
  LectureSurveyAnswerItem,
} from 'lecture/detail/viewModel/LectureSurveyState';
import Image from 'shared/components/Image';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';

interface CommonUseType {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
  lectureSurveyState?: LectureSurveyState;
}

export default function LectureSurveyIconView(prop: CommonUseType) {
  const { lectureSurveyAnswerItem, lectureSurveyItem, lectureSurveyState } =
    prop;

  const onChangeValue = useCallback(
    (_: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
      if (data.value === undefined) {
        return;
      }
      selectChoiceAnswer(lectureSurveyItem, data.value);
    },
    [lectureSurveyItem]
  );

  const { canMultipleAnswer, choices, no } = lectureSurveyItem;
  return (
    <LectureSurveyChoiceLayout {...lectureSurveyItem}>
      {!canMultipleAnswer && choices && (
        <div className="survey-core core1">
          <div className="core-radiogroup">
            {choices.map((choice) => (
              <Fragment key={choice.no}>
                <Radio
                  className={`iconRadio radio0${choice.no}`}
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
        </div>
      )}

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
                  id="survey-필수항목-alert2"
                />
              </span>
            </div>
          ))}
    </LectureSurveyChoiceLayout>
  );
}
