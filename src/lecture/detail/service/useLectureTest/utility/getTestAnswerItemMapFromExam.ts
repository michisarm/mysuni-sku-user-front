/* eslint-disable consistent-return */
// report
// http://localhost:3000/api/personalCube/cubeintros/bb028da0-361e-4439-86cf-b544e642215

import { patronInfo } from '@nara.platform/dock';
import { LectureTestAnswerItem } from '../../../viewModel/LectureTest';
import {
  getLectureTestAnswerItem,
  getLectureTestItem,
  setLectureTestAnswerItem,
} from 'lecture/detail/store/LectureTestStore';
import {
  findAnswerSheetAppliesCount,
  findAnswerSheetsDetail,
} from '../../../api/examApi';
import ExamQuestion from '../../../model/ExamQuestion';
import LectureParams from '../../../viewModel/LectureParams';
import { getActiveStructureItem } from '../../../utility/lectureStructureHelper';

// exam
// http://localhost:3000/lp/adm/exam/examinations/CUBE-2k9/findExamination
// http://localhost:3000/lp/adm/exam/exampaper/20-101/findExamPaperForm
// http://localhost:3000/api/assistant/v1/answersheets?examId=CUBE-2jc&examineeId=r47a@ne1-m2

// survey
// http://localhost:3000/api/survey/surveyForms/25e11b3f-85cd-4a05-8dbf-6ae9bd111125
// http://localhost:3000/api/survey/answerSheets/bySurveyCaseId?surveyCaseId=595500ba-227e-457d-a73d-af766b2d68be

async function getTestAnswerItem(
  pathname: string,
  examId: string,
  lectureId: string
) {
  const item = await initTestAnswerItem([]);

  if (lectureId !== '' && lectureId !== null) {
    const structureItem = getActiveStructureItem(pathname);

    if (structureItem?.student?.extraWork.testStatus !== null) {
      const findAnswerSheetData = await findAnswerSheetsDetail(lectureId);

      if (findAnswerSheetData !== null) {
        item.id = findAnswerSheetData.answerSheet.id;
        item.answers = findAnswerSheetData.answerSheet.answers!;
        //item.submitted = findAnswerSheetData.answerSheet.submitted!;
        //item.submitAnswers = findAnswerSheetData.answerSheet.submitAnswers!;
        //item.finished = findAnswerSheetData.answerSheet.finished!;
        item.dataLoadTime = new Date().getTime(); // 화면에서 update용으로 사용
        item.graderComment = findAnswerSheetData.answerSheet.graderComment;
        item.obtainedScore = findAnswerSheetData.answerSheet.obtainedScore;
        item.trials = findAnswerSheetData.answerSheet.trials;
      }
    }

    return item;
  }
}

export async function getTestAnswerItemMapFromExam(
  examId: string,
  questions: ExamQuestion[],
  params: LectureParams
): Promise<void> {
  // void : return이 없는 경우 undefined
  setLectureTestAnswerItem(undefined); // 초기화
  if (examId) {
    const lectureId = params.cubeId || params.cardId;
    const answerItem = await getTestAnswerItem(
      params.pathname,
      examId,
      lectureId
    );
    if (answerItem !== undefined) {
      if (answerItem.answers.length < 1) {
        questions.forEach((result, index) => {
          answerItem.answers.push({
            sequence: result.sequence,
            answer: '',
          });
        });
      }
      console.log('answerItem', answerItem);
      setLectureTestAnswerItem(answerItem);
    }
  }
}

export async function checkAnswerSheetAppliesCount(
  lectureId: string
): Promise<boolean> {
  const test = getLectureTestItem();
  const applyLimit = test?.applyLimit || 0;
  const appliesCount = await findAnswerSheetAppliesCount(lectureId);

  if (applyLimit <= appliesCount) {
    return false;
  }
  return true;
}

export async function initTestAnswerItem(
  questions: ExamQuestion[]
): Promise<LectureTestAnswerItem> {
  const oriAnswerItem = getLectureTestAnswerItem();
  const answerItem: LectureTestAnswerItem = {
    id: '',
    answers: [],
    finished: false,
    dataLoadTime: 0,
    obtainedScore: 0,
    graderComment: '',
    trials: oriAnswerItem?.trials || 0, // 재응시 횟수는 유지
  };
  questions.forEach((result, index) => {
    answerItem.answers.push({
      sequence: result.sequence,
      answer: '',
    });
  });

  setLectureTestAnswerItem(answerItem);
  return answerItem;
}
