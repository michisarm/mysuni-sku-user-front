/* eslint-disable consistent-return */
import { getLectureTestItem } from '../../../store/LectureTestStore';
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
  const testItem = getLectureTestItem();
  if (testItem) {
    await getTestAnswerItemMapFromExam(testItem.id, testItem.questions);
  }
}
