import React, { useCallback } from 'react';
import { Image } from 'semantic-ui-react';
import LectureSurvey from '../../../viewModel/LectureSurvey';
import LectureSurveyState from '../../../viewModel/LectureSurveyState';
import { useLectureRouterParams } from '../../../service/useLectureRouterParams';
import { startLectureSurveyState } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import CommunityMenu from 'community/model/CommunityMenu';
import { LectureStructure } from 'lecture/detail/viewModel/LectureStructure';
import LectureSurveyResultModalView from './LectureSurveyResultModalView';

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

  const questionCount = lectureSurvey.surveyItems.length;
  const surveyCommunityTitle = currentMenu?.name;
  const surveyCourseTitle = lectureStructure?.course?.name;
  const surveyCubeTitle = lectureStructure?.cube?.name;
  const surveyTitleInfo =
    surveyCommunityTitle === undefined
      ? `${surveyCourseTitle || surveyCubeTitle}`
      : `${surveyCommunityTitle}`;

  const surveyInfoText = surveyCommunityTitle === undefined ? `과정의 ` : `의 `;

  return (
    <>
      <div className="course-info-header">
        <div className="survey-header">
          <div className="survey-header-left test_ing">
            <i className="icon testHeader02">
              <span className="blind">Survey Information</span>
            </i>
            Survey Information
          </div>
          {lectureSurveyState !== undefined &&
            lectureSurveyState.state === 'Finish' && (
              <div className="survey-header-right">
                <button className="ui button free proceeding">참여완료</button>
              </div>
            )}
        </div>
      </div>

      {lectureSurveyState !== undefined && lectureSurveyState.state === 'None' && (
        <>
          <div className="course-info-ing">
            <h1>
              {surveyTitleInfo}
              <span>{surveyInfoText} Survey 입니다.</span>
            </h1>
            <h3>문항개수</h3>
            <p>
              총 <strong>{questionCount}문항</strong>
            </p>
          </div>
          <div className="course-info-bottom">
            <button
              className="ui button fix bg"
              onClick={requestStartLectureSurveyState}
            >
              참여하기
            </button>
          </div>
        </>
      )}

      {lectureSurveyState !== undefined &&
        lectureSurveyState.state === 'Finish' && (
          <>
            <div className="course-info-ing">
              <Image
                style={{ display: 'inline-block' }}
                src={`${process.env.PUBLIC_URL}/images/all/icon-survey-done.png`}
              />

              <p className="survey-done-txt">이미 Survey에 응답하였습니다.</p>

              <div className="course-info-bottom">
                <LectureSurveyResultModalView
                  trigger={
                    <button className="ui button free pop d">
                      Survey결과 통계 보기
                    </button>
                  }
                  lectureSurvey={lectureSurvey}
                  lectureSurveyState={lectureSurveyState}
                  currentMenu={currentMenu}
                  lectureStructure={lectureStructure}
                />
              </div>
            </div>
          </>
        )}
    </>
  );
};

export default LectureSurveyInfoView;
