/* eslint-disable consistent-return */
import { LectureTestAnswerItem } from '../../../viewModel/LectureTest';
import {
  getLectureTestAnswerItem,
  getLectureTestItem,
  setLectureTestAnswerItem,
  setLectureTestItem,
} from 'lecture/detail/store/LectureTestStore';
import {
  findAnswerSheetAppliesCount,
  findAnswerSheetsDetail,
} from '../../../api/examApi';
import ExamQuestion from '../../../model/ExamQuestion';
import LectureParams from '../../../viewModel/LectureParams';
import { getActiveStructureItem } from '../../../utility/lectureStructureHelper';
import AnswerSheetDetail from '../../../model/AnswerSheetDetail';
import { getTestItemFromDetailData } from './getTestItemMap';

async function getTestAnswerItem(pathname: string, lectureId: string) {
  let item = await initTestAnswerItem([]);

  if (lectureId !== '' && lectureId !== null) {
    const structureItem = getActiveStructureItem(pathname);

    if (structureItem?.student?.extraWork.testStatus !== null) {
      const findAnswerSheetData = await findAnswerSheetsDetail(lectureId);

      if (findAnswerSheetData !== null) {
        item = await getTestAnswerItemFromSheetData(findAnswerSheetData, item);
        const testItem = await getTestItemFromDetailData(
          {
            examPaper: findAnswerSheetData.examPaper,
            examQuestions: findAnswerSheetData.examQuestions,
          },
          lectureId
        );
        setLectureTestItem(testItem);
      }
    }
  }

  return item;
}

export async function getTestAnswerItemFromSheetData(
  detail: AnswerSheetDetail,
  item?: LectureTestAnswerItem
) {
  let newItem: LectureTestAnswerItem;
  if (item === undefined) {
    newItem = await initTestAnswerItem(detail.examQuestions);
  } else {
    newItem = item;
  }

  newItem.id = detail.answerSheet.id;
  newItem.answers = detail.answerSheet.answers!;
  //item.submitted = findAnswerSheetData.answerSheet.submitted!;
  //item.submitAnswers = findAnswerSheetData.answerSheet.submitAnswers!;
  //item.finished = findAnswerSheetData.answerSheet.finished!;
  newItem.dataLoadTime = new Date().getTime(); // ???????????? update????????? ??????
  newItem.graderComment = detail.answerSheet.graderComment;
  newItem.obtainedScore = detail.answerSheet.obtainedScore;
  newItem.trials = detail.answerSheet.trials;

  return newItem;
}

export async function getTestAnswerItemMapFromExam(
  questions: ExamQuestion[],
  params: LectureParams
): Promise<void> {
  const lectureId = params.cubeId || params.cardId;
  const answerItem = await getTestAnswerItem(params.pathname, lectureId);
  if (answerItem !== undefined) {
    if (answerItem.answers.length < 1) {
      questions.forEach(result => {
        answerItem.answers.push({
          sequence: result.sequence,
          answer: '',
        });
      });
    }
    setLectureTestAnswerItem(answerItem);
  }
}

export async function checkAnswerSheetAppliesCount(
  lectureId: string
): Promise<boolean> {
  const test = getLectureTestItem();
  const applyLimit = test?.preApplyLimit || test?.applyLimit || 0;
  const appliesCount = await findAnswerSheetAppliesCount(lectureId);

  if (applyLimit !== 0 && applyLimit <= appliesCount) {
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
    obtainedScore: oriAnswerItem?.obtainedScore || 0, // ???????????? init ??? Test ????????? ?????? ???????????? ??????????????? ????????? ????????? ????????? retry????????? 0?????? ??? ???..
    graderComment: '',
    trials: oriAnswerItem?.trials || 0, // ????????? ????????? ??????
  };
  questions.forEach((result, index) => {
    answerItem.answers.push({
      sequence: result.sequence,
      answer: '',
    });
  });

  return answerItem;
}
