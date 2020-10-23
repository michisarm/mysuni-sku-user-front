import { ExamQuestionModel } from 'assistant/paper/model/ExamQuestionModel';
import CubeType from '../model/CubeType';
import LearningState from '../model/LearningState';
import LectureView from '../model/LectureView';

export type LectureStructureItemType = 'REPORT' | 'EXAM' | 'SURVEY';

export type State = 'None' | 'Progress' | 'Completed';

interface Params {
  cineroomId?: string;
  collegeId: string;
}

interface Item {
  activated?: boolean;
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

export interface LectureStructureCourseItemParams extends Params {
  coursePlanId: string;
  serviceType: LectureType;
  serviceId: string;
}

export interface LectureStructureCubeItemParams extends Params {
  coursePlanId?: string;
  serviceType?: string;
  serviceId?: string;
  cubeId: string;
  lectureCardId?: string;
  examId: string;
}

export interface LectureStructureTestItem extends Item {
  id: string;
  name: string;
  questionCount: number;
  //params: LectureStructureCourseItemParams | LectureStructureCubeItemParams;
  state: State;
  type: LectureStructureItemType;
  questions: ExamQuestionModel[];
  successPoint: number;
  totalPoint: number;
}

export interface LectureStructureSurveyItem extends Item {
  id: string;
  name: string;
  questionCount: number;
  params: LectureStructureCourseItemParams | LectureStructureCubeItemParams;
  state: State;
  type: LectureStructureItemType;
}

export interface LectureStructureReportItem extends Item {
  name: string;
  params: LectureStructureCourseItemParams | LectureStructureCubeItemParams;
  state: State;
  type: LectureStructureItemType;
}

export interface LectureStructureCubeItem extends Item {
  id: string;
  name: string;
  cubeId: string;
  cubeType: CubeType;
  learningTime: number;
  params: LectureStructureCubeItemParams;
  learningState?: LearningState;
  state?: State;
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
  params: LectureStructureCourseItemParams;
  learningState?: LearningState;
  state?: State;
  serviceId: string;
  test?: LectureStructureTestItem;
  survey?: LectureStructureSurveyItem;
  report?: LectureStructureReportItem;
  lectureView?: LectureView;
}

export interface LectureTest {
  courses: LectureStructureCourseItem[];
  cubes: LectureStructureCubeItem[];
  course?: LectureStructureCourseItem;
  cube?: LectureStructureCubeItem;
  test?: LectureStructureTestItem;
  survey?: LectureStructureSurveyItem;
  report?: LectureStructureReportItem;
  type: LectureType;
}
