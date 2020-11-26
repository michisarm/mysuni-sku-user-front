/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

import { patronInfo } from '@nara.platform/dock';
import { findAnswerSheet } from '../../../api/assistantApi';
import { LectureTestAnswerItem } from '../../../viewModel/LectureTest';
import { setLectureTestAnswerItem } from 'lecture/detail/store/LectureTestStore';
import ExamQuestion from 'lecture/detail/model/ExamQuestion';

// exam
// http://localhost:3000/lp/adm/exam/examinations/CUBE-2k9/findExamination
// http://localhost:3000/lp/adm/exam/exampaper/20-101/findExamPaperForm
// http://localhost:3000/api/assistant/v1/answersheets?examId=CUBE-2jc&examineeId=r47a@ne1-m2

// survey
// http://localhost:3000/api/survey/surveyForms/25e11b3f-85cd-4a05-8dbf-6ae9bd111125
// http://localhost:3000/api/survey/answerSheets/bySurveyCaseId?surveyCaseId=595500ba-227e-457d-a73d-af766b2d68be

async function getTestAnswerItem(examId: string) {
  const item: LectureTestAnswerItem = {
    id: '',
    answers: [],
    submitted: false,
    submitAnswers: [],
    finished: false,
    dataLoadTime: 0,
  };

  if (examId !== '' && examId !== null) {
    const denizenId = patronInfo.getDenizenId(); // denizenId는 파라메터로 넘기지 않고 서버단에서 해결할 것
    if (denizenId !== undefined) {
      const findAnswerSheetData = await findAnswerSheet(examId, denizenId);

      if (findAnswerSheetData.result !== null) {
        item.id = findAnswerSheetData.result.id;
        item.answers = findAnswerSheetData.result.answers!;
        item.submitted = findAnswerSheetData.result.submitted!;
        item.submitAnswers = findAnswerSheetData.result.submitAnswers!;
        item.finished = findAnswerSheetData.result.finished!;
        item.dataLoadTime = new Date().getTime(); // 화면에서 update용으로 사용
      }
    }

    return item;
  }
}

export async function getTestAnswerItemMapFromExam(
  examId: string,
  questions: ExamQuestion[]
): Promise<void> {
  // void : return이 없는 경우 undefined
  if (examId) {
    const answerItem = await getTestAnswerItem(examId);
    if (answerItem !== undefined) {
      if (answerItem.answers.length < 1) {
        questions.forEach((result, index) => {
          answerItem.answers.push({
            questionNo: result.questionNo,
            answer: '',
          });
        });
      }

      setLectureTestAnswerItem(answerItem);
    }
  }
}
