import React from 'react';
import { reactAlert } from '@nara.platform/accent';
import { timeToHourMinuteFormat } from '../../../../../shared/helper/dateTimeHelper';
import CubeType from '../../../model/CubeType';
import { State } from '../../../viewModel/LectureState';
import StructureLink from './StructureLink';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

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

function cannotAlert() {
  reactAlert({
    title: '안내',
    message: '선수 학습 완료 후 진행이 가능합니다.',
  });
}

interface CubeViewProps {
  name: string;
  state?: State;
  activated?: boolean;
  learningTime: number;
  cubeType: CubeType;
  path: string;
  can: boolean;
  duration?: number;
}

const DurationableCubeView: React.FC<CubeViewProps> = function DurationableCubeView({
  name,
  state = 'None',
  activated = false,
  learningTime,
  cubeType,
  path,
  can,
  duration = 0,
}) {
  const step = Math.ceil(duration / 10);
  return (
    <StructureLink
      className={`btn-state-course ${activated ? 'act-on' : ''}`}
      can={can}
      to={path}
      onClick={() => window.scrollTo({ top: 0 })}
      onCannotClick={cannotAlert}
    >
      <span
        className={`label-state-cube ${
          state === 'Progress' ? `l-step${step}` : ''
        } ${state === 'Completed' ? 'complete' : ''}`}
      >
        <span>
          <PolyglotText defaultString="cube 완료상태" id="Cube-Durationable-완료상태" />
        </span>
      </span>
      <span className="copy-holder">
        <span className="copy-title">{name}</span>
        <ul className="type-info">
          <li>{parseCubeType(cubeType)}</li>
          <li>
            {cubeType === 'Community'
              ? ''
              : timeToHourMinuteFormat(learningTime)}
          </li>{' '}
        </ul>
      </span>
    </StructureLink>
  );
};

export default DurationableCubeView;
