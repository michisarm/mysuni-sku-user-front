import React, { useEffect } from 'react';
import { useLectureRouterParams } from '../../service/useLectureRouterParams';
import { getLectureSurvey } from '../../service/useLectureSurvey/utility/getLectureSurvey';
import LectureDetailLayout from '../view/LectureDetailLayout';
import LectureSurveyContainer from './LectureSurveyContainer/LectureSurveyContainer';

function LectureSurveyPage() {
  const params = useLectureRouterParams();
  useEffect(() => {
    if (params !== undefined) {
      getLectureSurvey(params);
    }
  }, [params]);
  return (
    <LectureDetailLayout>
      <LectureSurveyContainer />
    </LectureDetailLayout>
  );
}

export default LectureSurveyPage;
