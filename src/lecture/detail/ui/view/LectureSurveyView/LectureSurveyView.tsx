import React from 'react';
import LectureSurvey from '../../../viewModel/LectureSurvey';
import LectureSurveyBooleanView from './LectureSurveyBooleanView';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import LectureSurveyChoiceView from './LectureSurveyChoiceView';
import LectureSurveyDateView from './LectureSurveyDateView';
import LectureSurveyEssayView from './LectureSurveyEssayView';
import LectureSurveyMatrixView from './LectureSurveyMatrixView';

interface LectureSurveyViewProps {
  lectureSurvey: LectureSurvey;
}

const LectureSurveyView: React.FC<LectureSurveyViewProps> = function LectureSurveyView({
  lectureSurvey,
}) {
  const { title } = lectureSurvey;
  return (
    <>
      <div className="course-info-header">
        <div className="survey-header">
          <div className="survey-header-left">{title}</div>
          <div className="survey-header-right">
            {/* complete - 진행완료 , submit - 진행전, proceeding - 진행중 */}
            <button className="ui button free submit p18">과제제출</button>
            <button className="ui button free proceeding p18">검수중</button>
            <button className="ui button free complete p18">참여완료</button>
          </div>
        </div>
      </div>
      {lectureSurvey.surveyItems.map(item => {
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
    </>
  );
};

export default LectureSurveyView;
