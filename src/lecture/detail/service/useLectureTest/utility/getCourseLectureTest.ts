/* eslint-disable consistent-return */

import LectureParams from '../../../viewModel/LectureParams';
import { getTestAnswerItemMapFromExam } from './getTestAnswerItemMapFromExam';
import { getTestItemMapFromCourse } from './getTestItemMap';
import { getTestStudentItemMapFromCourse } from './getTestStudentItemMap';

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
