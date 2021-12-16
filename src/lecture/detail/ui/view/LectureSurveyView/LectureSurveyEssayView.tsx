import React, { ChangeEvent, useCallback } from 'react';
import { Form, Icon, Image } from 'semantic-ui-react';
import { selectSentenceAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import LectureSurveyState from '../../../viewModel/LectureSurveyState';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

interface LectureSurveyEssayViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
  lectureSurveyState?: LectureSurveyState;
}

const LectureSurveyEssayView: React.FC<LectureSurveyEssayViewProps> =
  function LectureSurveyEssayView({
    lectureSurveyItem,
    lectureSurveyAnswerItem,
    lectureSurveyState,
  }) {
    const { maxLength } = lectureSurveyItem;

    const onChangeValue = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length <= (maxLength || 0)) {
          selectSentenceAnswer(lectureSurveyItem, e.target.value);
        } else if (
          (maxLength || 0) === 0 &&
          e.target.value.length >= (maxLength || 0)
        ) {
          selectSentenceAnswer(lectureSurveyItem, e.target.value);
        }
      },
      [lectureSurveyItem]
    );

    let textAreaValue =
      lectureSurveyAnswerItem && lectureSurveyAnswerItem.sentence;
    if (textAreaValue === null) {
      textAreaValue = '';
    }
    return (
      <LectureSurveyChoiceLayout {...lectureSurveyItem}>
        <Form>
          <Form.Field>
            <div style={{ margin: '20px 0' }}>
              {lectureSurveyItem.image && <img src={lectureSurveyItem.image} />}
            </div>
            <div className="ui right-top-count input">
              <span className="count">
                <span className="now">
                  {lectureSurveyAnswerItem !== undefined &&
                  lectureSurveyAnswerItem.sentence !== undefined
                    ? lectureSurveyAnswerItem.sentence?.length
                    : 0}
                </span>
                &nbsp;&#47;&nbsp;
                <span className="max">{`${maxLength}`}</span>
              </span>
              <textarea
                placeholder={getPolyglotText(
                  '답변을 입력해주세요.',
                  'survey-placeholder-답변입력'
                )}
                value={textAreaValue}
                onChange={onChangeValue}
                readOnly={false}
              />
              <Icon className="clear link" />
              <span className="validation">
                {`You can enter up to ${maxLength} characters.`}
              </span>
            </div>
          </Form.Field>
        </Form>

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
                    id="survey-필수항목-alert5"
                  />
                </span>
              </div>
            ))}
      </LectureSurveyChoiceLayout>
    );
  };

export default LectureSurveyEssayView;
