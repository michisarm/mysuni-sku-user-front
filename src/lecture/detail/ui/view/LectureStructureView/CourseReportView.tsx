import { reactAlert } from '@nara.platform/accent';
import React from 'react';
import { Link } from 'react-router-dom';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { State } from '../../../viewModel/LectureState';
import StructureLink from './StructureLink';

interface ReportViewProps {
  name: string;
  state?: State;
  activated?: boolean;
  path: string;
  can: boolean;
}

function cannotAlert() {
  reactAlert({
    title: getPolyglotText('Report 안내', 'Report-CouseView-Report안내'),
    message: getPolyglotText('학습 진행 후 Report 참여 가능합니다.', 'Report-CouseView-참여안내'),
  });
}

const CourseReportView: React.FC<ReportViewProps> = function CourseReportView({
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
      className={`btn-state-course ${activated ? 'act-on' : ''}`}
    >
      <span
        className={`label-state-cube ${state === 'Progress' ? 'l-step5' : ''} ${
          state === 'Completed' ? 'complete' : ''
        }`}
      >
        <span><PolyglotText defaultString="cube 완료상태" id="Report-CouseView-cube" /></span>
      </span>
      <span className="copy-holder">
        <span className="copy-title">{name}</span>
        <ul className="type-info">
          <li><PolyglotText defaultString="Report" id="Report-CouseView-Title" /></li>
        </ul>
      </span>
    </StructureLink>
  );
};

export default CourseReportView;
