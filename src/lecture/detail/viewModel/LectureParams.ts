import { comparer } from 'mobx';
import { ContentType } from './LectureRouterParams';
import { LectureType } from './LectureType';

export default interface LectureParams {
  cineroomId?: string;
  collegeId: string;
  cubeId?: string;
  lectureCardId?: string;
  coursePlanId?: string;
  serviceType?: LectureType;
  serviceId?: string;
  lectureType?: ContentType;
  contentId?: string;
  lectureId?: string;
  communityId?: string;
  menuId?: string;
}

export function compareLectureParams(a: LectureParams, b: LectureParams) {
  return (
    a.cineroomId == b.cineroomId &&
    a.collegeId == b.collegeId &&
    a.cubeId == b.cubeId &&
    a.lectureCardId == b.lectureCardId &&
    a.coursePlanId == b.coursePlanId &&
    a.serviceType == b.serviceType &&
    a.serviceId == b.serviceId &&
    a.lectureType == b.lectureType &&
    a.contentId == b.contentId &&
    a.lectureId == b.lectureId
  );
}

export function toPath(params: LectureParams): string {
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
  } = params;
  const cineroomIdPath = `${
    cineroomId === undefined ? '' : `/cineroom/${cineroomId}`
  }`;
  if (cubeId !== undefined) {
    return `/lecture${cineroomIdPath}/college/${collegeId}/cube/${cubeId}/lecture-card/${lectureCardId}`;
  }
  const servicePath = `/lecture${cineroomIdPath}/college/${collegeId}/course-plan/${coursePlanId}/${serviceType}/${serviceId}`;
  if (lectureType === undefined) {
    return servicePath;
  }
  return `${servicePath}/${lectureType}/${contentId}/${lectureId}`;
}
