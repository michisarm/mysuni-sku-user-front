import React from 'react';
import { Link } from 'react-router-dom';
import { State } from '../../../viewModel/LectureState';

interface ProgramDiscussionViewProps {
  name: string;
  state?: State;
  activated?: boolean;
  path: string;
}

const ProgramDiscussionView: React.FC<ProgramDiscussionViewProps> = function ProgramDiscussionView({
  name,
  state = 'None',
  activated = false,
  path,
}) {
  return (
    <Link
      to={path}
      className={`btn-single-cube ${activated ? 'act-on' : ''}`}
      onClick={() => window.scrollTo({ top: 0 })}
    >
      <span className="label-type n-discuss">토론하기</span>
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

export default ProgramDiscussionView;
