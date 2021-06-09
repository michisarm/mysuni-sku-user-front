/* eslint-disable consistent-return */
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
import AnswerSheetDetail from '../../../model/AnswersheetDetail';

async function getTestAnswerItem(pathname: string, lectureId: string) {
  let item = await initTestAnswerItem([]);

  if (lectureId !== '' && lectureId !== null) {
    const structureItem = getActiveStructureItem(pathname);

    if (structureItem?.student?.extraWork.testStatus !== null) {
      const findAnswerSheetData = await findAnswerSheetsDetail(lectureId);

      if (findAnswerSheetData !== null) {
        item = await getTestAnswerItemFromSheetData(findAnswerSheetData, item);
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
  newItem.dataLoadTime = new Date().getTime(); // 화면에서 update용으로 사용
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
    obtainedScore: oriAnswerItem?.obtainedScore || 0, // 재응시로 init 후 Test 메뉴를 다시 클릭하면 결과화면의 점수가 보이기 때문에 retry시에는 0이면 안 됨..
    graderComment: '',
    trials: oriAnswerItem?.trials || 0, // 재응시 횟수는 유지
  };
  questions.forEach((result, index) => {
    answerItem.answers.push({
      sequence: result.sequence,
      answer: '',
    });
  });

  return answerItem;
}
