import { reactAlert } from '@nara.platform/accent';
import React from 'react';
import { Link } from 'react-router-dom';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
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
    title: getPolyglotText('Survey 안내', 'Survey안내'),
    message: getPolyglotText('학습 진행 후 Survey 참여 가능합니다.', '참여안내'),
  });
}

const CourseSurveyView: React.FC<SurveyViewProps> = function CourseSurveyView({
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
        <span><PolyglotText defaultString="cube 완료상태" id="Survey-CouseView-cube" /></span>
      </span>
      <span className="copy-holder">
        <span className="copy-title">
          {/* {name} */}
          <PolyglotText defaultString="Survey" id="Survey-CouseView-Title" />
        </span>
        {/* <ul className="type-info">
          <li>Survey</li>
          <li>{`${questionCount}문항`}</li>
        </ul> */}
      </span>
    </StructureLink>
  );
};

export default CourseSurveyView;
