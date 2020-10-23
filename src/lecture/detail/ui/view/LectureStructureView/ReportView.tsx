import React from 'react';
import { Link } from 'react-router-dom';
import { State } from '../../../viewModel/LectureStructure';

interface ReportViewProps {
  name: string;
  state?: State;
  activated?: boolean;
  path: string;
}

const ReportView: React.FC<ReportViewProps> = function ReportView({
  name,
  state = 'None',
  activated = false,
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
          <li>Report</li>
        </ul>
      </span>
    </Link>
  );
};

export default ReportView;
