import React, { useCallback } from 'react';
import { Button } from 'semantic-ui-react';
import LectureSurvey from '../../../viewModel/LectureSurvey';
import LectureSurveyState from '../../../viewModel/LectureSurveyState';
import { useLectureRouterParams } from '../../../service/useLectureRouterParams';
import LectureSurveyResultModalView from './LectureSurveyResultModalView';
import { startLectureSurveyState } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { useCurrentCommunitySurveyMenu } from 'community/utility/communityRouterParamsHelper';
import CommunityMenu from 'community/model/CommunityMenu';
import { LectureStructure } from 'lecture/detail/viewModel/LectureStructure';

interface LectureSurveyInfoViewProps {
  lectureSurvey: LectureSurvey;
  lectureSurveyState?: LectureSurveyState;
  currentMenu?: CommunityMenu;
  lectureStructure?: LectureStructure;
}

const LectureSurveyInfoView: React.FC<LectureSurveyInfoViewProps> = function LectureSurveyInfoView({
  lectureSurvey,
  lectureSurveyState,
  currentMenu,
  lectureStructure,
}) {
  const params = useLectureRouterParams();

  const requestStartLectureSurveyState = useCallback(() => {
    if (params === undefined) {
      return;
    }
    startLectureSurveyState();
  }, [params]);

  // const requestFinishLectureSurveyState = () => {
  //   finishLectureSurveyState();
  // };

  const questionCount = lectureSurvey.surveyItems.length;
  const surveyCommunityTitle = currentMenu?.surveyInformation;
  const surveyCourseTitle = lectureStructure?.course?.name;
  const surveyCubeTitle = lectureStructure?.cube?.name;
  const surveyTitleInfo =
    surveyCommunityTitle === undefined
      ? `${surveyCourseTitle || surveyCubeTitle}과정의 Survey입니다.`
      : `${surveyCommunityTitle}의 Survey입니다.`;

  return (
    <>
      <div className="course-info-header">
        <div className="survey-header">
          <div className="survey-header-left">Survey Information</div>
          <div className="survey-header-right">
            {lectureSurveyState !== undefined &&
              lectureSurveyState.state === 'None' && (
                <button
                  className="ui button free proceeding p18"
                  onClick={requestStartLectureSurveyState}
                >
                  응시하기
                </button>
              )}
            {lectureSurveyState !== undefined &&
              lectureSurveyState.state === 'Finish' && (
                <LectureSurveyResultModalView
                  trigger={
                    <Button icon className="ui button free proceeding p18">
                      통계보기
                    </Button>
                  }
                  lectureSurvey={lectureSurvey}
                  lectureSurveyState={lectureSurveyState}
                />
              )}
          </div>
        </div>
      </div>
      Survey 설명: {surveyTitleInfo}
      <br />
      문항개수: 총 {questionCount}문항
      <br />
      {lectureSurveyState !== undefined &&
        lectureSurveyState.state == 'None' && (
          <>
            해당 Survey에 참여를 원하시면, 우측 상단 응시하기 버튼을
            클릭해주세요.
          </>
        )}
      {lectureSurveyState !== undefined &&
        lectureSurveyState.state === 'Finish' && (
          <>
            해당 Survey에 참여완료 하셨습니다. 통계보기 버튼을 클릭하면 Survey
            통계화면이 조회됩니다.
          </>
        )}
    </>
  );
};

export default LectureSurveyInfoView;
