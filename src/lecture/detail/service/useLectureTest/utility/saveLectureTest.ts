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
import {
  saveExamAnswerSheet,
  submitExamAnswerSheet,
} from '../../../api/examApi';
import { AnswerSheetSdo, ItemAnswer } from '../../../model/AnswerSheet';
import { findCubeStudent } from '../../../utility/findCubeStudent';
import LectureParams from '../../../viewModel/LectureParams';

export async function saveCourseTestAnswerSheet(
  params: LectureParams,
  answerSheetId: string,
  pFinished: boolean,
  pSubmitted: boolean
): Promise<void> {
  /*const testItem = getLectureTestItem();
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
  }*/
}

export async function saveCubeTestAnswerSheet(
  params: LectureParams,
  answerSheetId: string,
  pFinished: boolean,
  pSubmitted: boolean
): Promise<void> {
  /*const relatedStudents = await findMyCardRelatedStudentsCache(params.cardId);

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
   answerSheetBody: LectureTestAnswerSheetViewBody = {
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
  }*/
}

export async function saveLectureTestAnswerSheet(params: LectureParams) {
  const lectureId = params.cubeId || params.cardId;

  if (lectureId === undefined) {
    return;
  }

  const testItem = getLectureTestItem();
  const answerItem = getLectureTestAnswerItem();

  const itemAnswers: ItemAnswer[] = [];
  answerItem?.answers.map((answer) => {
    const itemAnswer: ItemAnswer = {
      answer: answer.answer,
      obtainedScore: 0,
      sequence: answer.sequence,
    };
    itemAnswers.push(itemAnswer);
  });

  const answerSheetSdo: AnswerSheetSdo = {
    answerState: 'SAVE',
    answers: itemAnswers,
    examPaperId: testItem?.paperId || '',
    lectureId,
  };

  await saveExamAnswerSheet(answerSheetSdo);
}

export async function submitLectureTestAnswerSheet(params: LectureParams) {
  const lectureId = params.cubeId || params.cardId;

  if (lectureId === undefined) {
    return;
  }

  const testItem = getLectureTestItem();
  const answerItem = getLectureTestAnswerItem();

  const itemAnswers: ItemAnswer[] = [];
  answerItem?.answers.map((answer) => {
    const itemAnswer: ItemAnswer = {
      answer: answer.answer,
      obtainedScore: 0,
      sequence: answer.sequence,
    };
    itemAnswers.push(itemAnswer);
  });

  const answerSheetSdo: AnswerSheetSdo = {
    answerState: 'SUBMIT',
    answers: itemAnswers,
    examPaperId: testItem?.paperId || '',
    lectureId,
  };

  await submitExamAnswerSheet(answerSheetSdo);
}
