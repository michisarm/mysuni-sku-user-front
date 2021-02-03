import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import LectureSurvey from 'lecture/detail/viewModel/LectureSurvey';
import LectureSurveySummaryChoiceView from './LectureSurveySummaryChoiceView';
import LectureSurveySummary from 'lecture/detail/viewModel/LectureSurveySummary';

interface Props {
  trigger: React.ReactNode,
  lectureSurvey: LectureSurvey;
  lectureSurveySummary?: LectureSurveySummary;
}

const LectureSurveyResultModalView: React.FC<Props> = function LectureSurveyResultModalView({
  trigger,
  lectureSurvey,
  lectureSurveySummary
}) {
  const { title } = lectureSurvey;
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

  return (
    <Modal className="base w1000 inner-scroll" open={open} trigger={trigger} onOpen={onOpen} onClose={onClose}>
      <Modal.Header>
        <span>{title}</span>        
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

      })}

      </Modal.Content>
      <Modal.Actions>
        <Button type="button" className="w190 pop d" onClick={onCancel}>닫기</Button>
      </Modal.Actions>
    </Modal>
  );
}

export default LectureSurveyResultModalView;
