import React from 'react';
import { useLectureSurvey } from '../../../service/useLectureSurvey/useLectureSurvey';
import { useLectureSurveyState } from '../../../service/useLectureSurvey/useLectureSurveyState';
import { useLectureSurveySummary } from '../../../service/useLectureSurvey/useLectureSurveySummary';
import LectureSurveyView from '../../view/LectureSurveyView/LectureSurveyView';

function LectureSurveyContainer() {
  const [lectureSurvey] = useLectureSurvey();
  const [lectureSurveyState] = useLectureSurveyState();
  const [lectureSurveySummary] = useLectureSurveySummary();
  return (
    <>
      {lectureSurvey && (
        <LectureSurveyView
          lectureSurvey={lectureSurvey}
          lectureSurveyState={lectureSurveyState}
          lectureSurveySummary={lectureSurveySummary}
        />
      )}
    </>
  );
}

export default LectureSurveyContainer;
