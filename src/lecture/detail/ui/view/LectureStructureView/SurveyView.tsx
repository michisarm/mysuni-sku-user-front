import { reactAlert } from '@nara.platform/accent';
import React from 'react';
import { State } from '../../../viewModel/LectureState';
import StructureLink from './StructureLink';

interface SurveyViewProps {
  name: string;
  state?: State;
  activated?: boolean;
  path: string;
  can: boolean;
}

function cannotAlert() {
  reactAlert({
    title: 'Survey 안내',
    message: '학습 진행 후 Survey 참여 가능합니다.',
  });
}

const SurveyView: React.FC<SurveyViewProps> = function SurveyView({
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
        <span>cube 완료상태</span>
      </span>
      <span className="copy-holder">
        <span className="copy-title">Survey</span>
      </span>
    </StructureLink>
  );
};

export default SurveyView;
