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
import { getTestAnswerItemMapFromExam } from './getTestAnswerItemMapFromExam';
import { getTestItemMapFromCube } from './getTestItemMapFromCube';
import { getTestStudentItemMapFromLecture } from './getTestStudentItemMapFromLecture';

export async function getCubeLectureTest(cubeId: string): Promise<void> {
  await getTestItemMapFromCube(cubeId);
}

export async function getCubeLectureTestStudent(
  lectureCardId: string
): Promise<void> {
  await getTestStudentItemMapFromLecture(lectureCardId);
}

export async function getCubeLectureTestAnswer(cubeId: string): Promise<void> {
  const testItem = await getTestItemMapFromCube(cubeId); // 다른 방법은?
  if (testItem) {
    await getTestAnswerItemMapFromExam(testItem.id, testItem.questions);
  }
}
