import { reactAlert } from '@nara.platform/accent';
import React from 'react';
import { Link } from 'react-router-dom';
import { State } from '../../../viewModel/LectureState';
import StructureLink from './StructureLink';

interface ProgramTestViewProps {
  name: string;
  state?: State;
  activated?: boolean;
  path: string;
  can: boolean;
}

function cannotAlert() {
  reactAlert({
    title: 'Test 안내',
    message: '학습 진행 후 Test 참여 가능합니다.',
  });
}

const ProgramTestView: React.FC<ProgramTestViewProps> = function ProgramTestView({
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
      className={`btn-single-cube ${activated ? 'act-on' : ''}`}
    >
      <span className="label-type n-test">Test</span>
      <span className="copy">{name}</span>
      <span
        className={`label-state-learning ${
          state === 'Progress' ? 'proceeding' : ''
        } ${state === 'Completed' ? 'complete' : ''}`}
      >
        <span>진행상태</span>
      </span>
    </StructureLink>
  );
};

export default ProgramTestView;
