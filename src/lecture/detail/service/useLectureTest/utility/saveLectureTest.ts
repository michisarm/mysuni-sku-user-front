/* eslint-disable consistent-return */
import { patronInfo } from '@nara.platform/dock';
import {
  LectureTestAnswerSheetViewBody,
  registerAnswerSheet,
  modifyAnswerSheet,
} from 'lecture/detail/api/assistantApi';
import { modifyStudentForExam } from 'lecture/detail/api/lectureApi';
import {
  getLectureTestAnswerItem,
  getLectureTestItem,
  getLectureTestStudentItem,
} from 'lecture/detail/store/LectureTestStore';
import { findMyCardRelatedStudentsCache } from '../../../api/cardApi';
import { findCubeStudent } from '../../../utility/findCubeStudent';
import LectureParams from '../../../viewModel/LectureParams';
import { getTestAnswerItemMapFromExam } from './getTestAnswerItemMapFromExam';
import {
  getTestStudentItemMapFromCourse,
  getTestStudentItemMapFromCube,
} from './getTestStudentItemMap';

export async function saveCourseTestAnswerSheet(
  params: LectureParams,
  answerSheetId: string,
  pFinished: boolean,
  pSubmitted: boolean
): Promise<void> {
  const testItem = getLectureTestItem();
  const answerItem = getLectureTestAnswerItem();
  const testStudentItem = getLectureTestStudentItem();
  if (
    testItem === undefined ||
    answerItem === undefined ||
    testStudentItem == undefined
  ) {
    return;
  }
  const answerSheetBody: LectureTestAnswerSheetViewBody = {
    answers: answerItem.answers,
    examId: testItem.id,
    examineeEmail: '',
    examineeId: patronInfo.getDenizenId() || '',
    examineeName: '',
    finished: pFinished,
    id: answerSheetId,
    questionCount: testItem.questionCount,
    submitAnswers: answerItem.submitAnswers,
    submitted: pSubmitted,
  };
  if (answerSheetId !== '') {
    await modifyAnswerSheet(answerSheetBody, answerSheetId);
    if (pFinished) {
      await modifyStudentForExam(
        testStudentItem.studentId,
        answerSheetBody.examId
      );
    }
    //await getTestStudentItemMapFromCourse(params); // student 재호출
    //await getTestAnswerItemMapFromExam(testItem.id, testItem.questions); // answer 재호출
  } else {
    await registerAnswerSheet(answerSheetBody).then(async newAnswerSheetId => {
      answerSheetBody.id = newAnswerSheetId;
      await modifyAnswerSheet(answerSheetBody, newAnswerSheetId);
      if (pFinished) {
        await modifyStudentForExam(
          testStudentItem.studentId,
          answerSheetBody.examId
        );
      }
      //await getTestStudentItemMapFromCourse(params); // student 재호출
      //await getTestAnswerItemMapFromExam(testItem.id, testItem.questions); // answer 재호출
    });
  }
}

export async function saveCubeTestAnswerSheet(
  params: LectureParams,
  answerSheetId: string,
  pFinished: boolean,
  pSubmitted: boolean
): Promise<void> {
  const relatedStudents = await findMyCardRelatedStudentsCache(params.cardId);

  const testItem = getLectureTestItem();
  const answerItem = getLectureTestAnswerItem();
  const testStudentItem = getLectureTestStudentItem();
  if (
    testItem === undefined ||
    answerItem === undefined ||
    testStudentItem === undefined ||
    relatedStudents === undefined ||
    params.cubeId === undefined
  ) {
    return;
  }
  const student = findCubeStudent(params.cubeId, relatedStudents.cubeStudents);
  if (student === undefined) {
    return;
  }
  const answerSheetBody: LectureTestAnswerSheetViewBody = {
    answers: answerItem.answers,
    examId: testItem.id,
    examineeEmail: '',
    examineeId: patronInfo.getDenizenId() || '',
    examineeName: '',
    finished: pFinished,
    id: answerSheetId,
    questionCount: testItem.questionCount,
    submitAnswers: answerItem.submitAnswers,
    submitted: pSubmitted,
  };
  if (answerSheetId !== '') {
    await modifyAnswerSheet(answerSheetBody, answerSheetId);
    if (pFinished) {
      await modifyStudentForExam(student.id, answerSheetBody.examId);
    }
    //await getTestStudentItemMapFromCube(params); // student 재호출
    //await getTestAnswerItemMapFromExam(testItem.id, testItem.questions); // answer 재호출
  } else {
    await registerAnswerSheet(answerSheetBody).then(async newAnswerSheetId => {
      answerSheetBody.id = newAnswerSheetId;
      await modifyAnswerSheet(answerSheetBody, newAnswerSheetId);
      if (pFinished) {
        await modifyStudentForExam(student.id, answerSheetBody.examId);
      }
      //await getTestStudentItemMapFromCube(params); // student 재호출
      //await getTestAnswerItemMapFromExam(testItem.id, testItem.questions); // answer 재호출
    });
  }
}
