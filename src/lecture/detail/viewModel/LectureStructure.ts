import { ExamQuestionModel } from 'assistant/paper/model/ExamQuestionModel';
import CubeType from '../model/CubeType';
import LearningState from '../model/LearningState';
import LectureView from '../model/LectureView';
import Student from '../model/Student';
import LectureParams from './LectureParams';
import LectureRouterParams from './LectureRouterParams';
import { State } from './LectureState';
import { LectureType } from './LectureType';

export type LectureStructureItemType =
  | 'PROGRAM'
  | 'CUBE'
  | 'COURSE'
  | 'DISCUSSION'
  | 'REPORT'
  | 'EXAM'
  | 'SURVEY';

export interface LectureStructureItem {
  activated?: boolean;
  params: LectureParams;
  routerParams: LectureRouterParams;
  path: string;
  state?: State;
  can: boolean;
  order: number;
  type: LectureStructureItemType;
}

export interface StudentStateMap {
  learningState: LearningState;
  state: State;
  studentId: string;
}

export interface ItemMap {
  test?: LectureStructureTestItem;
  survey?: LectureStructureSurveyItem;
  report?: LectureStructureReportItem;
}

export interface LectureStructureTestItem extends LectureStructureItem {
  id: string;
  name: string;
  questionCount: number;
}

export interface LectureStructureSurveyItem extends LectureStructureItem {
  id: string;
  name: string;
  questionCount: number;
}

export interface LectureStructureReportItem extends LectureStructureItem {
  name: string;
}

export interface LectureStructureCubeItem extends LectureStructureItem {
  id: string;
  name: string;
  cubeId: string;
  cubeType: CubeType;
  learningTime: number;
  learningState?: LearningState;
  learningCardId?: string;
  test?: LectureStructureTestItem;
  survey?: LectureStructureSurveyItem;
  report?: LectureStructureReportItem;
  serviceId?: string;
  lectureView?: LectureView;
  student?: Student;
}

export interface LectureStructureDurationableCubeItem
  extends LectureStructureCubeItem {
  duration?: number;
}

export interface LectureStructureDiscussionItem extends LectureStructureItem {
  id: string;
  name: string;
  time: number;
  creator: string;
  creatorAudienceId: string;
}

export interface LectureStructureCourseItem extends LectureStructureItem {
  id: string;
  coursePlanId: string;
  cubes?: LectureStructureCubeItem[];
  name: string;
  learningState?: LearningState;
  serviceId: string;
  test?: LectureStructureTestItem;
  survey?: LectureStructureSurveyItem;
  report?: LectureStructureReportItem;
  discussions?: LectureStructureDiscussionItem[];
  lectureView?: LectureView;
  student?: Student;
}

export interface LectureStructure {
  courses: LectureStructureCourseItem[];
  cubes: LectureStructureCubeItem[];
  course?: LectureStructureCourseItem;
  cube?: LectureStructureCubeItem;
  discussions: LectureStructureDiscussionItem[];
  type: LectureType;
  items: LectureStructureItem[];
}
