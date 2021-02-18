import React, { ChangeEvent, useCallback } from 'react';
import { Checkbox, Form, Icon, Radio } from 'semantic-ui-react';
import { selectSentenceAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import LectureSurveyState from '../../../viewModel/LectureSurveyState';
import LectureSurveySummary from 'lecture/detail/viewModel/LectureSurveySummary';
import LectureSurveyAnswerSummary from 'lecture/detail/viewModel/LectureSurveyAnswerSummary';
import { getLectureSurveyAnswerSummaryList } from 'lecture/detail/store/LectureSurveyStore';

interface LectureSurveyEssayViewProps {
  lectureSurveyItem: LectureSurveyItem;
}

const LectureSurveySummaryEssayView: React.FC<LectureSurveyEssayViewProps> = function LectureSurveySummaryEssayView({
  lectureSurveyItem,
}) {
  const onChangeValue = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      selectSentenceAnswer(lectureSurveyItem, e.target.value);
    },
    [lectureSurveyItem]
  );
  const { maxLength } = lectureSurveyItem;
  const answerList = getLectureSurveyAnswerSummaryList();

  return (
    <LectureSurveyChoiceLayout {...lectureSurveyItem}>
      <Form>
        <Form.Field>
          <div className="ui right-top-count input">
            {answerList?.map(answer=>answer.summaryItems.sentences)}
          </div>
        </Form.Field>
      </Form>
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveySummaryEssayView;
