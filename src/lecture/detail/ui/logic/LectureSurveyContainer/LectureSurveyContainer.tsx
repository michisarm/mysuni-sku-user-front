import React from 'react';
import { useLectureSurvey } from '../../../service/useLectureSurvey/useLectureSurvey';
import { useLectureSurveyState } from '../../../service/useLectureSurvey/useLectureSurveyState';
import LectureSurveyView from '../../view/LectureSurveyView/LectureSurveyView';

function LectureSurveyContainer() {
  const [lectureSurvey] = useLectureSurvey();
  const [lectureSurveyState] = useLectureSurveyState();
  return (
    <>
      {lectureSurvey && (
        <LectureSurveyView
          lectureSurvey={lectureSurvey}
          lectureSurveyState={lectureSurveyState}
        />
      )}
    </>
  );
}

export default LectureSurveyContainer;
