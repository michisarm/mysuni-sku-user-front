import { Cube } from '../../model/Cube';
import Student from '../../model/Student';
import CubeType from '../model/CubeType';
import LearningState from '../model/LearningState';
import LectureParams from './LectureParams';
import { State } from './LectureState';

export type LectureStructureItemType =
  | 'CUBE'
  | 'CARD'
  | 'CHAPTER'
  | 'DISCUSSION'
  | 'REPORT'
  | 'EXAM'
  | 'SURVEY';

export interface LectureStructureItem {
  activated?: boolean;
  params: LectureParams;
  path: string;
  state?: State;
  can: boolean;
  order: number;
  type: LectureStructureItemType;
  canSubmit?: boolean;
}

export interface ItemMap {
  test?: LectureStructureTestItem;
  survey?: LectureStructureSurveyItem;
  report?: LectureStructureReportItem;
}

export interface LectureStructureChapterItem extends LectureStructureItem {
  id: string;
  name: string;
}

export interface LectureStructureTestItem extends LectureStructureItem {
  id: string;
  name: string;
  student?: Student | null;
}

export interface LectureStructureSurveyItem extends LectureStructureItem {
  id: string;
  name: string;
  student?: Student | null;
}

export interface LectureStructureReportItem extends LectureStructureItem {
  id: string;
  name: string;
  student?: Student | null;
}

export interface LectureStructureCubeItem extends LectureStructureItem {
  cardId: string;
  name: string;
  cubeId: string;
  cubeType: CubeType;
  learningTime: number;
  learningState?: LearningState;
  test?: LectureStructureTestItem;
  survey?: LectureStructureSurveyItem;
  report?: LectureStructureReportItem;
  student?: Student;
  cube: Cube;
}

export interface LectureStructureDurationableCubeItem
  extends LectureStructureCubeItem {
  cubeContentsId: string;
  duration?: number;
}

export interface LectureStructureDiscussionItem extends LectureStructureItem {
  id: string;
  name: string;
  time: number;
  creator: string;
  creatorAudienceId: string;
}

export interface LectureStructureCardItem extends LectureStructureItem {
  cardId: string;
  cubes?: LectureStructureCubeItem[];
  name: string;
  learningState?: LearningState;
  test?: LectureStructureTestItem;
  survey?: LectureStructureSurveyItem;
  report?: LectureStructureReportItem;
  discussions?: LectureStructureDiscussionItem[];
  student?: Student;
}

export interface LectureStructure {
  card: LectureStructureCardItem;
  cubes: LectureStructureCubeItem[];
  discussions: LectureStructureDiscussionItem[];
  chapters: LectureStructureChapterItem[];
  items: LectureStructureItem[];
}
