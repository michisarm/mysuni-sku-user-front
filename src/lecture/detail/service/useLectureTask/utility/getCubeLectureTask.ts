/* eslint-disable consistent-return */

/**
 * 
 export interface LectureStructureCubeItem extends Item {
  id: string;
  name: string;
  cubeId: string;
  cubeType: CubeType;
  learningTime: number;
  url: LectureStructureCubeItemUrl;
  learningState?: LearningState;
  state?: State;
  test?: LectureStructureTestItem;
  survey?: LectureStructureSurveyItem;
  report?: LectureStructureReportItem;
}
 */
import { getTaskItemMapFromCube } from './getTaskItemMapFromCube';

export async function getCubeLectureTask(
  cubeId: string,
  lectureCardId: string,
  offset: number,
  limit: number
): Promise<void> {
  await getTaskItemMapFromCube(cubeId, lectureCardId, offset, limit);
}
