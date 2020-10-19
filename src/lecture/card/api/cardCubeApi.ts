// http://localhost:3000/api/personalCube/personalcubes/CUBE-2jq
/**
 * category - Breadcrumb 영역 채널 / 카테고리
 * name - 이름
 * iconBox - 아이콘
 * subCategory - 관련 Category
 * tags - 태그
 * contents - type 에 따라서 content 표시
 */

import { axiosApi } from '@nara.platform/accent';
import CoursePlanComplex from '../model/CoursePlanComplex';

const BASE_URL = '/api/lecture';

export function findCoursePlanContents(
  coursePlanId: string,
  courseLectureId: string
): Promise<CoursePlanComplex> {
  const url = `${BASE_URL}/coursePlan?coursePlanId=${coursePlanId}&courseLectureId=${courseLectureId}`;
  return axiosApi
    .get<CoursePlanComplex>(url)
    .then(response => response && response.data);
}

interface StudentInfoViewBody {
  courseLectureIds: string[];
  lectureCardIds: string[];
  preLectureCardIds: string[];
  serviceId: string;
}

export function studentInfoView(body: StudentInfoViewBody) {
  const url = `${BASE_URL}/students/flow/studentInfoView`;
  axiosApi.post(url, body).then(response => response && response.data);
}
