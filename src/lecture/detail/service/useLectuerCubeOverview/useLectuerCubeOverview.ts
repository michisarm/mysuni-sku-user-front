/* eslint-disable consistent-return */

import { useCallback, useEffect } from 'react';
import { useLectureRouterParams } from '../useLectureRouterParams';
import { getCubeLectureOverview } from './utility/getCubeLectureOverview';

export function useLectuerCubeOverview() {
  const params = useLectureRouterParams();

  const getCubeOverview = useCallback(
    (personalCubeId: string, lectureCardId: string) => {
      getCubeLectureOverview(personalCubeId, lectureCardId);
    },
    []
  );

  useEffect(() => {
    if (params === undefined) {
      return;
    }
    const { contentId, lectureId } = params;
    getCubeOverview(contentId, lectureId);
  }, [params]);
}
