import { axiosApi } from '@nara.platform/accent';
import { AnswerSheetSdo } from '../model/AnswerSheet';
import AnswerSheetDetail from '../model/AnswerSheetDetail';
import ExamDetail from '../model/ExamDetail';
import { SkProfileService } from 'profile/stores';

const BASE_URL = '/api/exam';

function paramsSerializer(paramObj: Record<string, any>) {
  const params = new URLSearchParams();
  for (const key in paramObj) {
    if (paramObj[key] !== undefined) {
      params.append(key, paramObj[key]);
    }
  }
  return params.toString();
}

export function findExamPaperDetail(
  examPaperIds: string[]
): Promise<ExamDetail> {
  const url = `${BASE_URL}/examPapers/detail`;
  return axiosApi
    .get<ExamDetail>(url, {
      params: {
        examPaperIds,
        language: SkProfileService.instance.skProfile.language,
      },
      paramsSerializer,
    })
    .then((response) => response && response.data);
}

export function findAnswerSheetsDetail(
  lectureId: string
): Promise<AnswerSheetDetail> {
  const url = `${BASE_URL}/answersheets/detail`;
  return axiosApi
    .get<AnswerSheetDetail>(url, {
      params: { lectureId },
    })
    .then((response) => response && response.data);
}

export function saveExamAnswerSheet(
  answerSheetSdo: AnswerSheetSdo
): Promise<string> {
  const url = `${BASE_URL}/answersheets/save`;
  return axiosApi
    .post<string>(url, answerSheetSdo)
    .then((response) => response && response.data);
}

export function submitExamAnswerSheet(
  answerSheetSdo: AnswerSheetSdo
): Promise<string> {
  const url = `${BASE_URL}/answersheets/submit`;
  return axiosApi
    .post<string>(url, answerSheetSdo)
    .then((response) => response && response.data);
}

export function findAnswerSheetAppliesCount(
  lectureId: string
): Promise<number> {
  const url = `${BASE_URL}/answersheets/applies/count`;
  return axiosApi
    .get<number>(url, {
      params: { lectureId },
    })
    .then((response) => response && response.data);
}
