/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect } from 'react';
import { reactAlert } from '@nara.platform/accent';
import { Image } from 'semantic-ui-react';
import LectureSurvey from '../../../viewModel/LectureSurvey';
import LectureSurveyBooleanView from './LectureSurveyBooleanView';
import LectureSurveyChoiceView from './LectureSurveyChoiceView';
import LectureSurveyDateView from './LectureSurveyDateView';
import LectureSurveyEssayView from './LectureSurveyEssayView';
import LectureSurveyMatrixView from './LectureSurveyMatrixView';
import LectureSurveyCriterionView from './LectureSurveyCriterionView';
import LectureSurveyState from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceFixedView from './LectureSurveyChoiceFixedView';
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
import {
  getLectureParams,
  useLectureParams,
} from '../../../store/LectureParamsStore';
import {
  getActiveCourseStructureItem,
  getActiveCubeStructureItem,
} from '../../../utility/lectureStructureHelper';
import { Area } from 'tracker/model';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import LectureCommentsContainer from '../../../../category/ui/logic/LectureCommentsContainer';
import LectureSurveyReviewView from './LectureSurveyReviewView';

interface LectureSurveyViewProps {
  lectureSurvey: LectureSurvey;
  lectureSurveyState?: LectureSurveyState;
  currentMenu?: CommunityMenu;
  lectureStructure?: LectureStructure;
}

