import React, { ChangeEvent, useCallback } from 'react';
import { Checkbox, Form, Icon, Radio } from 'semantic-ui-react';
import { selectSentenceAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import LectureSurvey, {
  LectureSurveyItem,
} from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import { useLectureSurveyAnswerSummaryList } from 'lecture/detail/store/LectureSurveyStore';
import { useLectureSurvey } from 'lecture/detail/service/useLectureSurvey/useLectureSurvey';

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
  const answerList = useLectureSurveyAnswerSummaryList();
  const sentenceList =
    (lectureSurveyItem.visible !== undefined &&
      lectureSurveyItem.visible === true &&
      answerList
        ?.filter(f => f.answerItemType === 'Essay')
        .map(answer => `${answer.summaryItems.sentences}`)) ||
    '';

  return (
    <LectureSurveyChoiceLayout {...lectureSurveyItem}>
      {lectureSurveyAnswerItem && lectureSurveyAnswerItem.sentence}
      <br />
      {sentenceList}
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveyEssayView;
