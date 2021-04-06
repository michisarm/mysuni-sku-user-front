/* eslint-disable consistent-return */

import { findExamination, findExamPaperForm } from '../../../api/examApi';
import { LectureTestItem } from '../../../viewModel/LectureTest';
import { setLectureTestItem } from 'lecture/detail/store/LectureTestStore';
import LectureParams from 'lecture/detail/viewModel/LectureParams';
import {
  findByCardId,
  findByCubeId,
  getStudentExam,
} from '../../../api/cardApi';

async function getTestItem(examId: string) {
  if (examId !== '' && examId !== null) {
    let examination = null;
    {
      const { result } = await findExamination(examId);
      examination = result;
    }

    const { result: examPaperForm } = await findExamPaperForm(
      examination.paperId
    );

    const item: LectureTestItem = {
      id: examination.id,
      questionCount: examination.questionCount,
      questions: examPaperForm.questions,
    };
    return item;
  }
}

export async function getTestItemMapFromCourse(
  params: LectureParams
): Promise<LectureTestItem | undefined> {
  const student = await findByCardId(params.cardId);
  if (student === undefined) {
    return;
  }
  let examId = student.studentScore.examId;
  if (examId === null) {
    const test = await getStudentExam(student.id);
    if (test === undefined) {
      return;
    }
    examId = test.testId;
  }

  const testItem = await getTestItem(examId);
  if (testItem !== undefined) {
    setLectureTestItem(testItem);
  }
  return testItem;
}

export async function getTestItemMapFromCube(
  params: LectureParams
): Promise<LectureTestItem | undefined> {
  if (params.cubeId === undefined) {
    return;
  }

  const student = await findByCubeId(params.cubeId);
  if (student === undefined) {
    return;
  }
  let examId = student.studentScore.examId;
  if (examId === null) {
    const test = await getStudentExam(student.id);
    if (test === undefined) {
      return;
    }
    examId = test.testId;
  }

  const testItem = await getTestItem(examId);
  if (testItem !== undefined) {
    setLectureTestItem(testItem);
  }
  return testItem;
}
