import {
  LectureStructureCourseItemParams,
  LectureStructureCubeItemParams,
} from 'lecture/detail/viewModel/LectureStructure';
/* eslint-disable consistent-return */

import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCubeLectureOverview } from './utility/getCubeLectureOverview';

export function useLectureOverview() {
  const params = useParams<
    LectureStructureCourseItemParams & LectureStructureCubeItemParams
  >();

  const getCubeOverview = useCallback(
    (personalCubeId: string, lectureCardId: string) => {
      getCubeLectureOverview(personalCubeId, lectureCardId);
    },
    []
  );

  const getCourseOverview = useCallback((coursePlanId: string) => {}, []);

  useEffect(() => {
    const personalCubeId = params.cubeId || params.subCubeId;
    if (personalCubeId !== undefined) {
      const lectureCardId = params.lectureCardId || params.subLectureCardId;
      if (lectureCardId !== undefined) {
        getCubeOverview(personalCubeId, lectureCardId);
      }
    }
  }, [params]);
}
