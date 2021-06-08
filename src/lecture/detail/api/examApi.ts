import { axiosApi } from '@nara.platform/accent';
import { AnswerSheetSdo } from '../model/AnswerSheet';
import AnswerSheetDetail from '../model/AnswersheetDetail';
import ExamDetail from '../model/ExamDetail';

const BASE_URL = '/api/exam';

export function findExamPaperDetail(
  examPaperIds: string[]
): Promise<ExamDetail> {
  const url = `${BASE_URL}/examPapers/detail`;
  return axiosApi
    .get<ExamDetail>(url, {
      params: examPaperIds,
      paramsSerializer: paramObj => {
        const params = new URLSearchParams();
        paramObj.forEach((key: string) => {
          //params.append(key, paramObj[key]);
          params.append('examPaperIds', key);
        });

        return params.toString();
      },
    })
    .then(response => response && response.data);
}

export function findAnswerSheetsDetail(
  lectureId: string
): Promise<AnswerSheetDetail> {
  const url = `${BASE_URL}/answersheets/detail`;
  return axiosApi
    .get<AnswerSheetDetail>(url, {
      params: { lectureId },
    })
    .then(response => response && response.data);
}

export function saveExamAnswerSheet(
  answerSheetSdo: AnswerSheetSdo
): Promise<string> {
  const url = `${BASE_URL}/answersheets/save`;
  return axiosApi
    .post<string>(url, answerSheetSdo)
    .then(response => response && response.data);
}

export function submitExamAnswerSheet(
  answerSheetSdo: AnswerSheetSdo
): Promise<string> {
  const url = `${BASE_URL}/answersheets/submit`;
  return axiosApi
    .post<string>(url, answerSheetSdo)
    .then(response => response && response.data);
}

export function findAnswerSheetAppliesCount(
  lectureId: string
): Promise<number> {
  const url = `${BASE_URL}/answersheets/applies/count`;
  return axiosApi
    .get<number>(url, {
      params: { lectureId },
    })
    .then(response => response && response.data);
}
