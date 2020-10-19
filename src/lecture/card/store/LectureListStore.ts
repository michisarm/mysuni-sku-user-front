import State from 'lecture/shared/LectureSubInfo/model/State';
import CubeType from '../model/CubeType';
import { createStore } from './Store';

interface LectureListCourseItemUrl {
  coursePlanId: string;
  serviceType: string;
  serviceId: string;
}

interface LectureListCubeItemUrl {
  programLectureUsid: string;
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
  state?: State;
}

export interface LectureListCourseItem {
  id: string;
  cubes?: LectureListCubeItem[];
  name: string;
  url: LectureListCourseItemUrl;
  state?: State;
}

const initialStore: (LectureListCourseItem | LectureListCubeItem)[] = [];
const [setLectureList, onLectureList, getLectureList] = createStore<
  (LectureListCourseItem | LectureListCubeItem)[]
>(initialStore);

export { setLectureList, onLectureList, getLectureList };
