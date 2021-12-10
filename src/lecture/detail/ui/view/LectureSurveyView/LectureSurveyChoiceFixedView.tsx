import { LectureSurveyItem } from 'lecture/detail/viewModel/LectureSurvey';
import React, { useState, useCallback } from 'react';
import { CheckboxProps, Radio } from 'semantic-ui-react';
import { selectChoiceAnswer } from 'lecture/detail/service/useLectureSurvey/utility/saveLectureSurveyState';
import LectureSurveyState, {
  LectureSurveyAnswerItem,
} from 'lecture/detail/viewModel/LectureSurveyState';
import Image from 'shared/components/Image';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface CommonUseType {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
  lectureSurveyState?: LectureSurveyState;
}

export default function LectureSurveyChoiceFixedView(prop: CommonUseType) {
  const { lectureSurveyAnswerItem, lectureSurveyItem, lectureSurveyState } =
    prop;
  const [text, setText] = useState('');
  const onChangeValue = useCallback(
    (_: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
      if (data.value === undefined) {
        return;
      }
      selectChoiceAnswer(lectureSurveyItem, data.value);
      if (data.value === 1 || data.value === 2) {
        setText('어떤 점이 특별히 좋았나요? 자세한 학습후기를 남겨주세요.');
      } else {
        setText('어떤 점을 개선하면 좋을까요? 개선 포인트를 남겨주세요.');
      }
    },
    [lectureSurveyItem]
  );

  const { canMultipleAnswer, choices, no } = lectureSurveyItem;
  return (
    <>
      {!canMultipleAnswer && choices && (
        <div className="survey-core core1">
          <div className="core-radiogroup">
            <Radio
              className="iconRadio radio01"
              label="매우 그렇다"
              name="radioGroup01"
              value={1}
              checked={
                lectureSurveyAnswerItem !== undefined &&
                lectureSurveyAnswerItem.itemNumbers !== undefined &&
                lectureSurveyAnswerItem.itemNumbers.includes('1')
              }
              onChange={onChangeValue}
            />
            <Radio
              className="iconRadio radio02"
              label="그렇다"
              name="radioGroup01"
              value={2}
              checked={
                lectureSurveyAnswerItem !== undefined &&
                lectureSurveyAnswerItem.itemNumbers !== undefined &&
                lectureSurveyAnswerItem.itemNumbers.includes('2')
              }
              onChange={onChangeValue}
            />
            <Radio
              className="iconRadio radio03"
              label="보통이다"
              name="radioGroup01"
              value={3}
              checked={
                lectureSurveyAnswerItem !== undefined &&
                lectureSurveyAnswerItem.itemNumbers !== undefined &&
                lectureSurveyAnswerItem.itemNumbers.includes('3')
              }
              onChange={onChangeValue}
            />
            <Radio
              className="iconRadio radio04"
              label="아니다"
              name="radioGroup01"
              value={4}
              checked={
                lectureSurveyAnswerItem !== undefined &&
                lectureSurveyAnswerItem.itemNumbers !== undefined &&
                lectureSurveyAnswerItem.itemNumbers.includes('4')
              }
              onChange={onChangeValue}
            />
            <Radio
              className="iconRadio radio05"
              label="매우 아니다"
              name="radioGroup01"
              value={5}
              checked={
                lectureSurveyAnswerItem !== undefined &&
                lectureSurveyAnswerItem.itemNumbers !== undefined &&
                lectureSurveyAnswerItem.itemNumbers.includes('5')
              }
              onChange={onChangeValue}
            />
            {/* {choice.image && <img src={choice.image} />} */}
          </div>
        </div>
      )}
      {no === 1 && (
        <div className="rev-edit">
          <div className="edit-wrapper">
            <textarea rows={3} placeholder={text} />
          </div>
          <div className="rev-info">
            <span>
              {'입력해주신 내용은 과정 평가 리뷰로 활용될 수 있습니다.'}
            </span>
            <div className="cnt">
              <strong>0</strong> / 200
            </div>
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
    </>
  );
}
