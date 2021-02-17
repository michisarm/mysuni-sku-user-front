import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import LectureSurvey from 'lecture/detail/viewModel/LectureSurvey';
import LectureSurveySummaryChoiceView from './LectureSurveySummaryChoiceView';
import LectureSurveySummary from 'lecture/detail/viewModel/LectureSurveySummary';
import LectureSurveySummaryEssayView from './LectureSurveySummaryEssayView';
import LectureSurveyAnswerSummary from 'lecture/detail/viewModel/LectureSurveyAnswerSummary';
import { getLectureSurveyAnswerList } from 'lecture/detail/store/LectureSurveyStore';

interface Props {
  trigger: React.ReactNode,
  lectureSurvey: LectureSurvey;
  lectureSurveySummary?: LectureSurveySummary;
  lectureSurveyAnswerSummary?: LectureSurveyAnswerSummary;
}

const LectureSurveyResultModalView: React.FC<Props> = function LectureSurveyResultModalView({
  trigger,
  lectureSurvey,
  lectureSurveySummary,
  lectureSurveyAnswerSummary
}) {
  const { title } = lectureSurvey;
  const answerList = getLectureSurveyAnswerList();
  const [open, setOpen] = useState<boolean>(false);
  const onOpen = useCallback(() => {
    setOpen(true)
  },[])

  const onClose = useCallback(() => {
    setOpen(false)
  },[])

  const onCancel = useCallback(() => {
    onClose()
  }, []);


  // useEffect(()=>{console.log('list',list);},[list]);
  useEffect(() => {
    console.log('list111',answerList);
  }, [answerList]);


  // console.log(lectureSurveyAnswerSummary?.surveyAnswers)

  return (
    <Modal className="base w1000 inner-scroll" open={open} trigger={trigger} onOpen={onOpen} onClose={onClose}>
      <Modal.Header>
        <span>{title}</span>
        <span>응답 {lectureSurveySummary?.respondentCount.respondentCount}개</span>
      </Modal.Header>
      <Modal.Content className="scrolling-60vh">
      {lectureSurvey.surveyItems.map(lectureSurveyItem => {

        if (lectureSurveyItem.type === 'Choice') {
          return (
            <>
              <LectureSurveySummaryChoiceView
                lectureSurveyItem={lectureSurveyItem}
                lectureSurveySummary={lectureSurveySummary}
                key={lectureSurveyItem.id}
              />
            </>
          );
        }
        if (lectureSurveyItem.type === 'Essay') {
          return (
            <LectureSurveySummaryEssayView
              lectureSurveyItem={lectureSurveyItem}              
              lectureSurveySummary={lectureSurveySummary}
              lectureSurveyAnswerSummary={lectureSurveyAnswerSummary}
              key={lectureSurveyItem.id}
            />
          );
        }

      })}

      </Modal.Content>
      <Modal.Actions>
        <Button type="button" className="w190 pop d" onClick={onCancel}>닫기</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default LectureSurveyResultModalView;
