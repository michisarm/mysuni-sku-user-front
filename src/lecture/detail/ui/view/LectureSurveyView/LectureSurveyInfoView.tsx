import React, { useCallback } from 'react';
import { Button } from 'semantic-ui-react';
import LectureSurvey from '../../../viewModel/LectureSurvey';
import LectureSurveyState, { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import { useLectureRouterParams } from '../../../service/useLectureRouterParams';
import LectureSurveyResultModalView from './LectureSurveyResultModalView';
import LectureSurveySummary from 'lecture/detail/viewModel/LectureSurveySummary';
import LectureSurveyAnswerSummary from 'lecture/detail/viewModel/LectureSurveyAnswerSummary';
import {
  startLectureSurveyState,
  submitLectureSurveyState,
  finishLectureSurveyState
} from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';

interface LectureSurveyInfoViewProps {
  lectureSurvey: LectureSurvey;
  lectureSurveyState?: LectureSurveyState;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveyInfoView: React.FC<LectureSurveyInfoViewProps> = function LectureSurveyInfoView({
  lectureSurvey,
  lectureSurveyState,
  lectureSurveyAnswerItem
}) {
  const params = useLectureRouterParams();
  const { title } = lectureSurvey;

  const requestStartLectureSurveyState = useCallback(() => {
    if (params === undefined) {
      return;
    }
    startLectureSurveyState();
  }, [params]);

  const requestSubmitLectureSurveyState = useCallback(() => {
    if (params === undefined) {
      return;
    }
    submitLectureSurveyState(params.lectureParams, params.pathname);
  }, [params]);

  const requestFinishLectureSurveyState = (() => {
    finishLectureSurveyState();
  });
  return (
    <>
      <div className="course-info-header">
        <div className="survey-header">
          <div className="survey-header-left">Survey Information</div>
          <div className="survey-header-right">
            
            {lectureSurveyState !== undefined && lectureSurveyState.state === 'None' && (
                <button className="ui button free proceeding p18" onClick={requestStartLectureSurveyState}>
                  응시하기
                </button>
              )}
              {lectureSurveyState !== undefined && lectureSurveyState.state === 'Finish' && (
                <LectureSurveyResultModalView 
                  trigger={<Button icon className="ui button free proceeding p18">통계보기</Button>}
                  lectureSurvey={lectureSurvey}
                  lectureSurveyState={lectureSurveyState}
                />
              )}
          </div>
        </div>
      </div>
      {lectureSurveyState !== undefined && lectureSurveyState.state == 'None' && (
        <>
          
          Survey 설명: {title}<br />
          문항개수: 총 {lectureSurvey.surveyItems.length}문항<br />
          해당 Survey에 참여를 원하시면, 우측 상단 응시하기 버튼을 클릭해주세요.
        </>
      )}
      {lectureSurveyState !== undefined && lectureSurveyState.state === 'Finish' && (
        <>
          Survey 설명: {title}<br />
          문항개수: 총 {lectureSurvey.surveyItems.length}문항<br />
          해당 Survey에 참여완료 하셨습니다. 통계보기 버튼을 클릭하면 Survey 통계화면이 조회됩니다.

        </>
      )}
    </>
  );
};

export default LectureSurveyInfoView;
