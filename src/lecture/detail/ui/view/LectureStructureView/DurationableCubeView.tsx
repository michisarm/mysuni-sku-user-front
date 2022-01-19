import React from 'react';
import { reactConfirm } from '@nara.platform/accent';
import { timeToHourMinuteFormat } from '../../../../../shared/helper/dateTimeHelper';
import CubeType from '../../../model/CubeType';
import { State } from '../../../viewModel/LectureState';
import StructureLink from './StructureLink';
import lecturePath from '../../../../routePaths';
import { getCurrentHistory } from '../../../../../shared/store/HistoryStore';
import { getPreCourseFailCardId } from '../../../service/useLectureStructure/utility/requestCardLectureStructure';
import { getPolyglotText } from '../../../../../shared/ui/logic/PolyglotText';

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

async function cannotAlert(cardId: string) {
  const failCardId = await getPreCourseFailCardId(cardId);
  const history = getCurrentHistory();
  // reactAlert({
  //   title: '안내',
  //   message: '선수 학습 완료 후 진행이 가능합니다.',
  // });

  if (failCardId !== '' && failCardId !== null) {
    reactConfirm({
      title: getPolyglotText('안내', 'lecture-preCard-confirm-title'),
      message: getPolyglotText(
        '선수 학습 완료 후 진행이 가능합니다. 선수 학습으로 이동하시겠습니까?',
        'lecture-preCard-confirm-message'
      ),
      onOk: () => history?.push(lecturePath.lectureCard(failCardId)),
      onCancel: () => {},
    });
  }
}

interface CubeViewProps {
  cardId: string;
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
  cardId,
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
      onCannotClick={() => cannotAlert(cardId)}
    >
      <span
        className={`label-state-cube ${
          state === 'Progress' ? `l-step${step}` : ''
        } ${state === 'Completed' ? 'complete' : ''}`}
      >
        <span>cube 완료상태</span>
      </span>
      <span className="copy-holder">
        <span className="copy-title">{name}</span>
        <ul className="type-info">
          <li>{parseCubeType(cubeType)}</li>
          {learningTime > 0 && (
            <>
              <li>
                {cubeType === 'Community'
                  ? ''
                  : timeToHourMinuteFormat(learningTime)}
              </li>{' '}
            </>
          )}
        </ul>
      </span>
    </StructureLink>
  );
};

export default DurationableCubeView;
