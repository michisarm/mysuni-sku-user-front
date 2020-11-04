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
import LectureParams from 'lecture/detail/viewModel/LectureParams';
import { getTestAnswerItemMapFromExam } from './getTestAnswerItemMapFromExam';
import { getTestItemMapFromCube } from './getTestItemMapFromCube';
import { getTestStudentItemMapFromCube } from './getTestStudentItemMapFromCube';

export async function getCubeLectureTest(params: LectureParams): Promise<void> {
  await getTestItemMapFromCube(params);
}

export async function getCubeLectureTestStudent(
  params: LectureParams
): Promise<void> {
  await getTestStudentItemMapFromCube(params);
}

export async function getCubeLectureTestAnswer(
  params: LectureParams
): Promise<void> {
  const testItem = await getTestItemMapFromCube(params); // 다른 방법은?
  if (testItem) {
    await getTestAnswerItemMapFromExam(testItem.id, testItem.questions);
  }
}
