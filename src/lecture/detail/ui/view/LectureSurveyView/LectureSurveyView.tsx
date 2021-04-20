import React, { useCallback, useState, useEffect } from 'react';
import { Image } from 'semantic-ui-react';
import LectureSurvey from '../../../viewModel/LectureSurvey';
import LectureSurveyBooleanView from './LectureSurveyBooleanView';
import LectureSurveyChoiceView from './LectureSurveyChoiceView';
import LectureSurveyDateView from './LectureSurveyDateView';
import LectureSurveyEssayView from './LectureSurveyEssayView';
import LectureSurveyMatrixView from './LectureSurveyMatrixView';
import LectureSurveyCriterionView from './LectureSurveyCriterionView';
import LectureSurveyState from '../../../viewModel/LectureSurveyState';
import {
  saveCommunitySurveyState,
  saveLectureSurveyState,
  submitCommunitySurveyState,
  submitLectureSurveyState,
} from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import LectureSurveyResultModalView from './LectureSurveyResultModalView';
import CommunityMenu from 'community/model/CommunityMenu';
import { LectureStructure } from 'lecture/detail/viewModel/LectureStructure';
import { SurveyCaseService } from 'survey/stores';
import { SkProfileService } from 'profile/stores';
import { CommentList, CommunityCommentList } from '@nara.drama/feedback';
import {
  getLectureParams,
  useLectureParams,
} from '../../../store/LectureParamsStore';
import { useLocation } from 'react-router';
import {
  getActiveCourseStructureItem,
  getActiveCubeStructureItem,
} from '../../../utility/lectureStructureHelper';
import { Area } from 'tracker/model';

interface LectureSurveyViewProps {
  lectureSurvey: LectureSurvey;
  lectureSurveyState?: LectureSurveyState;
  currentMenu?: CommunityMenu;
  lectureStructure?: LectureStructure;
}

const LectureSurveyView: React.FC<LectureSurveyViewProps> = function LectureSurveyView({
  lectureSurvey,
  lectureSurveyState,
  currentMenu,
  lectureStructure,
}) {
  const params = useLectureParams();
  const surveyCaseId = lectureSurveyState?.surveyCaseId;
  const [commentId, setCommentID] = useState('');

  const requestSaveLectureSurveyState = useCallback(() => {
    if (params !== undefined) {
      saveLectureSurveyState(params);
    } else {
      saveCommunitySurveyState();
    }
  }, [params, currentMenu]);

  const requestSubmitLectureSurveyState = useCallback(() => {
    if (params !== undefined) {
      submitLectureSurveyState(params);
    } else {
      submitCommunitySurveyState();
    }
  }, [params, currentMenu]);

  useEffect(() => {
    const surveyCaseService = SurveyCaseService.instance;
    if (surveyCaseId !== undefined) {
      surveyCaseService.findSurveyCaseFeedBack(surveyCaseId).then(result => {
        if (result !== '') {
          setCommentID(result.commentFeedbackId);
        }
      });
    }
  }, [surveyCaseId]);

  const skProfileService = SkProfileService.instance;
  const { skProfile } = skProfileService;
  const { member } = skProfile;
  const [surveyTitle, setSurveyTitle] = useState<string>();
  useEffect(() => {
    if (currentMenu?.name !== undefined) {
      setSurveyTitle(currentMenu?.name);
    } else {
      const params = getLectureParams();
      if (params === undefined) {
        return;
      }
      const name =
        getActiveCubeStructureItem(params.pathname)?.name ||
        getActiveCourseStructureItem()?.name ||
        '';
      setSurveyTitle(`${name}과정 Survey`);
    }
  }, [lectureStructure, currentMenu?.name]);

  return (
    <>
      <div
        className="course-info-header"
        data-area={Area.CUBE_HEADER}
      >
        <div className="survey-header">
          <div className="survey-header-left test_ing width50">
            {surveyTitle}
          </div>
          <div className="survey-header-right">
            {lectureSurveyState !== undefined &&
              lectureSurveyState.state === 'Completed' && (
                <button className="ui button free proceeding">참여완료</button>
              )}
          </div>
        </div>
      </div>

      {lectureSurveyState !== undefined &&
        (lectureSurveyState.state === 'Progress' ||
          lectureSurveyState.state === 'Start') &&
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
        })}

      {lectureSurveyState !== undefined &&
        lectureSurveyState.state === 'Completed' && (
          <div className="course-info-ing">
            <Image
              style={{ display: 'inline-block' }}
              src={`${process.env.PUBLIC_URL}/images/all/icon-survey-done.png`}
            />

            <p className="survey-done-txt">이미 Survey에 응답하였습니다.</p>

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

      {lectureSurveyState !== undefined &&
        lectureSurveyState.state !== 'Completed' && (
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

      {lectureSurveyState !== undefined &&
        lectureSurveyState.state === 'Completed' &&
        commentId !== null &&
        commentId !== undefined &&
        commentId !== '' && (
          <div className="outline">
            <CommentList
              feedbackId={commentId}
              menuType=""
              hideCamera
              name={member.name}
              email={member.email}
              companyName={member.company}
              departmentName={member.department}
            />
          </div>
        )}
    </>
  );
};

export default LectureSurveyView;
