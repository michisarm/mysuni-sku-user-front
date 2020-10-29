import React from 'react';
import { Link } from 'react-router-dom';
import { State } from '../../../viewModel/LectureState';

interface ProgramReportViewProps {
  name: string;
  state?: State;
  activated?: boolean;
  path: string;
}

const ProgramReportView: React.FC<ProgramReportViewProps> = function ProgramReportView({
  name,
  state = 'None',
  activated = false,
  path,
}) {
  return (
    <Link to={path} className={`btn-single-cube ${activated ? 'act-on' : ''}`}>
      <span className="label-type n-report">Report</span>
      <span className="copy">{name}</span>
      <span
        className={`label-state-learning ${
          state === 'Progress' ? 'proceeding' : ''
        } ${state === 'Completed' ? 'complete' : ''}`}
      >
        <span>진행상태</span>
      </span>
    </Link>
  );
};

export default ProgramReportView;
