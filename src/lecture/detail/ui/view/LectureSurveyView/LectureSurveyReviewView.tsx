import { LectureSurveyItem } from 'lecture/detail/viewModel/LectureSurvey';
import React, { useState, useCallback, Fragment, ChangeEvent } from 'react';
import { CheckboxProps, Radio } from 'semantic-ui-react';
import {
  selectChoiceAnswer,
  selectSentenceAnswer,
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

export default function LectureSurveyReviewView(prop: CommonUseType) {
  const { lectureSurveyAnswerItem, lectureSurveyItem, lectureSurveyState } =
    prop;
  const [placeholderText, setPlaceholderText] = useState('답변을 입력해주세요');
  const onChangeValue = useCallback(
    (_: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
      if (data.value === undefined) {
        return;
      }
      selectChoiceAnswer(lectureSurveyItem, data.value);
      if (data.value !== 1 && data.value !== 2) {
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
      selectSentenceAnswer(lectureSurveyItem, e.target.value);
    },
    [lectureSurveyItem]
  );

  const { canMultipleAnswer, choices } = lectureSurveyItem;
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

      <div className="rev-edit">
        <div className="edit-wrapper">
          <textarea
            rows={3}
            placeholder={placeholderText}
            value={lectureSurveyAnswerItem && lectureSurveyAnswerItem.sentence}
            onChange={onChangeTextValue}
            readOnly={false}
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
                ? lectureSurveyAnswerItem.sentence.length
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
