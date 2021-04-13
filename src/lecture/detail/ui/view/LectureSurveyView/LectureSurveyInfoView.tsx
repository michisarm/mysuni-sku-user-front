import React, { useCallback, useEffect, useState } from 'react';
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
  const params = useLectureParams();
  const [surveyTitleInfo, setSurveyTitleInfo] = useState<string>();
  const [surveyInfoText, setSurveyInfoText] = useState<string>();

  const requestStartLectureSurveyState = useCallback(() => {
    if (params === undefined) {
      return;
    }
    startLectureSurveyState();
  }, [params]);

  const questionCount = lectureSurvey.surveyItems.length;

  useEffect(() => {
    const params = getLectureParams();
    if (params === undefined) {
      return;
    }
    if (currentMenu?.name !== undefined) {
      setSurveyTitleInfo(currentMenu?.name);
      setSurveyInfoText('의 ');
    } else {
      const name =
        getActiveCourseStructureItem()?.name ||
        getActiveCubeStructureItem(params.pathname)?.name ||
        '';
      setSurveyTitleInfo(name);
      setSurveyInfoText('과정');
    }
  }, [lectureStructure, currentMenu?.name]);

  if (lectureSurveyState && lectureSurveyState.state === 'None') {
    startLectureSurveyState();
  }

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

              <h1 className="survey_done">참여완료</h1>

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
