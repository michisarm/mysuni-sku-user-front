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
    await getTestStudentItemMapFromCourse(params); // student 재호출
    await getTestAnswerItemMapFromExam(testItem.id, testItem.questions); // answer 재호출
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
      await getTestStudentItemMapFromCourse(params); // student 재호출
      await getTestAnswerItemMapFromExam(testItem.id, testItem.questions); // answer 재호출
    });
  }
}

export async function saveCubeTestAnswerSheet(
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
    await getTestStudentItemMapFromCube(params); // student 재호출
    await getTestAnswerItemMapFromExam(testItem.id, testItem.questions); // answer 재호출
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
      await getTestStudentItemMapFromCube(params); // student 재호출
      await getTestAnswerItemMapFromExam(testItem.id, testItem.questions); // answer 재호출
    });
  }
}
