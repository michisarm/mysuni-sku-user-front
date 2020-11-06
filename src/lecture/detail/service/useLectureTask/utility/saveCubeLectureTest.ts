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
import { ExaminationModel } from 'assistant/exam/model/ExaminationModel';
import {
  LectureTestAnswerSheetViewBody,
  registerAnswerSheet,
  modifyAnswerSheet,
} from 'lecture/detail/api/assistantApi';
import {
  getLectureTestAnswerItem,
  getLectureTestItem,
  setLectureTestAnswerItem,
} from 'lecture/detail/store/LectureTestStore';

export async function saveTestAnswerSheet(
  answerSheetId: string,
  pFinished: boolean,
  pSubmitted: boolean
): Promise<void> {
  const testItem = getLectureTestItem();
  const answerItem = getLectureTestAnswerItem();
  // const answerSheetBody: LectureTestAnswerSheetViewBody = {
  //   answers: answerItem.answers,
  //   examId: testItem.id,
  //   examineeEmail: '',
  //   examineeId: patronInfo.getDenizenId() || '',
  //   examineeName: '',
  //   finished: pFinished,
  //   id: answerSheetId,
  //   questionCount: testItem.questionCount,
  //   submitAnswers: answerItem.submitAnswers,
  //   submitted: pSubmitted,
  // };
  // if (answerSheetId !== '') {
  //   await modifyAnswerSheet(answerSheetBody, answerSheetId);
  // } else {
  //   await registerAnswerSheet(answerSheetBody).then(newAnswerSheetId => {
  //     // answerSheetBody.id = newAnswerSheet33Id.result;
  //     // modifyAnswerSheet(answerSheetBody, newAnswerSheetId.result);
  //   });
  // }
}
