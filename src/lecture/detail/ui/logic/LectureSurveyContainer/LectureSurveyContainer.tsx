import React from 'react';
import { useLectureSurvey } from '../../../service/useLectureSurvey/useLectureSurvey';
import { useLectureSurveyState } from '../../../service/useLectureSurvey/useLectureSurveyState';
import LectureSurveyView from '../../view/LectureSurveyView/LectureSurveyView';
import LectureSurveyInfoView from '../../view/LectureSurveyView/LectureSurveyInfoView';
import { useLectureSurveySummary } from 'lecture/detail/store/LectureSurveyStore';

function LectureSurveyContainer() {
  const [lectureSurvey] = useLectureSurvey();
  const [lectureSurveyState] = useLectureSurveyState();
  return (
    <>
      {lectureSurvey && (lectureSurveyState?.state === 'Start' || lectureSurveyState?.state === 'Progress' || lectureSurveyState?.state === 'Finish') && (
        <LectureSurveyView
          lectureSurvey={lectureSurvey}
          lectureSurveyState={lectureSurveyState}
        />
      )}
      {lectureSurvey && (lectureSurveyState?.state === 'None' || lectureSurveyState?.state === 'Completed') && (
        <LectureSurveyInfoView
          lectureSurvey={lectureSurvey}
          lectureSurveyState={lectureSurveyState}
        />
      )}
    </>
  );
}

export default LectureSurveyContainer;
