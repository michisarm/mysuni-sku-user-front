import { LectureSurveyItem } from 'lecture/detail/viewModel/LectureSurvey';
import React, { useState, useCallback, Fragment, ChangeEvent } from 'react';
import { CheckboxProps, Radio } from 'semantic-ui-react';
import {
  selectReviewChoiceAnswer,
  selectReviewSentenceAnswer,
} from 'lecture/detail/service/useLectureSurvey/utility/saveLectureSurveyState';
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

export default function LectureSurveyReviewView(props: CommonUseType) {
  const { lectureSurveyAnswerItem, lectureSurveyItem, lectureSurveyState } =
    props;
  const [placeholderText, setPlaceholderText] = useState('');
  const onChangeValue = useCallback(
    (_: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
      if (data.value === undefined) {
        return;
      }
      selectReviewChoiceAnswer(lectureSurveyItem, data.value);
      if (data.value === 4 || data.value === 5) {
        setPlaceholderText(
          '어떤 점이 특별히 좋았나요? 자세한 학습후기를 남겨주세요.'
        );
      } else {
        setPlaceholderText(
          '어떤 점을 개선하면 좋을까요? 개선 포인트를 남겨주세요.'
        );
      }
    },
    [lectureSurveyItem]
  );
  const onChangeTextValue = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (e.target.value.length <= 200) {
        selectReviewSentenceAnswer(lectureSurveyItem, e.target.value);
      }
    },
    [lectureSurveyItem]
  );

  const { canMultipleAnswer } = lectureSurveyItem;

  let textAreaValue =
    lectureSurveyAnswerItem && lectureSurveyAnswerItem.sentence;
  if (textAreaValue === null) {
    textAreaValue = '';
  }
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

      <div className="rev-edit">
        <div className="edit-wrapper">
          <textarea
            rows={3}
            placeholder={placeholderText}
            value={textAreaValue}
            onChange={onChangeTextValue}
            readOnly={placeholderText.length === 0}
          />
        </div>
        <div className="rev-info">
          <span>
            {'입력해주신 내용은 과정 평가 리뷰로 활용될 수 있습니다.'}
          </span>
          <div className="cnt">
            <strong>
              {lectureSurveyAnswerItem !== undefined &&
              lectureSurveyAnswerItem.sentence !== undefined
                ? lectureSurveyAnswerItem.sentence?.length
                : 0}
            </strong>
            / 200
          </div>
        </div>
      </div>

      {lectureSurveyState === undefined ||
        (lectureSurveyState.state === 'Progress' &&
          lectureSurveyItem.isRequired === true &&
          lectureSurveyAnswerItem === undefined && (
            <div style={{ marginTop: '10px' }}>
              <Image
                style={{ display: 'inline-block', marginRight: '5px' }}
                src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-info-error-16-px.png"
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
