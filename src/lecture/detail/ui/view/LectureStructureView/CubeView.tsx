import React from 'react';
import { Link } from 'react-router-dom';
import { timeToHourMinuteFormat } from '../../../../../shared/helper/dateTimeHelper';
import CubeType from '../../../model/CubeType';
import { State } from '../../../viewModel/LectureState';
import StructureLink from './StructureLink';

export function parseCubeType(cubeType: CubeType) {
  switch (cubeType) {
    case 'ClassRoomLecture':
      return 'Classroom';
    case 'ELearning':
      return 'E-Learning';
    case 'Community':
      return 'Task';
    default:
      break;
  }
  return cubeType;
}

interface CubeViewProps {
  name: string;
  state?: State;
  activated?: boolean;
  learningTime: number;
  cubeType: CubeType;
  path: string;
  can: boolean;
}

const CubeView: React.FC<CubeViewProps> = function CubeView({
  name,
  state = 'None',
  activated = false,
  learningTime,
  cubeType,
  path,
  can,
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
          <li>{parseCubeType(cubeType)}</li>
          <li>{timeToHourMinuteFormat(learningTime)}</li>
        </ul>
      </span>
    </Link>
  );
};

export default CubeView;
