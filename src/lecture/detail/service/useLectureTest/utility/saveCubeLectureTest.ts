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
import { getTestStudentItemMapFromLecture } from './getTestStudentItemMapFromLecture';

export async function saveTestAnswerSheet(
  lectureCardId: string,
  answerSheetId: string,
  pFinished: boolean,
  pSubmitted: boolean
): Promise<void> {
  const testItem = getLectureTestItem();
  const answerItem = getLectureTestAnswerItem();
  const testStudentItem = getLectureTestStudentItem();
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
    await getTestStudentItemMapFromLecture(lectureCardId); // student 재호출
  } else {
    await registerAnswerSheet(answerSheetBody).then(newAnswerSheetId => {
      answerSheetBody.id = newAnswerSheetId;
      modifyAnswerSheet(answerSheetBody, newAnswerSheetId);
      if (pFinished) {
        modifyStudentForExam(testStudentItem.studentId, answerSheetBody.examId);
      }
      getTestStudentItemMapFromLecture(lectureCardId); // student 재호출
    });
  }
}
