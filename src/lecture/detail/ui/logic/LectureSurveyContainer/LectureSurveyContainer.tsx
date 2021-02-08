import React from 'react';
import { useLectureSurvey } from '../../../service/useLectureSurvey/useLectureSurvey';
import { useLectureSurveyState } from '../../../service/useLectureSurvey/useLectureSurveyState';
import { useLectureSurveySummary } from '../../../service/useLectureSurvey/useLectureSurveySummary';
import LectureSurveyView from '../../view/LectureSurveyView/LectureSurveyView';
import { useLectureSurveyAnswerSummary } from 'lecture/detail/service/useLectureSurvey/useLectureSurveyAnswerSummary';

function LectureSurveyContainer() {
  const [lectureSurvey] = useLectureSurvey();
  const [lectureSurveyState] = useLectureSurveyState();
  const [lectureSurveySummary] = useLectureSurveySummary();
  const [lectureSurveyAnswerSummary] = useLectureSurveyAnswerSummary();
  return (
    <>
      {lectureSurvey && (
        <LectureSurveyView
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
