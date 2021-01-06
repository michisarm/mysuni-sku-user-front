import React, { useEffect } from 'react';
import { useLectureRouterParams } from '../../service/useLectureRouterParams';
import { getLectureSurvey } from '../../service/useLectureSurvey/utility/getLectureSurvey';
import LectureSurveyContainer from './LectureSurveyContainer/LectureSurveyContainer';

function LectureSurveyPage() {
  const params = useLectureRouterParams();
  useEffect(() => {
    if (params !== undefined) {
      getLectureSurvey(params);
    }
  }, [params]);
  return <LectureSurveyContainer />;
}

export default LectureSurveyPage;
