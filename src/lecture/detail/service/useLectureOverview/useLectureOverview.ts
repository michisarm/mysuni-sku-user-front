/* eslint-disable consistent-return */

import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { parseLectureParams } from '../../utility/lectureRouterParamsHelper';
import LectureParams from '../../viewModel/LectureParams';
import { getCourseLectureOverview } from './utility/getCourseLectureOverview';
import { getCubeLectureOverview } from './utility/getCubeLectureOverview';

export function useLectureOverview() {
  const params = useParams<LectureParams>();

  const getCubeOverview = useCallback(
    (personalCubeId: string, lectureCardId: string) => {
      getCubeLectureOverview(personalCubeId, lectureCardId);
    },
    []
  );

  const getCourseOverview = useCallback(
    ({
      coursePlanId,
      serviceId,
      collegeId,
      cineroomId,
    }: {
      coursePlanId: string;
      serviceId: string;
      collegeId: string;
      cineroomId?: string;
    }) => {
      getCourseLectureOverview(coursePlanId, serviceId, collegeId, cineroomId);
    },
    []
  );

  useEffect(() => {
    const lectureParams = parseLectureParams(params);
    const { contentType, contentId, lectureId } = lectureParams;
    if (contentType === 'cube') {
      getCubeOverview(contentId, lectureId);
    }
    getCourseOverview({
      cineroomId: params.cineroomId,
      collegeId: params.collegeId,
      coursePlanId: contentId,
      serviceId: lectureId,
    });
  }, [params]);
}
