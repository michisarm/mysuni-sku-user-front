/* eslint-disable consistent-return */

import { useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { parseLectureParams } from '../../utility/lectureRouterParamsHelper';
import LectureParams from '../../viewModel/LectureParams';
import { getCourseLectureOverview } from './utility/getCourseLectureOverview';

export function useLectureCourseOverview() {
  const params = useParams<LectureParams>();
  const { pathname } = useLocation();

  const getCourseOverview = useCallback(
    ({
      params,
      coursePlanId,
      serviceId,
      collegeId,
      cineroomId,
    }: {
      params: LectureParams;
      coursePlanId: string;
      serviceId: string;
      collegeId: string;
      cineroomId?: string;
    }) => {
      getCourseLectureOverview(
        params,
        coursePlanId,
        serviceId,
        collegeId,
        cineroomId
      );
    },
    []
  );

  useEffect(() => {
    const lectureParams = parseLectureParams(params, pathname);
    const { contentId, lectureId } = lectureParams;
    getCourseOverview({
      params,
      cineroomId: params.cineroomId,
      collegeId: params.collegeId,
      coursePlanId: contentId,
      serviceId: lectureId,
    });
  }, [params, pathname]);
}
