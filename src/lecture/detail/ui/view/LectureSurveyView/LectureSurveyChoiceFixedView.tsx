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

export default function LectureSurveyChoiceFixedView(prop: CommonUseType) {
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

  const { canMultipleAnswer, no } = lectureSurveyItem;
  return (
    <LectureSurveyChoiceLayout {...lectureSurveyItem}>
      {!canMultipleAnswer && (
        <div className="survey-core core1">
          <div className="core-radiogroup">
            <Fragment>
              <Radio
                className="iconRadio radio05"
                label="전혀 아니다"
                value={1}
                checked={
                  lectureSurveyAnswerItem !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers.includes(`1`)
                }
                onChange={onChangeValue}
                readOnly={false}
              />
              <Radio
                className="iconRadio radio04"
                label="아니다"
                value={2}
                checked={
                  lectureSurveyAnswerItem !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers.includes(`2`)
                }
                onChange={onChangeValue}
                readOnly={false}
              />
              <Radio
                className="iconRadio radio03"
                label="보통이다"
                value={3}
                checked={
                  lectureSurveyAnswerItem !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers.includes(`3`)
                }
                onChange={onChangeValue}
                readOnly={false}
              />
              <Radio
                className="iconRadio radio02"
                label="그렇다"
                value={4}
                checked={
                  lectureSurveyAnswerItem !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers.includes(`4`)
                }
                onChange={onChangeValue}
                readOnly={false}
              />
              <Radio
                className="iconRadio radio01"
                label="매우 그렇다"
                value={5}
                checked={
                  lectureSurveyAnswerItem !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers !== undefined &&
                  lectureSurveyAnswerItem.itemNumbers.includes(`5`)
                }
                onChange={onChangeValue}
                readOnly={false}
              />
            </Fragment>
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
