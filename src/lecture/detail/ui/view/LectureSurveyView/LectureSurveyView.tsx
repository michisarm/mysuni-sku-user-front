import React from 'react';
import LectureSurvey from '../../../viewModel/LectureSurvey';
import LectureSurveyBooleanView from './LectureSurveyBooleanView';
import LectureSurveyChoiceView from './LectureSurveyChoiceView';
import LectureSurveyDateView from './LectureSurveyDateView';
import LectureSurveyEssayView from './LectureSurveyEssayView';
import LectureSurveyMatrixView from './LectureSurveyMatrixView';
import LectureSurveyCriterionView from './LectureSurveyCriterionView';
import LectureSurveyState from '../../../viewModel/LectureSurveyState';
import {
  saveLectureSurveyState,
  submitLectureSurveyState,
} from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';

interface LectureSurveyViewProps {
  lectureSurvey: LectureSurvey;
  lectureSurveyState?: LectureSurveyState;
}

const LectureSurveyView: React.FC<LectureSurveyViewProps> = function LectureSurveyView({
  lectureSurvey,
  lectureSurveyState,
}) {
  const { title } = lectureSurvey;
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
      <div className="survey-preview">
        <button className="ui button fix line" onClick={saveLectureSurveyState}>
          저장
        </button>
        <button className="ui button fix bg" onClick={submitLectureSurveyState}>
          제출
        </button>
      </div>
    </>
  );
};

export default LectureSurveyView;
