import React from 'react';
import { useLectureSurvey } from '../../../service/useLectureSurvey/useLectureSurvey';
import LectureSurveyView from '../../view/LectureSurveyView/LectureSurveyView';

function LectureSurveyContainer() {
  const [lectureSurvey] = useLectureSurvey();
  return (
    <>{lectureSurvey && <LectureSurveyView lectureSurvey={lectureSurvey} />}</>
  );
}

export default LectureSurveyContainer;
