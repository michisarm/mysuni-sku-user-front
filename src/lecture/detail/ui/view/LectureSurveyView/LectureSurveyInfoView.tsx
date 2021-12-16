import React, { useEffect, useState } from 'react';
import { Image } from 'semantic-ui-react';
import LectureSurvey from '../../../viewModel/LectureSurvey';
import LectureSurveyState from '../../../viewModel/LectureSurveyState';
import { startLectureSurveyState } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import CommunityMenu from 'community/model/CommunityMenu';
import { LectureStructure } from 'lecture/detail/viewModel/LectureStructure';
import LectureSurveyResultModalView from './LectureSurveyResultModalView';
import {
  getLectureParams,
  useLectureParams,
} from '../../../store/LectureParamsStore';
import {
  getActiveCourseStructureItem,
  getActiveCubeStructureItem,
} from '../../../utility/lectureStructureHelper';
import { Area } from 'tracker/model';

interface LectureSurveyInfoViewProps {
  lectureSurvey: LectureSurvey;
  lectureSurveyState?: LectureSurveyState;
  currentMenu?: CommunityMenu;
  lectureStructure?: LectureStructure;
}

const LectureSurveyInfoView: React.FC<LectureSurveyInfoViewProps> =
  function LectureSurveyInfoView({
    lectureSurvey,
    lectureSurveyState,
    currentMenu,
    lectureStructure,
  }) {
    const params = useLectureParams();
    const [surveyTitleInfo, setSurveyTitleInfo] = useState<string>();
    const [surveyInfoText, setSurveyInfoText] = useState<string>();
    const questionCount = lectureSurvey.surveyItems.length;

    useEffect(() => {
      const params = getLectureParams();

      if (currentMenu?.name !== undefined) {
        setSurveyTitleInfo(currentMenu?.name);
        setSurveyInfoText('의 ');
      } else if (params !== undefined) {
        const name =
          getActiveCourseStructureItem()?.name ||
          getActiveCubeStructureItem(params.pathname)?.name ||
          '';
        setSurveyTitleInfo(name);
        setSurveyInfoText('과정');
      }
    }, [
      lectureStructure,
      currentMenu?.name,
      lectureSurvey.userViewResult,
      lectureSurveyState?.state,
    ]);

    if (
      lectureSurveyState &&
      lectureSurveyState.state === 'None' &&
      currentMenu?.name === undefined
    ) {
      // 학습화면에서 접근(intro화면이 필요없어서 'Start'로 변경)한 경우를 의미
      startLectureSurveyState();
    }

    return (
      <>
        <div className="course-info-header" data-area={Area.CUBE_HEADER}>
          <div className="survey-header">
            <div className="survey-header-left test_ing">
              <i className="icon testHeader02">
                <span className="blind">Survey Information</span>
              </i>
              Survey Information
            </div>
            {lectureSurveyState !== undefined &&
              lectureSurveyState.state === 'Finish' && (
                <div
                  className="survey-header-right"
                  style={{ pointerEvents: 'none' }}
                >
                  <button className="ui button free proceeding">
                    참여완료
                  </button>
                </div>
              )}
          </div>
        </div>

        {lectureSurveyState !== undefined &&
          lectureSurveyState.state === 'None' && (
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
                  onClick={startLectureSurveyState}
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

                <h1 className="survey_done">참여완료</h1>

                {lectureSurvey.userViewResult && (
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
                )}
              </div>
            </>
          )}
      </>
    );
  };

export default LectureSurveyInfoView;
