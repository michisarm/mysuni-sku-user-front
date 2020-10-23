import React from 'react';
import { Link } from 'react-router-dom';
import { State } from '../../../viewModel/LectureStructure';

interface SurveyViewProps {
  name: string;
  state?: State;
  activated?: boolean;
  questionCount: number;
  path: string;
}

const SurveyView: React.FC<SurveyViewProps> = function SurveyView({
  name,
  state = 'None',
  activated = false,
  questionCount,
  path,
}) {
  return (
    <Link to={path} className={`btn-state-course ${activated ? 'act-on' : ''}`}>
      <span
        className={`label-state-cube ${
          state === 'Progress' ? 'proceeding' : ''
        } ${state === 'Completed' ? 'complete' : ''}`}
      >
        <span>cube 완료상태</span>
      </span>
      <span className="copy-holder">
        <span className="copy-title">{name}</span>
        <ul className="type-info">
          <li>Survey</li>
          <li>{`${questionCount}문항`}</li>
        </ul>
      </span>
    </Link>
  );
};

export default SurveyView;
