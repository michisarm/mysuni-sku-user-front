import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { requestLectureSurveyFromSurvey } from '../../../lecture/detail/service/useLectureSurvey/utility/getLectureSurvey';
import LectureSurveyContainer from '../../../lecture/detail/ui/logic/LectureSurveyContainer/LectureSurveyContainer';
import { useCurrentCommunitySurveyMenu } from '../../utility/communityRouterParamsHelper';

interface Params {
  communityId: string;
  menuId?: string;
  postId?: string;
  menuType?: string;
}
function SurveyPostPage() {
  const { communityId, postId, menuId, menuType } = useParams<Params>();
  window.location.href = `/suni-community/community/${communityId}/survey/${menuId}`;
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
