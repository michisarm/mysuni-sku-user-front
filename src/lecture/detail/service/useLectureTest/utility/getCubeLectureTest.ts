/* eslint-disable consistent-return */
import LectureParams from '../../../viewModel/LectureParams';
import { getTestAnswerItemMapFromExam } from './getTestAnswerItemMapFromExam';
import { getTestItemMapFromCube } from './getTestItemMap';
import { getTestStudentItemMapFromCube } from './getTestStudentItemMap';

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
