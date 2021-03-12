import { axiosApi } from '@nara.platform/accent';
import { AxiosResponse } from 'axios';
import Answer from '../model/Answer';
import AnswerSheet from '../model/AnswerSheet';
import { GradeSheet } from '../model/GradeSheet';

const BASE_URL = '/api/assistant/v1';

interface FindAnswerSheetData {
  result: AnswerSheet | null;
}

export function findAnswerSheet(
  examId: string,
  examineeId: string
): Promise<FindAnswerSheetData> {
  const url = `${BASE_URL}/answersheets?examId=${examId}&examineeId=${examineeId}&t=${Date.now()}`;
  return axiosApi
    .get<FindAnswerSheetData>(url, { headers: { 'Pragma': 'no-cache' } })
    .then(response => response && response.data);
}

export interface LectureTestAnswerSheetViewBody {
  answers: Answer[];
  examId: string;
  examineeEmail: string;
  examineeId: string;
  examineeName: string;
  finished: boolean;
  id: string;
  questionCount: number;
  submitAnswers: Answer[];
  submitted: boolean;
}

export interface stringResult {
  result: string;
}

export function registerAnswerSheet(
  answerSheet: LectureTestAnswerSheetViewBody
): Promise<string> {
  const url = `${BASE_URL}/answersheets`;
  return axiosApi
    .post<stringResult>(url, answerSheet)
    .then(response => response && response.data && response.data.result);
}

export function modifyAnswerSheet(
  answerSheet: LectureTestAnswerSheetViewBody,
  sheetId: string
): Promise<string> {
  const url = `${BASE_URL}/answersheets/${sheetId}`;
  return axiosApi
    .put<stringResult>(url, answerSheet)
    .then(response => response && response.data && response.data.result);
}

interface ResponseBodyWithResult<T = any> {
  result: T;
}

function gradeSheetReturn(response: AxiosResponse<ResponseBodyWithResult>) {
  if (
    response === null ||
    response === undefined ||
    response.data === null ||
    response.data === undefined ||
    (response.data as unknown) === '' ||
    response.data.result === null ||
    response.data.result === undefined ||
    (response.data.result as unknown) === ''
  ) {
    return undefined;
  }
  return response.data.result;
}

export function findGradeSheet(
  examId: string,
  examineeId: string
): Promise<GradeSheet | undefined> {
  const gradeSheetId = `${examId}-${examineeId}`;
  const url = `${BASE_URL}/gradesheets/${gradeSheetId}`;

  return axiosApi
    .get<ResponseBodyWithResult<GradeSheet>>(url)
    .then(gradeSheetReturn)
    .catch(error => error && undefined);
}