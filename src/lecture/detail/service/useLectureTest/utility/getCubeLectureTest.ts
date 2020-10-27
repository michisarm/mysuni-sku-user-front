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
import { getTestAnswerItemMapFromCube } from './getTestAnswerItemMapFromCube';
import { getTestItemMapFromCube } from './getTestItemMapFromCube';
import { getTestStudentItemMapFromCube } from './getTestStudentItemMapFromCube';

export async function getCubeLectureTest(cubeId: string): Promise<void> {
  await getTestItemMapFromCube(cubeId);
}

export async function getCubeLectureTestStudent(
  lectureCardId: string
): Promise<void> {
  await getTestStudentItemMapFromCube(lectureCardId);
}

export async function getCubeLectureTestAnswer(cubeId: string): Promise<void> {
  const testItem = await getTestItemMapFromCube(cubeId); // 다른 방법은?
  if (testItem) {
    await getTestAnswerItemMapFromCube(testItem.id, testItem.questions);
  }
}
