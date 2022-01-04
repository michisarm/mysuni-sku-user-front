import { LectureSurveyItem } from 'lecture/detail/viewModel/LectureSurvey';
import React, { useState, useCallback, Fragment, ChangeEvent } from 'react';
import { CheckboxProps, Icon, Radio } from 'semantic-ui-react';
import {
  selectReviewChoiceAnswer,
  selectReviewSentenceAnswer,
} from 'lecture/detail/service/useLectureSurvey/utility/saveLectureSurveyState';
import LectureSurveyState, {
  LectureSurveyAnswerItem,
} from 'lecture/detail/viewModel/LectureSurveyState';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';

interface CommonUseType {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
  lectureSurveyState?: LectureSurveyState;
}

export default function LectureSurveyReviewView(props: CommonUseType) {
  const { lectureSurveyAnswerItem, lectureSurveyItem, lectureSurveyState } =
    props;
  const [placeholderText, setPlaceholderText] = useState(
    getPolyglotText(
      '과정에 대한 만족도를 선택해주세요.',
      'survey-review-placeholderDefault'
    )
  );
  const onChangeValue = useCallback(
    (_: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
      if (data.value === undefined) {
        return;
      }
      selectReviewChoiceAnswer(lectureSurveyItem, data.value);
      if (data.value === 4 || data.value === 5) {
        const goodPointText = getPolyglotText(
          '어떤 점이 특별히 좋았나요? 자세한 학습후기를 남겨주세요.',
          'survey-review-placeholder45'
        );
        setPlaceholderText(goodPointText);
      } else {
        const badPointText = getPolyglotText(
          '어떤 점을 개선하면 좋을까요? 개선 포인트를 남겨주세요.',
          'survey-review-placeholder123'
        );
        setPlaceholderText(badPointText);
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
                label={getPolyglotText('전혀 아니다', 'survey-review-Notatall')}
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
                label={getPolyglotText('아니다', 'survey-review-Disagree')}
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
                label={getPolyglotText('보통이다', 'survey-review-Average')}
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
                label={getPolyglotText('그렇다', 'survey-review-Agree')}
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
                label={getPolyglotText(
                  '매우 그렇다',
                  'survey-review-Highlyagree'
                )}
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
            readOnly={false}
          />
        </div>
        <div className="rev-info">
          <span>
            {getPolyglotText(
              '입력해주신 내용은 과정 평가 리뷰로 활용될 수 있습니다.',
              'survey-review-evaluation'
            )}
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
            <div className="rev-noti">
              <Icon className="error16" />
              <span>
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
