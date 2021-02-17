import React, { ChangeEvent, useCallback } from 'react';
import { Checkbox, Form, Icon, Radio } from 'semantic-ui-react';
import { selectSentenceAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import LectureSurveyState from '../../../viewModel/LectureSurveyState';
import LectureSurveySummary from 'lecture/detail/viewModel/LectureSurveySummary';
import LectureSurveyAnswerSummary from 'lecture/detail/viewModel/LectureSurveyAnswerSummary';

interface LectureSurveyEssayViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveySummary?: LectureSurveySummary;
  lectureSurveyAnswerSummary?: LectureSurveyAnswerSummary;
}

const LectureSurveySummaryEssayView: React.FC<LectureSurveyEssayViewProps> = function LectureSurveySummaryEssayView({
  lectureSurveyItem,
  lectureSurveyAnswerSummary
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
            dd
            

          </div>
        </Form.Field>
      </Form>
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveySummaryEssayView;
