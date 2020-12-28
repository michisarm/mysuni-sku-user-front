import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createViewLog } from '../../api/actionLogCollectorApi';
import { findPersonalCube } from '../../api/mPersonalCubeApi';
import LectureParams from '../../viewModel/LectureParams';

export function useCubeViewEvent() {
  const { collegeId, cubeId, lectureCardId, contentId, lectureId } = useParams<
    LectureParams
  >();

  useEffect(() => {
    const _cubeId = contentId || cubeId;
    const _lectureCardId = lectureId || lectureCardId;
    if (_cubeId === undefined || _lectureCardId === undefined) {
      return;
    }
    const path = window.location.href;
    const email = localStorage.getItem('nara.email') || '';

    findPersonalCube(_cubeId).then(personalCube => {
      if (personalCube !== undefined) {
        const { name } = personalCube;
        createViewLog({
          college: collegeId,
          context: {
            logType: 'VIEW',
            menu: 'CUBE_VIEW',
            path,
            poc: 'web',
            email,
          },
          courseName: '',
          coursePlanId: '',
          cubeId: _cubeId,
          cubeName: name,
          lectureCardId: _lectureCardId,
          serviceType: 'CARD',
        });
      }
    });
  }, [collegeId, cubeId, lectureCardId, contentId, lectureId]);
}
