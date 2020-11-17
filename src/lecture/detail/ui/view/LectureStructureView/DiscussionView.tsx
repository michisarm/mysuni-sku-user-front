import React from 'react';
import { Link } from 'react-router-dom';
import { State } from '../../../viewModel/LectureState';

interface DiscussionViewProps {
  name: string;
  state?: State;
  activated?: boolean;
  path: string;
}

const DiscussionView: React.FC<DiscussionViewProps> = function DiscussionView({
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
      <span
        className={`label-state-cube ${state === 'Progress' ? 'l-step5' : ''} ${
          state === 'Completed' ? 'complete' : ''
        }`}
      >
        <span>cube 완료상태</span>
      </span>
      <span className="copy-holder">
        <span className="copy-title">{name}</span>
        <ul className="type-info">
          <li>토론하기</li>
        </ul>
      </span>
    </Link>
  );
};

export default DiscussionView;
