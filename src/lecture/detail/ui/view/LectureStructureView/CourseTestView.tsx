import { reactAlert } from '@nara.platform/accent';
import React from 'react';
import { Link } from 'react-router-dom';
import { State } from '../../../viewModel/LectureState';
import StructureLink from './StructureLink';

interface TestViewProps {
  name: string;
  state?: State;
  activated?: boolean;
  questionCount: number;
  path: string;
  can: boolean;
}

function cannotAlert() {
  reactAlert({
    title: 'Test 안내',
    message: '학습 진행 후 Test 참여 가능합니다.',
  });
}

const CourseTestView: React.FC<TestViewProps> = function CourseTestView({
  name,
  state = 'None',
  activated = false,
  questionCount,
  path,
  can,
}) {
  return (
    <StructureLink
      can={can}
      to={path}
      onCannotClick={cannotAlert}
      className={`btn-state-course ${activated ? 'act-on' : ''}`}
    >
      <span
        className={`label-state-cube ${state === 'Progress' ? 'l-step5' : ''} ${
          state === 'Completed' ? 'complete' : ''
        }`}
      >
        <span>cube 완료상태</span>
      </span>
      <span className="copy-holder">
        <span className="copy-title">Test</span>
        <ul className="type-info">
          {/* <li>Test</li> */}
          {/* <li>{`${questionCount}문항`}</li> */}
        </ul>
      </span>
    </StructureLink>
  );
};

export default CourseTestView;
