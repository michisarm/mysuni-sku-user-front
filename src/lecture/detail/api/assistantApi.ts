import { axiosApi } from '@nara.platform/accent';
import Answer from '../model/Answer';
import AnswerSheet from '../model/AnswerSheet';

const BASE_URL = '/api/assistant/v1';

interface FindAnswerSheetData {
  result: AnswerSheet | null;
}

export function findAnswerSheet(
  examId: string,
  examineeId: string
): Promise<FindAnswerSheetData> {
  const url = `${BASE_URL}/answersheets?examId=${examId}&examineeId=${examineeId}`;
  return axiosApi
    .get<FindAnswerSheetData>(url)
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
