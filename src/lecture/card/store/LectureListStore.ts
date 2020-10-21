import CubeType from '../model/CubeType';
import LearningState from '../model/LearningState';
import { createStore } from './Store';

type LectureListItemType = 'REPORT' | 'EXAM' | 'SURVEY';

export interface LectureListTestItem {
  id: string;
  name: string;
  questionCount: number;
  url: LectureListCourseItemUrl;
  state?: LearningState;
  type: LectureListItemType;
}

export interface LectureListSurveyItem {
  id: string;
  name: string;
  questionCount: number;
  url: LectureListCourseItemUrl;
  state?: LearningState;
  type: LectureListItemType;
}

export interface LectureListReportItem {
  id: string;
  name: string;
  questionCount: number;
  url: LectureListCourseItemUrl;
  state?: LearningState;
  type: LectureListItemType;
}

export interface LectureListCourseItemUrl {
  coursePlanId: string;
  serviceType: string;
  serviceId: string;
}

export interface LectureListCubeItemUrl {
  programLectureUsid?: string;
  cubeId: string;
  lectureCardId: string;
}

export interface LectureListCubeItem {
  id: string;
  name: string;
  cubeId: string;
  cubeType: CubeType;
  learningTime: number;
  url: LectureListCubeItemUrl;
  learningState?: LearningState;
  state?: LearningState;
  serviceId: string;
}

export interface LectureListCourseItem {
  id: string;
  cubes?: LectureListCubeItem[];
  name: string;
  url: LectureListCourseItemUrl;
  state?: LearningState;
  serviceId: string;
  test?: LectureListTestItem;
  survey?: LectureListSurveyItem;
  report?: LectureListReportItem;
}

export interface LectureList {
  courses: LectureListCourseItem[];
  cubes: LectureListCubeItem[];
  test?: LectureListTestItem;
  survey?: LectureListSurveyItem;
  report?: LectureListReportItem;
}

const initialStore: LectureList = { courses: [], cubes: [] };
const [setLectureList, onLectureList, getLectureList] = createStore<
  LectureList
>(initialStore);

export { setLectureList, onLectureList, getLectureList };
