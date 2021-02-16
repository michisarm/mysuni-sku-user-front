import React from 'react';
import { useLectureSurvey } from '../../../service/useLectureSurvey/useLectureSurvey';
import { useLectureSurveyState } from '../../../service/useLectureSurvey/useLectureSurveyState';
import { useLectureSurveySummary } from '../../../service/useLectureSurvey/useLectureSurveySummary';
import LectureSurveyView from '../../view/LectureSurveyView/LectureSurveyView';
import { useLectureSurveyAnswerSummary } from 'lecture/detail/service/useLectureSurvey/useLectureSurveyAnswerSummary';
import LectureSurveyInfoView from '../../view/LectureSurveyView/LectureSurveyInfoView';

function LectureSurveyContainer() {
  const [lectureSurvey] = useLectureSurvey();
  const [lectureSurveyState] = useLectureSurveyState();
  const [lectureSurveySummary] = useLectureSurveySummary();
  const [lectureSurveyAnswerSummary] = useLectureSurveyAnswerSummary();
  return (
    <>
      {lectureSurvey && (lectureSurveyState?.state === 'Start' || lectureSurveyState?.state === 'Progress' || lectureSurveyState?.state === 'Finish') && (
        <LectureSurveyView
          lectureSurvey={lectureSurvey}
          lectureSurveyState={lectureSurveyState}
          lectureSurveySummary={lectureSurveySummary}
          lectureSurveyAnswerSummary={lectureSurveyAnswerSummary}
        />
      )}
      {lectureSurvey && (lectureSurveyState?.state === 'None' || lectureSurveyState?.state === 'Completed') && (
        <LectureSurveyInfoView
          lectureSurvey={lectureSurvey}
          lectureSurveyState={lectureSurveyState}
          lectureSurveySummary={lectureSurveySummary}
          lectureSurveyAnswerSummary={lectureSurveyAnswerSummary}
        />
      )}
    </>
  );
}

export default LectureSurveyContainer;
