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
      {lectureSurvey.surveyItems.map(item => {
        if (item.type === 'Criterion') {
          return <LectureSurveyCriterionView {...item} key={item.id} />;
        }
        if (item.type === 'Choice') {
          return <LectureSurveyChoiceView {...item} key={item.id} />;
        }
        if (item.type === 'Essay') {
          return <LectureSurveyEssayView {...item} key={item.id} />;
        }
        if (item.type === 'Date') {
          return <LectureSurveyDateView {...item} key={item.id} />;
        }
        if (item.type === 'Boolean') {
          return <LectureSurveyBooleanView {...item} key={item.id} />;
        }
        if (item.type === 'Matrix') {
          return <LectureSurveyMatrixView {...item} key={item.id} />;
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
