import React, { useEffect } from 'react';
import { requestLectureSurveyFromSurvey } from '../../../lecture/detail/service/useLectureSurvey/utility/getLectureSurvey';
import LectureSurveyContainer from '../../../lecture/detail/ui/logic/LectureSurveyContainer/LectureSurveyContainer';
import { useCurrentCommunitySurveyMenu } from '../../utility/communityRouterParamsHelper';

function SurveyPostPage() {
  const communitySurveyMenu = useCurrentCommunitySurveyMenu();
  useEffect(() => {
    if (communitySurveyMenu !== undefined) {
      const { surveyId, surveyCaseId } = communitySurveyMenu;
      requestLectureSurveyFromSurvey(surveyId, surveyCaseId);
    }
  }, [communitySurveyMenu]);
  return <LectureSurveyContainer />;
}

export default SurveyPostPage;
