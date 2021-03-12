import React, { useEffect } from 'react';
import { useLectureRouterParams } from '../../service/useLectureRouterParams';
import { requestLectureSurvey } from '../../service/useLectureSurvey/utility/getLectureSurvey';
import LectureSurveyContainer from './LectureSurveyContainer/LectureSurveyContainer';

function LectureSurveyPage() {
  const params = useLectureRouterParams();
  useEffect(() => {
    if (params !== undefined) {
      requestLectureSurvey(params);
    }
  }, [params]);
  return <LectureSurveyContainer />;
}

export default LectureSurveyPage;
