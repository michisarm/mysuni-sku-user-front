/* eslint-disable consistent-return */

import { getLectureTestItem } from '../../../store/LectureTestStore';
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
  const testItem = getLectureTestItem();
  if (params.cubeId === undefined && params.cardId === testItem?.serviceId) {
    // 중복 호출 방지
    if (testItem) {
      await getTestAnswerItemMapFromExam(
        testItem.id,
        testItem.questions,
        params
      );
    }
  }
}
