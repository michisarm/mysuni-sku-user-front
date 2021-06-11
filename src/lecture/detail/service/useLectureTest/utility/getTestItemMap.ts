/* eslint-disable consistent-return */

import {
  findAnswerSheetsDetail,
  findExamPaperDetail,
} from '../../../api/examApi';
import { LectureTestItem } from '../../../viewModel/LectureTest';
import {
  getLectureTestItem,
  setLectureTestAnswerItem,
  setLectureTestItem,
} from 'lecture/detail/store/LectureTestStore';
import LectureParams from 'lecture/detail/viewModel/LectureParams';
import {
  findCardCache,
  findMyCardRelatedStudentsCache,
} from '../../../api/cardApi';
import { findCubeDetailCache } from '../../../api/cubeApi';
import ExamDetail from '../../../model/ExamDetail';
import Student from '../../../../model/Student';
import {
  initTestAnswerItem,
  getTestAnswerItemFromSheetData,
} from './getTestAnswerItemMapFromExam';

async function getTestItem(
  params: LectureParams,
  serviceId: string,
  examPaperIds: string[]
) {
  let testDetail: ExamDetail | undefined;

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
    student = students.cardStudent || undefined;
  }

  if (student !== undefined && student.extraWork.testStatus !== null) {
    const answerSheetDetail = await findAnswerSheetsDetail(serviceId);
    testDetail = {
      examPaper: answerSheetDetail.examPaper,
      examQuestions: answerSheetDetail.examQuestions,
    };
    const answerItem = await getTestAnswerItemFromSheetData(answerSheetDetail);
    setLectureTestAnswerItem(answerItem);
  } else {
    testDetail = await findExamPaperDetail(examPaperIds);
    const answerItem = await initTestAnswerItem(testDetail.examQuestions);
    setLectureTestAnswerItem(answerItem);
  }
  const item = await getTestItemFromDetailData(testDetail, serviceId);
  setLectureTestItem(item);

  return item;
}

export async function getTestItemFromDetailData(
  testDetail: ExamDetail,
  serviceId: string
): Promise<LectureTestItem> {
  const newItem: LectureTestItem = {
    applyLimit: testDetail?.examPaper.applyLimit,
    id: testDetail?.examPaper.id || '',
    name: testDetail?.examPaper.title,
    questionCount: testDetail?.examQuestions.length || 0,
    questions: testDetail?.examQuestions || [],
    successPoint: testDetail?.examPaper.successPoint,
    totalPoint: testDetail?.examPaper.totalPoint,
    description: testDetail?.examPaper.description || '',
    serviceId,
    paperId: testDetail?.examPaper.id || '',
  };

  return newItem;
}

export async function getTestItemMapFromCourse(
  params: LectureParams
): Promise<LectureTestItem | undefined> {
  if (params.cardId === undefined) {
    return;
  }

  const cardDetail = await findCardCache(params.cardId);
  const examPaperIds: string[] = [];
  cardDetail?.cardContents.tests.map(test => {
    examPaperIds.push(test.paperId);
  });

  const testItem = await getTestItem(params, params.cardId, examPaperIds);
  return testItem;
}

export async function getTestItemMapFromCube(
  params: LectureParams
): Promise<LectureTestItem | undefined> {
  if (params.cubeId === undefined) {
    return;
  }

  const cubeDetail = await findCubeDetailCache(params.cubeId);
  const examPaperIds: string[] = [];
  cubeDetail?.cubeContents.tests.map(test => {
    examPaperIds.push(test.paperId);
  });

  const testItem = await getTestItem(params, params.cubeId, examPaperIds);
  return testItem;
}

// 재응시
export async function retryTestItemMap(params: LectureParams): Promise<void> {
  const serviceId = params.cubeId || params.cardId;
  const examPaperIds: string[] = [];
  if (params.cubeId !== undefined) {
    const cubeDetail = await findCubeDetailCache(params.cubeId);
    cubeDetail?.cubeContents.tests.map(test => {
      examPaperIds.push(test.paperId);
    });
  } else {
    const cardDetail = await findCardCache(params.cardId);
    cardDetail?.cardContents.tests.map(test => {
      examPaperIds.push(test.paperId);
    });
  }

  const testDetail = await findExamPaperDetail(examPaperIds);

  const testItem = await getTestItemFromDetailData(testDetail, serviceId);

  const preTestItem = getLectureTestItem();
  // FAIL한 시험지 정보 계속 유지
  testItem.preSuccessPoint =
    preTestItem?.preSuccessPoint || preTestItem?.successPoint;
  testItem.preTotalPoint =
    preTestItem?.preTotalPoint || preTestItem?.totalPoint;
  testItem.preApplyLimit =
    preTestItem?.preApplyLimit || preTestItem?.applyLimit;
  setLectureTestItem(testItem);

  const answerItem = await initTestAnswerItem(testItem.questions);
  setLectureTestAnswerItem(answerItem);
}
