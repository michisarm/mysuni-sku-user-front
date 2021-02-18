import React, { useCallback } from 'react';
import { Button } from 'semantic-ui-react';
import LectureSurvey from '../../../viewModel/LectureSurvey';
import LectureSurveyBooleanView from './LectureSurveyBooleanView';
import LectureSurveyChoiceView from './LectureSurveyChoiceView';
import LectureSurveyDateView from './LectureSurveyDateView';
import LectureSurveyEssayView from './LectureSurveyEssayView';
import LectureSurveyMatrixView from './LectureSurveyMatrixView';
import LectureSurveyCriterionView from './LectureSurveyCriterionView';
import LectureSurveyState, { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import {
  saveLectureSurveyState,
  submitLectureSurveyState
} from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { useLectureRouterParams } from '../../../service/useLectureRouterParams';
import LectureSurveyResultModalView from './LectureSurveyResultModalView';


interface LectureSurveyViewProps {
  lectureSurvey: LectureSurvey;
  lectureSurveyState?: LectureSurveyState;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveyView: React.FC<LectureSurveyViewProps> = function LectureSurveyView({
  lectureSurvey,
  lectureSurveyState,
  lectureSurveyAnswerItem
}) {
  const params = useLectureRouterParams();
  const { title } = lectureSurvey;

  const requestSaveLectureSurveyState = useCallback(() => {
    if (params === undefined) {
      return;
    }
    saveLectureSurveyState(params.lectureParams, params.pathname);
  }, [params]); 

  const requestSubmitLectureSurveyState = useCallback(() => {
    if (params === undefined) {
      return;
    }
    submitLectureSurveyState(params.lectureParams, params.pathname);
  }, [params]);
  
  return (
    <>
      <div className="course-info-header">
        <div className="survey-header">
          <div className="survey-header-left">{title}</div>
          <div className="survey-header-right">
            {lectureSurveyState !== undefined &&
              lectureSurveyState.state === 'Progress' && (
                <button className="ui button free proceeding p18">
                  진행중
                </button>
              )}
          </div>
        </div>
      </div>

      {lectureSurveyState !== undefined &&
      (lectureSurveyState.state === 'Progress' || lectureSurveyState.state === 'Start') && (
        lectureSurvey.surveyItems.map(lectureSurveyItem => {
          if (lectureSurveyItem.type === 'Criterion') {
            return (
              <LectureSurveyCriterionView
                lectureSurveyItem={lectureSurveyItem}
                lectureSurveyAnswerItem={
                  lectureSurveyState &&
                  lectureSurveyState.answerItem.find(
                    c => c.questionNumber === lectureSurveyItem.questionNumber
                  )
                }
                lectureSurveyState={lectureSurveyState}
                key={lectureSurveyItem.id}
              />
            );
          }
          if (lectureSurveyItem.type === 'Choice') {
            return (
              <LectureSurveyChoiceView
                lectureSurveyItem={lectureSurveyItem}
                lectureSurveyAnswerItem={
                  lectureSurveyState &&
                  lectureSurveyState.answerItem.find(
                    c => c.questionNumber === lectureSurveyItem.questionNumber
                  )
                }
                lectureSurveyState={lectureSurveyState}
                key={lectureSurveyItem.id}
              />
            );
          }
          if (lectureSurveyItem.type === 'Essay') {
            return (
              <LectureSurveyEssayView
                lectureSurveyItem={lectureSurveyItem}
                lectureSurveyAnswerItem={
                  lectureSurveyState &&
                  lectureSurveyState.answerItem.find(
                    c => c.questionNumber === lectureSurveyItem.questionNumber
                  )
                }
                lectureSurveyState={lectureSurveyState}
                key={lectureSurveyItem.id}
              />
            );
          }
          if (lectureSurveyItem.type === 'Date') {
            return (
              <LectureSurveyDateView
                lectureSurveyItem={lectureSurveyItem}
                lectureSurveyAnswerItem={
                  lectureSurveyState &&
                  lectureSurveyState.answerItem.find(
                    c => c.questionNumber === lectureSurveyItem.questionNumber
                  )
                }
                lectureSurveyState={lectureSurveyState}
                key={lectureSurveyItem.id}
              />
            );
          }
          if (lectureSurveyItem.type === 'Boolean') {
            return (
              <LectureSurveyBooleanView
                lectureSurveyItem={lectureSurveyItem}
                lectureSurveyAnswerItem={
                  lectureSurveyState &&
                  lectureSurveyState.answerItem.find(
                    c => c.questionNumber === lectureSurveyItem.questionNumber
                  )
                }
                lectureSurveyState={lectureSurveyState}
                key={lectureSurveyItem.id}
              />
            );
          }
          if (lectureSurveyItem.type === 'Matrix') {
            return (
              <LectureSurveyMatrixView
                lectureSurveyItem={lectureSurveyItem}
                lectureSurveyAnswerItem={
                  lectureSurveyState &&
                  lectureSurveyState.answerItem.find(
                    c => c.questionNumber === lectureSurveyItem.questionNumber
                  )
                }
                lectureSurveyState={lectureSurveyState}
                key={lectureSurveyItem.id}
              />
            );
          }
          return null;
        })
      )}

      
    {lectureSurveyState !== undefined && lectureSurveyState.state == 'Finish' && (
        <>
          이미 Survey에 응답하였습니다.<br />
          통계보기 버튼을 통해 Survey 통계를 확인해보세요.<br />
          <LectureSurveyResultModalView 
            trigger={<Button icon className="ui button free proceeding p18">통계보기</Button>}
            lectureSurvey={lectureSurvey}
            lectureSurveyState={lectureSurveyState}
          />

          {/* {requestSubmitLectureSurveyState()} */}
        </>
      )}

      {lectureSurveyState !== undefined && lectureSurveyState.state !== 'Finish' && (
        <div className="survey-preview">
          <button
            className="ui button fix line"
            onClick={requestSaveLectureSurveyState}
          >
            저장
          </button>
          <button
            className="ui button fix bg"
            onClick={requestSubmitLectureSurveyState}
          >
            제출
          </button>
        </div>
     )}
    </>
  );
};

export default LectureSurveyView;
