import { reactAlert } from '@nara.platform/accent';
import React from 'react';
import { Link } from 'react-router-dom';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { State } from '../../../viewModel/LectureState';
import StructureLink from './StructureLink';

interface TestViewProps {
  name: string;
  state?: State;
  activated?: boolean;
  path: string;
  can: boolean;
}

function cannotAlert() {
  reactAlert({
    title: getPolyglotText('Test 안내', 'Test-View-Test안내'),
    message: getPolyglotText('학습 진행 후 Test 참여 가능합니다.', 'Test-View-참여안내'),
  });
}

const TestView: React.FC<TestViewProps> = function TestView({
  name,
  state = 'None',
  activated = false,
  path,
  can,
}) {
  return (
    <StructureLink
      can={can}
      to={path}
      onCannotClick={cannotAlert}
      className={`btn-state-course l-depth ${activated ? 'act-on' : ''}`}
    >
      <span
        className={`label-state-cube ${state === 'Progress' ? 'l-step5' : ''} ${
          state === 'Completed' ? 'complete' : ''
        }`}
      >
        <span><PolyglotText defaultString="cube 완료상태" id="Test-View-cube" /></span>
      </span>
      <span className="copy-holder">
        <span className="copy-title"><PolyglotText defaultString="Test" id="Test-View-Title" /></span>
        <ul className="type-info">
          {/* <li>Test</li> */}
          {/* <li>{`${questionCount}문항`}</li> */}
        </ul>
      </span>
    </StructureLink>
  );
};

export default TestView;
