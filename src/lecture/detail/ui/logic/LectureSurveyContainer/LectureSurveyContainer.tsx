import React, { useEffect } from 'react';
import { useLectureSurvey } from '../../../service/useLectureSurvey/useLectureSurvey';
import { useLectureSurveyState } from '../../../service/useLectureSurvey/useLectureSurveyState';
import LectureSurveyView from '../../view/LectureSurveyView/LectureSurveyView';
import LectureSurveyInfoView from '../../view/LectureSurveyView/LectureSurveyInfoView';
import { useCurrentCommunitySurveyMenu } from '../../../../../community/utility/communityRouterParamsHelper';

function LectureSurveyContainer() {
  const [lectureSurvey] = useLectureSurvey();
  const [lectureSurveyState] = useLectureSurveyState();
  const currentMenu = useCurrentCommunitySurveyMenu();

  return (
    <>
      {lectureSurvey &&
        (lectureSurveyState?.state === 'Start' ||
          lectureSurveyState?.state === 'Progress' ||
          lectureSurveyState?.state === 'Completed') && (
          <LectureSurveyView
            lectureSurvey={lectureSurvey}
            lectureSurveyState={lectureSurveyState}
            currentMenu={currentMenu}
          />
        )}
      {lectureSurvey &&
        (lectureSurveyState?.state === 'None' ||
          lectureSurveyState?.state === 'Finish') && (
          <LectureSurveyInfoView
            lectureSurvey={lectureSurvey}
            lectureSurveyState={lectureSurveyState}
          />
        )}
    </>
  );
}

export default LectureSurveyContainer;
