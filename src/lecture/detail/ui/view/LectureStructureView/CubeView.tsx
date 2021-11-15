import React from 'react';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import { timeToHourMinuteFormat } from '../../../../../shared/helper/dateTimeHelper';
import CubeType from '../../../model/CubeType';
import { State } from '../../../viewModel/LectureState';
import StructureLink from './StructureLink';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import lecturePath from '../../../../routePaths';
import { getPreCourseFailCardId } from '../../../service/useLectureStructure/utility/requestCardLectureStructure';
import { getCurrentHistory } from '../../../../../shared/store/HistoryStore';

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

  if (failCardId !== null) {
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
}

const CubeView: React.FC<CubeViewProps> = function CubeView({
  cardId,
  name,
  state = 'None',
  activated = false,
  learningTime,
  cubeType,
  path,
  can,
}) {
  return (
    <StructureLink
      className={`btn-state-course ${activated ? 'act-on' : ''}`}
      can={can}
      to={path}
      onClick={() => window.scrollTo({ top: 0 })}
      onCannotClick={() => cannotAlert(cardId)}
    >
      <span
        className={`label-state-cube ${state === 'Progress' ? 'l-step5' : ''} ${
          state === 'Completed' ? 'complete' : ''
        }`}
      >
        <span>
          <PolyglotText
            defaultString="cube 완료상태"
            id="Cube-Contents-완료상태"
          />
        </span>
      </span>
      <span className="copy-holder">
        <span className="copy-title">{name}</span>
        <ul className="type-info">
          <li>{parseCubeType(cubeType)}</li>
          {learningTime > 0 && (
            <li>
              {cubeType === 'Community'
                ? ''
                : timeToHourMinuteFormat(learningTime)}
            </li>
          )}
        </ul>
      </span>
    </StructureLink>
  );
};

export default CubeView;
