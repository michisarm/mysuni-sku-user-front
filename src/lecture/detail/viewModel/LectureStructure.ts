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
  params: LectureParams;
  path: string;
  state?: State;
  can: boolean;
  order: number;
  type: LectureStructureItemType;
  test?: LectureStructureTestItem;
  survey?: LectureStructureSurveyItem;
  report?: LectureStructureReportItem;
  student?: Student | null;
  parentId?: string;
}

export interface ItemMap {
  test?: LectureStructureTestItem;
  survey?: LectureStructureSurveyItem;
  report?: LectureStructureReportItem;
}

export interface LectureStructureChapterItem extends LectureStructureItem {
  id: string;
  name: string;
  cubeCount: number;
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
  last?: boolean;
  isDurationable?: boolean;
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
  last?: boolean;
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
  learningTime: number;
  additionalLearningTime: number;
}

export interface LectureStructure {
  card: LectureStructureCardItem;
  cubes: LectureStructureCubeItem[];
  discussions: LectureStructureDiscussionItem[];
  chapters: LectureStructureChapterItem[];
  items: LectureStructureItem[];
}

export function isLectureStructureCubeItem(
  item: LectureStructureItem
): item is LectureStructureCubeItem {
  return item.type === 'CUBE';
}

export function isLectureStructureDiscussionItem(
  item: LectureStructureItem
): item is LectureStructureDiscussionItem {
  return item.type === 'DISCUSSION';
}

export function isLectureStructureChapterItem(
  item: LectureStructureItem
): item is LectureStructureChapterItem {
  return item.type === 'CHAPTER';
}
