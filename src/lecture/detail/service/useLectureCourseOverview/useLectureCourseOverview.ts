/* eslint-disable consistent-return */

import { useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { setInMyLectureCdo, setLectureComment, setLectureCourseSummary, setLectureDescription, setLectureFile, setLectureInstructor, setLecturePrecourse, setLectureRelations, setLectureReview, setLectureSubcategory, setLectureTags } from '../../store/LectureOverviewStore';
import { parseLectureParams } from '../../utility/lectureRouterParamsHelper';
import LectureParams from '../../viewModel/LectureParams';
import { LectureStructureCourseItem } from '../../viewModel/LectureStructure';
import { getActiveStructureItem, useLectureStructure } from '../useLectureStructure/useLectureStructure';
import { getCourseLectureOverview, getCourseLectureOverviewFromCoursePlanComplex } from './utility/getCourseLectureOverview';

export function useLectureCourseOverview() {
  const {
    cineroomId,
    collegeId,
    cubeId,
    lectureCardId,
    coursePlanId,
    serviceType,
    serviceId,
    lectureType,
    contentId,
    lectureId,
  } = useParams<LectureParams>();

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

      return () => {
        setLectureCourseSummary();
        setLectureDescription();
        setLectureSubcategory();
        setLectureTags();
        setLectureInstructor();
        setLecturePrecourse();
        setLectureFile();
        setLectureComment();
        setLectureReview();
        setInMyLectureCdo();
        setLectureRelations();
      }
    },
    []
  );

  useEffect(() => {
    if (lectureStructure === undefined) {
      return;
    }
    const params: LectureParams = {
      cineroomId,
      collegeId,
      cubeId,
      lectureCardId,
      coursePlanId,
      serviceType,
      serviceId,
      lectureType,
      contentId,
      lectureId,
    };
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
        coursePlanId: contentId || params.coursePlanId!,
        serviceId: lectureId || params.serviceId!,
      });
    }
  }, [cineroomId,
    collegeId,
    cubeId,
    lectureCardId,
    coursePlanId,
    serviceType,
    serviceId,
    lectureType,
    contentId,
    lectureId, , pathname, lectureStructure]);
}
