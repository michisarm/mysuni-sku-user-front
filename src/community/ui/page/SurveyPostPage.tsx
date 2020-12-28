import React, { useEffect } from 'react';
import { useLectureRouterParams } from '../../../lecture/detail/service/useLectureRouterParams';
import { getLectureSurvey } from '../../../lecture/detail/service/useLectureSurvey/utility/getLectureSurvey';
import LectureSurveyContainer from '../../../lecture/detail/ui/logic/LectureSurveyContainer/LectureSurveyContainer';

function SurveyPostPage() {
  const params = useLectureRouterParams();
  useEffect(() => {
    if (params !== undefined) {
      getLectureSurvey(params);
    }
  }, [params]);
  return <LectureSurveyContainer />;
}

export default SurveyPostPage;
