import React, { useEffect } from 'react';
import { requestLectureSurvey } from '../../service/useLectureSurvey/utility/getLectureSurvey';
import { useLectureParams } from '../../store/LectureParamsStore';
import LectureSurveyContainer from './LectureSurveyContainer/LectureSurveyContainer';

function LectureSurveyPage() {
  const params = useLectureParams();
  useEffect(() => {
    if (params !== undefined) {
      requestLectureSurvey();
    }
  }, [params]);
  return <LectureSurveyContainer />;
}

export default LectureSurveyPage;
