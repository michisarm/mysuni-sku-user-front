import { reactAlert } from '@nara.platform/accent';
import React from 'react';
import { Link } from 'react-router-dom';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { State } from '../../../viewModel/LectureState';
import StructureLink from './StructureLink';

interface ProgramReportViewProps {
  name: string;
  state?: State;
  activated?: boolean;
  path: string;
  can: boolean;
}

function cannotAlert() {
  reactAlert({
    title: getPolyglotText('Report 안내', 'Report-ProgramView-Report안내'),
    message: getPolyglotText('학습 진행 후 Report 참여 가능합니다.', 'Report-ProgramView-참여안내'),
  });
}

const ProgramReportView: React.FC<ProgramReportViewProps> = function ProgramReportView({
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
      <span className="label-type n-report">Report</span>
      <span className="copy">{name}</span>
      <span
        className={`label-state-learning ${
          state === 'Progress' ? 'proceeding' : ''
        } ${state === 'Completed' ? 'complete' : ''}`}
      >
        <span><PolyglotText defaultString="진행상태" id="Report-ProgramView-진행상태" /></span>
      </span>
    </StructureLink>
  );
};

export default ProgramReportView;
