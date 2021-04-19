/* eslint-disable consistent-return */

import { findExamination, findExamPaperForm } from '../../../api/examApi';
import { LectureTestItem } from '../../../viewModel/LectureTest';
import { setLectureTestItem } from 'lecture/detail/store/LectureTestStore';
import LectureParams from 'lecture/detail/viewModel/LectureParams';
import {
  findByCardId,
  findMyCardRelatedStudentsCache,
  getStudentExam,
} from '../../../api/cardApi';
import { patronInfo } from '@nara.platform/dock';
import { findGradeSheet } from '../../../api/assistantApi';
import { getEssayScores } from '../../../model/GradeSheet';
import { ExtraTaskStatus } from '../../../../model/ExtraTaskStatus';
import Student from '../../../../model/Student';

async function getTestItem(examId: string, testStatus: ExtraTaskStatus) {
  if (examId !== '' && examId !== null) {
    let examination = null;
    {
      const { result } = await findExamination(examId);
      examination = result;
    }

    const { result: examPaperForm } = await findExamPaperForm(
      examination.paperId
    );
    let examTotalPoint = 0;
    examPaperForm.questions.map((result, index) => {
      examTotalPoint += result.allocatedPoint;
    });

    const denizenId = patronInfo.getDenizenId() || '';
    let gradeSheet;
    if (testStatus !== null && testStatus !== 'SAVE') {
      gradeSheet = await findGradeSheet(examId, denizenId);
    }
    const graderComment = (gradeSheet && gradeSheet.graderComment) || '';
    const essayScores = (gradeSheet && getEssayScores(gradeSheet)) || [];

    const item: LectureTestItem = {
      id: examination.id,
      name: examination.examPaperTitle,
      questionCount: examination.questionCount,
      questions: examPaperForm.questions,
      successPoint: examination.successPoint,
      totalPoint: examTotalPoint,
      graderComment,
      essayScores,
      description: examPaperForm.description,
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

  const testItem = await getTestItem(examId, student.extraWork.testStatus);
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

  const students = await findMyCardRelatedStudentsCache(params.cardId);
  if (students === undefined) {
    return;
  }

  let student: Student | undefined;
  students.cubeStudents?.forEach(cubeStudent => {
    if (cubeStudent.lectureId === params.cubeId) {
      student = cubeStudent;
    }
  });
  if (student === undefined) {
    return;
  }

  let examId = student.studentScore.examId;
  if (examId === null || examId === '') {
    const test = await getStudentExam(student.id);
    if (test === undefined) {
      return;
    }
    examId = test.testId;
  }

  const testItem = await getTestItem(examId, student.extraWork.testStatus);
  if (testItem !== undefined) {
    setLectureTestItem(testItem);
  }
  return testItem;
}
