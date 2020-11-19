/* eslint-disable consistent-return */

import { useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { parseLectureParams } from '../../utility/lectureRouterParamsHelper';
import LectureParams from '../../viewModel/LectureParams';
import { LectureStructureCourseItem } from '../../viewModel/LectureStructure';
import { getActiveStructureItem, useLectureStructure } from '../useLectureStructure/useLectureStructure';
import { getCourseLectureOverview, getCourseLectureOverviewFromCoursePlanComplex } from './utility/getCourseLectureOverview';

export function useLectureCourseOverview() {
  const params = useParams<LectureParams>();
  const { pathname } = useLocation();
  const [lectureStructure] = useLectureStructure();

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
    if (lectureStructure === undefined) {
      return;
    }
    const lectureParams = parseLectureParams(params, pathname);
    const { contentId, lectureId } = lectureParams;
    const currentCourse = getActiveStructureItem();
    if (currentCourse === undefined) {
      return;
    }
    const { coursePlanComplex } = currentCourse as LectureStructureCourseItem
    if (coursePlanComplex !== undefined) {
      getCourseLectureOverviewFromCoursePlanComplex(
        params,
        coursePlanComplex,
        params.collegeId,
        params.cineroomId,
      );
    } else {
      getCourseOverview({
        params,
        cineroomId: params.cineroomId,
        collegeId: params.collegeId,
        coursePlanId: contentId,
        serviceId: lectureId,
      });
    }
  }, [params, pathname, lectureStructure]);
}
