import LearningState from '../model/LearningState';
import { LectureType } from './LectureType';
import LectureParams from './LectureParams';
import CubeType from '../model/CubeType';

export type State = 'None' | 'Progress' | 'Completed';

export type LectureStructureItemType = 'REPORT' | 'EXAM' | 'SURVEY';

//TODO 과제제출 , 답변 상태에 대한 처리 추가 필요함
export interface StudentStateMap {
  learningState: LearningState;
  state: State;
  studentId: string;
}

// jz - 이거 확인 필요
interface Params {
  cineroomId?: string;
  collegeId?: string;
}

//TODO LectureStructureParams Report에 필요한 형식만 사용되게 수정 예정
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

export interface LectureReportCubeItemParams extends LectureParams {
  id?: string;
  homeworkContent?: string;
  homeworkFileBoxId?: string;
}

// homeworkContent: null
// homeworkFileBoxId: "3q"
// homeworkOperatorComment: "<p>ajklfajlfd</p>"
// homeworkOperatorFileBoxId: null
// id: "267cc717-a01b-4850-8e78-3237cd6366cf"

// TODO ? 표시 정리
export interface StudentReport {
  id?: string;
  homeworkContent?: string | null;
  homeworkFileBoxId?: string;
  homeworkOperatorComment?: string | null;
  homeworkOperatorFileBoxId?: string | null;
}

export interface ReportFileBox {
  report?: boolean;
  fileBoxId?: string;
  reportName?: string;
  reportQuestion?: string;
}

export interface LectureReport {
  reportId: string;
  studentReport?: StudentReport;
  reportFileBox?: ReportFileBox;
  state?: State;
}

interface Item {
  activated?: boolean;
  params: LectureParams;
  routerParams: LectureParams;
  path: string;
  state?: State;
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
