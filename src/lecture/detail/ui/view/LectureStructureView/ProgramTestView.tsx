import React from 'react';
import { Link } from 'react-router-dom';
import { State } from '../../../viewModel/LectureState';

interface ProgramTestViewProps {
  name: string;
  state?: State;
  activated?: boolean;
  path: string;
}

const ProgramTestView: React.FC<ProgramTestViewProps> = function ProgramTestView({
  name,
  state = 'None',
  activated = false,
  path,
}) {
  return (
    <Link to={path} className={`btn-single-cube ${activated ? 'act-on' : ''}`}>
      <span className="label-type n-test">Test</span>
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

export default ProgramTestView;
