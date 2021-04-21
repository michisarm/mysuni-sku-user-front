import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createViewLog } from '../../api/actionLogCollectorApi';
import { findCubeDetailCache } from '../../api/cubeApi';
import LectureParams from '../../viewModel/LectureParams';

export function useCubeViewEvent() {
  const { cardId, cubeId } = useParams<LectureParams>();

  useEffect(() => {
    if (cardId === undefined || cubeId === undefined) {
      return;
    }
    const path = window.location.href;
    const email = localStorage.getItem('nara.email') || '';

    findCubeDetailCache(cubeId).then(cubeDetail => {
      if (cubeDetail !== undefined) {
        const {
          cube: { name },
        } = cubeDetail;
        createViewLog({
          // 오류 오류
          college: 'collegeId',
          context: {
            logType: 'VIEW',
            menu: 'CUBE_VIEW',
            path,
            poc: 'web',
            email,
          },
          courseName: '',
          coursePlanId: '',
          cubeId,
          cubeName: name,
          lectureCardId: cardId,
          serviceType: 'CARD',
        });
      }
    });
  }, [cardId, cubeId]);
}