const LectureSurveyView: React.FC<LectureSurveyViewProps> =
  function LectureSurveyView({
    lectureSurvey,
    lectureSurveyState,
    currentMenu,
    lectureStructure,
  }) {
    const params = useLectureParams();
    const surveyCaseId = lectureSurvey.surveyCaseId;
    const [commentId, setCommentID] = useState('');

    const requestSaveLectureSurveyState = useCallback(() => {
      if (params !== undefined) {
        saveLectureSurveyState(params);
      } else {
        saveCommunitySurveyState();
      }
    }, [params]);

    const requestSubmitLectureSurveyState = useCallback(async(event: React.MouseEvent<HTMLButtonElement>) => {
      const { currentTarget } = event;
      try{
        currentTarget.disabled = true;
        if (params !== undefined) {
          await submitLectureSurveyState(params);
        } else {
          await submitCommunitySurveyState();
        }
      } catch (e) {
        reactAlert({
          title: getPolyglotText('?????? ??????', 'Create-DetailContentsButton-Fail'),
          message: getPolyglotText(
            '????????? ??????????????????. ?????? ??? ?????? ??????????????????.',
            'Create-DetailContentsButton-FailInfo'
          ),
        });
      }finally {
        currentTarget.disabled = false;
      }
    }, [params]);

    useEffect(() => {
      const surveyCaseService = SurveyCaseService.instance;

      if (surveyCaseId !== undefined) {
        surveyCaseService
          .findSurveyCaseFeedBack(surveyCaseId)
          .then((result) => {
            if (result !== '') {
              setCommentID(result.commentFeedbackId);
            }
          });
      }
    }, [surveyCaseId]);

    const { skProfile } = SkProfileService.instance;
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
        setSurveyTitle(
          getPolyglotText(`{value}?????? Survey`, 'Survey-Survey-Title', {
            value: name,
          })
        );
      }
    }, [lectureStructure, currentMenu?.name]);

    return (
      <>
        <div className="course-info-header" data-area={Area.CUBE_HEADER}>
          <div className="survey-header">
            <div className="survey-header-left test_ing">
              <i className="icon testHeader02" />
              Survey
            </div>
            <div
              className="survey-header-right"
              style={{ pointerEvents: 'none' }}
            >
              {lectureSurveyState !== undefined &&
                lectureSurveyState.state === 'Completed' && (
                  <button className="ui button free proceeding">
                    <PolyglotText
                      defaultString="????????????"
                      id="Survey-Survey-????????????"
                    />
                  </button>
                )}
            </div>
          </div>
        </div>

        {lectureSurveyState !== undefined &&
          (lectureSurveyState.state === 'Progress' ||
            lectureSurveyState.state === 'Start') &&
          lectureSurvey.surveyItems.map((lectureSurveyItem) => {
            if (lectureSurveyItem.type === 'Criterion') {
              return (
                <LectureSurveyCriterionView
                  lectureSurveyItem={lectureSurveyItem}
                  lectureSurveyAnswerItem={
                    lectureSurveyState &&
                    lectureSurveyState.answerItem.find(
                      (c) =>
                        c.questionNumber === lectureSurveyItem.questionNumber
                    )
                  }
                  lectureSurveyState={lectureSurveyState}
                  key={lectureSurveyItem.id}
                />
              );
            }

            if (lectureSurveyItem.type === 'Review') {
              return (
                <LectureSurveyReviewView
                  lectureSurveyItem={lectureSurveyItem}
                  lectureSurveyAnswerItem={
                    lectureSurveyState &&
                    lectureSurveyState.answerItem.find(
                      (c) =>
                        c.questionNumber === lectureSurveyItem.questionNumber
                    )
                  }
                  lectureSurveyState={lectureSurveyState}
                  key={lectureSurveyItem.id}
                />
              );
            }
            if (lectureSurveyItem.type === 'ChoiceFixed') {
              return (
                <LectureSurveyChoiceFixedView
                  lectureSurveyItem={lectureSurveyItem}
                  lectureSurveyAnswerItem={
                    lectureSurveyState &&
                    lectureSurveyState.answerItem.find(
                      (c) =>
                        c.questionNumber === lectureSurveyItem.questionNumber
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
                      (c) =>
                        c.questionNumber === lectureSurveyItem.questionNumber
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
                      (c) =>
                        c.questionNumber === lectureSurveyItem.questionNumber
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
                      (c) =>
                        c.questionNumber === lectureSurveyItem.questionNumber
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
                      (c) =>
                        c.questionNumber === lectureSurveyItem.questionNumber
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
                      (c) =>
                        c.questionNumber === lectureSurveyItem.questionNumber
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

              <p className="survey-done-txt">
                <PolyglotText
                  defaultString="?????? Survey??? ?????????????????????."
                  id="Survey-Survey-????????????"
                />
              </p>

              {lectureSurvey.userViewResult && (
                <LectureSurveyResultModalView
                  trigger={
                    <button className="ui button free pop d">
                      <PolyglotText
                        defaultString="Survey?????? ?????? ??????"
                        id="Survey-Survey-Survey??????"
                      />
                    </button>
                  }
                  lectureSurvey={lectureSurvey}
                  lectureSurveyState={lectureSurveyState}
                  currentMenu={currentMenu}
                  lectureStructure={lectureStructure}
                />
              )}
            </div>
          )}

        {lectureSurveyState !== undefined &&
          lectureSurveyState.state !== 'Completed' && (
            <div className="survey-preview">
              <button
                className="ui button fix line"
                onClick={requestSaveLectureSurveyState}
              >
                <PolyglotText defaultString="??????" id="Survey-Survey-??????" />
              </button>

              <button
                className="ui button fix bg"
                onClick={requestSubmitLectureSurveyState}
              >
                <PolyglotText defaultString="??????" id="Survey-Survey-??????" />
              </button>
            </div>
          )}

        {lectureSurveyState !== undefined &&
          lectureSurveyState.state === 'Completed' &&
          commentId !== null &&
          commentId !== undefined &&
          commentId !== '' &&
          currentMenu?.name === undefined && (
            <div className="outline">
              <LectureCommentsContainer
                commentFeedbackId={commentId}
                companyName={parsePolyglotString(skProfile.companyName)}
                departmentName={parsePolyglotString(skProfile.departmentName)}
                email={skProfile.email}
                name={JSON.stringify(skProfile.name)}
                hasPinRole={false}
              />
            </div>
          )}
        {lectureSurveyState !== undefined &&
          lectureSurveyState.state === 'Completed' &&
          commentId !== null &&
          commentId !== undefined &&
          commentId !== '' &&
          currentMenu?.name !== undefined && (
            <div className="outline">
              <LectureCommentsContainer
                commentFeedbackId={commentId}
                companyName={parsePolyglotString(skProfile.companyName)}
                departmentName={parsePolyglotString(skProfile.departmentName)}
                email={skProfile.email}
                name={JSON.stringify(skProfile.name)}
                hasPinRole={false}
              />
            </div>
          )}
      </>
    );
  };

export default LectureSurveyView;
