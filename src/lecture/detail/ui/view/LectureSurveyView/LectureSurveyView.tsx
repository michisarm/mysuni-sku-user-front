import React, {useState,useCallback,useEffect } from 'react';

import LectureSurvey from '../../../viewModel/LectureSurvey';
import LectureSurveyBooleanView from './LectureSurveyBooleanView';
import LectureSurveyChoiceView from './LectureSurveyChoiceView';
import LectureSurveyDateView from './LectureSurveyDateView';
import LectureSurveyEssayView from './LectureSurveyEssayView';
import LectureSurveyMatrixView from './LectureSurveyMatrixView';
import LectureSurveyCriterionView from './LectureSurveyCriterionView';
import LectureSurveyState from '../../../viewModel/LectureSurveyState';
import { SurveyCaseService } from 'survey/stores';

import {
  saveLectureSurveyState,
  submitLectureSurveyState,
} from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { useLectureRouterParams } from '../../../service/useLectureRouterParams';
import {CommunityCommentList} from '@nara.drama/feedback';
import { param } from 'jquery';
import { SkProfileService } from 'profile/stores';


interface LectureSurveyViewProps {
  lectureSurvey: LectureSurvey;
  lectureSurveyState?: LectureSurveyState;
}
const LectureSurveyView: React.FC<LectureSurveyViewProps> = function LectureSurveyView({
  lectureSurvey,
  lectureSurveyState
}) {

  const params = useLectureRouterParams();
  const { title } = lectureSurvey;
  const surveyCaseId  = lectureSurveyState?.surveyCaseId;
  const [commentId, setCommentID] = useState('');
  useEffect(() => {
    const surveyCaseService  = SurveyCaseService.instance;
    if(surveyCaseId !== undefined){
      surveyCaseService.findSurveyCaseFeedBack(surveyCaseId)
      .then((result) => {
        console.log("result======",result);
        if(result !== "" ){
          setCommentID(result.commentFeedbackId);
        }
      });
    }
  }, [surveyCaseId]);

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


  const skProfileService  = SkProfileService.instance;
  const { skProfile } = skProfileService;
  const { member } = skProfile;
  

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
            {lectureSurveyState !== undefined &&
              lectureSurveyState.state === 'Completed' && (
                <button className="ui button free complete p18">
                  참여완료
                </button>
              )}
          </div>
        </div>
      </div>
      {lectureSurvey.surveyItems.map(lectureSurveyItem => {
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
              key={lectureSurveyItem.id}
            />
          );
        }
        return null;
      })}
      {lectureSurveyState === undefined ||
        (lectureSurveyState.state !== 'Completed' && (
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
        ))}
        {lectureSurveyState !== undefined &&
          lectureSurveyState.state === 'Completed' && (
              (commentId !== "" && (
                <CommunityCommentList
                  feedbackId={commentId}
                  menuType=""
                  hideCamera
                  name={member.name}
                  email={member.email}
                  companyName={member.company}
                  departmentName={member.department}
                />
          ))
        )}

    </>
  );
};

export default LectureSurveyView;
