import React, { ChangeEvent, useCallback } from 'react';
import { Checkbox, Form, Icon, Radio } from 'semantic-ui-react';
import { selectSentenceAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';

interface LectureSurveyEssayViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveyEssayView: React.FC<LectureSurveyEssayViewProps> = function LectureSurveyEssayView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
}) {
  const onChangeValue = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      selectSentenceAnswer(lectureSurveyItem, e.target.value);
    },
    [lectureSurveyItem]
  );
  const { maxLength } = lectureSurveyItem;
  return (
    <LectureSurveyChoiceLayout {...lectureSurveyItem}>
      <Form>
        <Form.Field>
          <div className="ui right-top-count input">
            <span className="count">
              <span className="now">
                {lectureSurveyAnswerItem !== undefined &&
                lectureSurveyAnswerItem.sentence !== undefined
                  ? lectureSurveyAnswerItem.sentence.length
                  : 0}
              </span>
              <span className="max">{`${maxLength}`}</span>
            </span>
            <textarea
              placeholder="답변을 입력해주세요."
              value={
                lectureSurveyAnswerItem && lectureSurveyAnswerItem.sentence
              }
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
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveyEssayView;
