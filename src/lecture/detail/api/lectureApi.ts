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
import { LectureModel } from '../../model';
import Student from '../../model/Student';
import CoursePlanComplex from '../model/CoursePlanComplex';
import LectureCard from '../model/LectureCard';
import LectureStudentView from '../model/LectureStudentView';
import StudentCdo from '../model/StudentCdo';
import StudentJoin from '../model/StudentJoin';
import Test from '../model/Test';

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

export function findLectureCard(lectureCardId: string): Promise<LectureCard> {
  const url = `${BASE_URL}/lectureCards/${lectureCardId}`;
  return axiosApi
    .get<LectureCard>(url)
    .then(response => response && response.data);
}

export interface StudentInfoViewBody {
  courseLectureIds: string[];
  lectureCardIds: string[];
  preLectureCardIds: string[];
  serviceId: string;
}

export function studentInfoView(
  body: StudentInfoViewBody
): Promise<LectureStudentView> {
  const url = `${BASE_URL}/students/studentInfoView`;
  return axiosApi
    .post<LectureStudentView>(url, body)
    .then(response => response && response.data);
}

export function markComplete(body: { round: number }): Promise<void> {
  const url = `${BASE_URL}/students/flow/markComplete`;
  return axiosApi
    .put<void>(url, body)
    .then(response => response && response.data);
}

export function findStudent(studentId: string): Promise<Student> {
  const url = `${BASE_URL}/students/${studentId}`;
  return axiosApi
    .get<Student>(url, { headers: { Pragma: 'no-cache' } })
    .then(response => response && response.data);
}

export function findIsJsonStudentByCube(
  lectureCardId: string
): Promise<StudentJoin[]> {
  const url = `${BASE_URL}/students/flow/isJsonByCube?lectureCardId=${lectureCardId}`;
  return axiosApi
    .get<StudentJoin[]>(url, { headers: { Pragma: 'no-cache' } })
    .then(response => response && response.data);
}

export function registerStudent(studentCdo: StudentCdo): Promise<string> {
  const url = `${BASE_URL}/students/flow`;
  return axiosApi
    .post<string>(url, studentCdo)
    .then(response => response && response.data);
}

export function joinCommunity(studentCdo: StudentCdo): Promise<string> {
  const url = `${BASE_URL}/students/flow/joinCommunity`;
  return axiosApi
    .post<string>(url, studentCdo)
    .then(response => response && response.data);
}

// jz - API 확인 필요
export function deleteStudentByRollBookId(round: number) {
  const url = `${BASE_URL}/students/flow/byRollBookId?round=${round}`;
  return axiosApi.delete(url);
}

export function modifyStudent(
  studentId: string,
  fileBoxId: string,
  homework: string
): Promise<void> {
  const url = `${BASE_URL}/students/flow/courseworkProcess/${studentId}/${fileBoxId}`;
  return axiosApi
    .put<void>(url, { homeworkContent: homework })
    .then(response => response && response.data);
}

export function modifyStudentForExam(
  studentId: string,
  examId: string
): Promise<void> {
  const url = `${BASE_URL}/students/examProcess/${studentId}/${examId}`;
  return axiosApi.put<void>(url).then(response => response && response.data);
}

//close 버튼 또는 학습완료 시 상태 업데이트 조회
export function progressByCardId(studentCdo: StudentCdo): Promise<Student> {
  const url = `${BASE_URL}/students/flow/confirm/progressByCardId`;
  return axiosApi
    .post<Student>(url, studentCdo)
    .then(response => response && response.data);
}

export function setCubeStudentExamId(
  personalCubeId: string,
  studentId: string
): Promise<Test> {
  const url = `${BASE_URL}/students/flow/setCubeStudentExamId/${personalCubeId}/${studentId}`;
  return axiosApi.get<Test>(url).then(response => response && response.data);
}

export function setCourseStudentExamId(
  coursePlanId: string,
  studentId: string
): Promise<Test> {
  const url = `${BASE_URL}/students/flow/setCourseStudentExamId/${coursePlanId}/${studentId}`;
  return axiosApi.get<Test>(url).then(response => response && response.data);
}

export function findMenuArrange(
  serviceIds: string[]
): Promise<{ results: LectureModel[] }> {
  const url = `${BASE_URL}/lectures/flow/arranges/menus`;
  return axiosApi
    .post<{ results: LectureModel[] }>(url, {
      serviceIds,
      arrangeType: '',
      limit: 100,
    })
    .then(response => response && response.data);
}
