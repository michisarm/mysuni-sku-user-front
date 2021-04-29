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
      className={`btn-state-course ${activated ? 'act-on' : ''}`}
      onClick={() => window.scrollTo({ top: 0 })}
    >
      <span className="label-state-cube n-discuss">
        <span>토론하기</span>
      </span>
      <span className="copy-holder">
        <span className="copy-title">{name}</span>
        <ul className="type-info">
          <li>Talk</li>
        </ul>
      </span>
    </Link>
  );
};

export default ProgramDiscussionView;
