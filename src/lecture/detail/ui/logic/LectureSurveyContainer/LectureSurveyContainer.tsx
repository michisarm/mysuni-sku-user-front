import React from 'react';
import { useLectureSurvey } from '../../../service/useLectureSurvey/useLectureSurvey';
import { useLectureSurveyState } from '../../../service/useLectureSurvey/useLectureSurveyState';
import LectureSurveyView from '../../view/LectureSurveyView/LectureSurveyView';
import LectureSurveyInfoView from '../../view/LectureSurveyView/LectureSurveyInfoView';
import { useCurrentCommunitySurveyMenu } from '../../../../../community/utility/communityRouterParamsHelper';
import { useLectureStructure } from '../../../store/LectureStructureStore';

function LectureSurveyContainer() {
  const [lectureSurvey] = useLectureSurvey();
  const [lectureSurveyState] = useLectureSurveyState();
  const currentMenu = useCurrentCommunitySurveyMenu();
  const lectureStructure = useLectureStructure();

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
            lectureStructure={lectureStructure}
          />
        )}
      {lectureSurvey &&
        (lectureSurveyState?.state === 'None' ||
          lectureSurveyState?.state === 'Finish') && (
          <LectureSurveyInfoView
            lectureSurvey={lectureSurvey}
            lectureSurveyState={lectureSurveyState}
            currentMenu={currentMenu}
            lectureStructure={lectureStructure}
          />
        )}
    </>
  );
}

export default LectureSurveyContainer;
