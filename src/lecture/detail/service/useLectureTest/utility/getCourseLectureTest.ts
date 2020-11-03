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
import { getTestItemMapFromCourse } from './getTestItemMapFromCourse';
import { getTestStudentItemMapFromCourse } from './getTestStudentItemMapFromCourse';

export async function getCourseLectureTest(
  params: LectureParams
): Promise<void> {
  await getTestItemMapFromCourse(params);
}

export async function getCourseLectureTestStudent(
  params: LectureParams
): Promise<void> {
  await getTestStudentItemMapFromCourse(params);
}

export async function getCourseLectureTestAnswer(
  params: LectureParams
): Promise<void> {
  const testItem = await getTestItemMapFromCourse(params); // 다른 방법은?
  if (testItem) {
    await getTestAnswerItemMapFromExam(testItem.id, testItem.questions);
  }
}
