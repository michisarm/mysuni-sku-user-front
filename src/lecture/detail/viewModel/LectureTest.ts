import Answer from '../model/Answer';
import LearningState from '../model/LearningState';
import { State } from './LectureState';
import { LectureType } from './LectureType';
import { EssayScore } from '../model/GradeSheet';
import { StudentScore } from '../../model/StudentScore';
import ExamQuestion from '../model/ExamQuestion';
import { ItemAnswer } from '../model/AnswerSheet';

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
  //examId: string;
}

export interface LectureTestItem {
  applyLimit: number;
  id: string;
  name?: string;
  questionCount: number;
  questions: ExamQuestion[];
  successPoint?: number;
  totalPoint?: number;
  description: string;
  serviceId: string;
  paperId: string;
}

export interface LectureTestAnswerItem extends Item {
  id: string;
  answers: ItemAnswer[];
  finished: boolean;
  dataLoadTime: Number;

  obtainedScore: number;

  graderComment: string;
  trials: number;
}

export interface LectureTestStudentItem extends Item {
  studentId: string;
  serviceType: LectureType;
  learningState: LearningState;
  studentScore: StudentScore;
  //examId: string | null;
  paperId: string | null;
}

export interface LectureTest {
  test: LectureTestItem;
  answer?: LectureTestAnswerItem;
}
