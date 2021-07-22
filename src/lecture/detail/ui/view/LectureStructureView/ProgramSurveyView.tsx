import { reactAlert } from '@nara.platform/accent';
import React from 'react';
import { Link } from 'react-router-dom';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { State } from '../../../viewModel/LectureState';
import StructureLink from './StructureLink';

interface ProgramSurveyViewProps {
  name: string;
  state?: State;
  activated?: boolean;
  path: string;
  can: boolean;
}

function cannotAlert() {
  reactAlert({
    title: getPolyglotText('Survey 안내', 'Survey-ProgramView-Survey안내'),
    message: getPolyglotText('학습 진행 후 Survey 참여 가능합니다.', 'Survey-ProgramView-참여안내'),
  });
}

const ProgramSurveyView: React.FC<ProgramSurveyViewProps> = function ProgramSurveyView({
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
      <span className="label-type n-survey">Survey</span>
      {/* <span className="copy">{name}</span> */}
      <span
        className={`label-state-learning ${
          state === 'Progress' ? 'proceeding' : ''
        } ${state === 'Completed' ? 'complete' : ''}`}
      >
        <span><PolyglotText defaultString="진행상태" id="Survey-ProgramView-진행상태" /></span>
      </span>
    </StructureLink>
  );
};

export default ProgramSurveyView;
