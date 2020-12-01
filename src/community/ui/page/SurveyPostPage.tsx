import React, { useEffect } from 'react'
import { useLectureRouterParams } from '../../../lecture/detail/service/useLectureRouterParams';
import { getLectureSurvey } from '../../../lecture/detail/service/useLectureSurvey/utility/getLectureSurvey';
import LectureSurveyContainer from '../../../lecture/detail/ui/logic/LectureSurveyContainer/LectureSurveyContainer';
import LectureDetailLayout from '../../../lecture/detail/ui/view/LectureDetailLayout';
import { useCommunityHome } from '../../store/CommunityHomeStore';

function SurveyPostPage() {
  const params = useLectureRouterParams();
  useEffect(() => {
    if (params !== undefined) {
      console.log(params);
      getLectureSurvey(params);
    }
  }, [params]);
  return (
    // <LectureDetailLayout>
      <LectureSurveyContainer />
    // </LectureDetailLayout>
  );
}

export default SurveyPostPage