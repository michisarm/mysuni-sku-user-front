import { ExamQuestionModel } from 'assistant/paper/model/ExamQuestionModel';
import CubeType from '../model/CubeType';
import LearningState from '../model/LearningState';
import LectureView from '../model/LectureView';
import LectureParams from './LectureParams';
import LectureRouterParams from './LectureRouterParams';
import { LectureType } from './LectureType';

export type LectureStructureItemType = 'REPORT' | 'EXAM' | 'SURVEY';

export type State = 'None' | 'Progress' | 'Completed';

interface Item {
  activated?: boolean;
  params: LectureParams;
  routerParams: LectureRouterParams;
  path: string;
  state?: State;
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

export interface LectureStructureTestItem extends Item {
  id: string;
  name: string;
  questionCount: number;
  type: LectureStructureItemType;
}

export interface LectureStructureSurveyItem extends Item {
  id: string;
  name: string;
  questionCount: number;
  type: LectureStructureItemType;
}

export interface LectureStructureReportItem extends Item {
  name: string;
  type: LectureStructureItemType;
}

export interface LectureStructureCubeItem extends Item {
  id: string;
  name: string;
  cubeId: string;
  cubeType: CubeType;
  learningTime: number;
  learningState?: LearningState;
  test?: LectureStructureTestItem;
  survey?: LectureStructureSurveyItem;
  report?: LectureStructureReportItem;
  serviceId?: string;
}

export interface LectureStructureCourseItem extends Item {
  id: string;
  coursePlanId: string;
  cubes?: LectureStructureCubeItem[];
  name: string;
  learningState?: LearningState;
  serviceId: string;
  test?: LectureStructureTestItem;
  survey?: LectureStructureSurveyItem;
  report?: LectureStructureReportItem;
  lectureView?: LectureView;
}

export interface LectureStructure {
  courses: LectureStructureCourseItem[];
  cubes: LectureStructureCubeItem[];
  course?: LectureStructureCourseItem;
  cube?: LectureStructureCubeItem;
  test?: LectureStructureTestItem;
  survey?: LectureStructureSurveyItem;
  report?: LectureStructureReportItem;
  type: LectureType;
}
