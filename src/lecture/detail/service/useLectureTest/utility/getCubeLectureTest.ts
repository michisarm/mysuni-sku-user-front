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
import { getTestItemMapFromCube } from './getTestItemMapFromCube';

export async function getCubeLectureTest(
  cubeId: string,
  lectureCardId: string
): Promise<void> {
  await getTestItemMapFromCube(cubeId, lectureCardId);
}
