import Answer from '../model/Answer';
import ExamQuestion from '../model/ExamQuestion';
import LearningState from '../model/LearningState';
import { State } from './LectureState';
import { LectureType } from './LectureType';

export type LectureStructureItemType = 'REPORT' | 'EXAM' | 'SURVEY';

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

export interface LectureTestItem extends Item {
  id: string;
  name: string;
  questionCount: number;
  questions: ExamQuestion[];
  successPoint: number;
  totalPoint: number;
}

export interface LectureTestAnswerItem extends Item {
  id: string;
  answers: Answer[];
  submitted: boolean;
  submitAnswers: Answer[];
  finished: boolean;
}

export interface LectureTestStudentItem extends Item {
  studentId: string;
  serviceType: LectureType;
  learningState: LearningState;
}

export interface LectureTest {
  test: LectureTestItem;
  answer?: LectureTestAnswerItem;
}
