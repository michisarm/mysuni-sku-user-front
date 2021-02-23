import React, { useCallback, useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import LectureSurvey from 'lecture/detail/viewModel/LectureSurvey';
import LectureSurveySummaryChoiceView from './LectureSurveySummaryChoiceView';
import LectureSurveySummaryEssayView from './LectureSurveySummaryEssayView';
import LectureSurveySummaryDateView from './LectureSurveySummaryDateView';
import {
  useLectureSurveySummary,
  useLectureSurveyAnswerSummaryList,
} from 'lecture/detail/store/LectureSurveyStore';
import LectureSurveyState from 'lecture/detail/viewModel/LectureSurveyState';
import LectureSurveySummaryBooleanView from './LectureSurveySummaryBooleanView';
import LectureSurveySummaryCriterionView from './LectureSurveySummaryCriterionView';
import LectureSurveySummaryMatrixView from './LectureSurveySummaryMatrixView';
import { requestLectureSurveySummary } from '../../../service/useLectureSurvey/utility/getLectureSurvey';

interface Props {
  trigger: React.ReactNode;
  lectureSurvey: LectureSurvey;
  lectureSurveyState?: LectureSurveyState;
}

const LectureSurveyResultModalView: React.FC<Props> = function LectureSurveyResultModalView({
  trigger,
  lectureSurvey,
  lectureSurveyState,
}) {
  const { title, surveyId, surveyCaseId, surveyItems } = lectureSurvey;
  const lectureSurveySummary = useLectureSurveySummary();
  const [open, setOpen] = useState<boolean>(false);
  const onOpen = useCallback(() => {
    setOpen(true);
    requestLectureSurveySummary(surveyId, surveyCaseId);
  }, [surveyId, surveyCaseId]);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onCancel = useCallback(() => {
    onClose();
  }, []);

  const respondCount = lectureSurveySummary?.respondentCount.respondentCount;

  return (
    <Modal
      className="base w1000 inner-scroll"
      open={open}
      trigger={trigger}
      onOpen={onOpen}
      onClose={onClose}
    >
      <Modal.Header>
        <span>{title}</span>
        <span>응답 {respondCount}개</span>
      </Modal.Header>
      <Modal.Content className="scrolling-60vh">
        {lectureSurvey.surveyItems.map(lectureSurveyItem => {
          if (lectureSurveyItem.type === 'Choice') {
            return (
              <>
                <LectureSurveySummaryChoiceView
                  lectureSurveyItem={lectureSurveyItem}
                  lectureSurveyAnswerItem={
                    lectureSurveyState &&
                    lectureSurveyState.answerItem.find(
                      c => c.questionNumber === lectureSurveyItem.questionNumber
                    )
                  }
                  key={lectureSurveyItem.id}
                />
              </>
            );
          }
          if (lectureSurveyItem.type === 'Essay') {
            return (
              <LectureSurveySummaryEssayView
                lectureSurveyItem={lectureSurveyItem}
                lectureSurveyAnswerItem={
                  lectureSurveyState &&
                  lectureSurveyState.answerItem.find(
                    c => c.questionNumber === lectureSurveyItem.questionNumber
                  )
                }
                key={lectureSurveyItem.id}
              />
            );
          }
          if (lectureSurveyItem.type === 'Date') {
            return (
              <LectureSurveySummaryDateView
                lectureSurveyItem={lectureSurveyItem}
                lectureSurveyAnswerItem={
                  lectureSurveyState &&
                  lectureSurveyState.answerItem.find(
                    c => c.questionNumber === lectureSurveyItem.questionNumber
                  )
                }
                key={lectureSurveyItem.id}
              />
            );
          }
          if (lectureSurveyItem.type === 'Boolean') {
            return (
              <LectureSurveySummaryBooleanView
                lectureSurveyItem={lectureSurveyItem}
                lectureSurveyAnswerItem={
                  lectureSurveyState &&
                  lectureSurveyState.answerItem.find(
                    c => c.questionNumber === lectureSurveyItem.questionNumber
                  )
                }
                key={lectureSurveyItem.id}
              />
            );
          }
          if (lectureSurveyItem.type === 'Matrix') {
            return (
              <LectureSurveySummaryMatrixView
                lectureSurveyItem={lectureSurveyItem}
                lectureSurveyAnswerItem={
                  lectureSurveyState &&
                  lectureSurveyState.answerItem.find(
                    c => c.questionNumber === lectureSurveyItem.questionNumber
                  )
                }
                key={lectureSurveyItem.id}
              />
            );
          }
          if (lectureSurveyItem.type === 'Criterion') {
            return (
              <LectureSurveySummaryCriterionView
                lectureSurveyItem={lectureSurveyItem}
                lectureSurveyAnswerItem={
                  lectureSurveyState &&
                  lectureSurveyState.answerItem.find(
                    c => c.questionNumber === lectureSurveyItem.questionNumber
                  )
                }
                key={lectureSurveyItem.id}
              />
            );
          }
        })}
      </Modal.Content>
      <Modal.Actions>
        <Button type="button" className="w190 pop d" onClick={onCancel}>
          닫기
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default LectureSurveyResultModalView;
