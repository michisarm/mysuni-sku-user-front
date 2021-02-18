import React, { useCallback, useEffect, useState } from 'react';
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
import LectureSurveyEssayView from './LectureSurveyEssayView';
import LectureSurveySummaryBooleanView from './LectureSurveySummaryBooleanView';
import LectureSurveySummaryMatrixView from './LectureSurveySummaryMatrixView';

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
  const { title } = lectureSurvey;
  const lectureSurveySummary = useLectureSurveySummary();
  const answerList = useLectureSurveyAnswerSummaryList();
  const [open, setOpen] = useState<boolean>(false);
  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onCancel = useCallback(() => {
    onClose();
  }, []);

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
        <span>
          응답 {lectureSurveySummary?.respondentCount.respondentCount}개
        </span>
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
