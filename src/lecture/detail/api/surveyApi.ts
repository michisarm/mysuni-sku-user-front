import { axiosApi } from '@nara.platform/accent';
import AnswerSheetCdo from '../model/AnswerSheetCdo';
import AnswerSheet from '../model/SurveyAnswerSheet';
import SurveyForm from '../model/SurveyForm';

const BASE_URL = '/api/survey';

export function findSurveyForm(surveyFormId: string): Promise<SurveyForm> {
  const url = `${BASE_URL}/surveyForms/${surveyFormId}`;
  return axiosApi
    .get<SurveyForm>(url)
    .then(response => response && response.data);
}

export function findAnswerSheetBySurveyCaseId(
  surveyCaseId: string
): Promise<AnswerSheet> {
  const url = `${BASE_URL}/answerSheets/bySurveyCaseId?surveyCaseId=${surveyCaseId}`;
  return axiosApi
    .get<AnswerSheet>(url)
    .then(response => response && response.data);
}

export function openAnswerSheet(
  surveyCaseId: string,
  round: number,
  answerSheetCdo: AnswerSheetCdo
): Promise<string> {
  const url = `${BASE_URL}/response/open/${surveyCaseId}/rounds/${round}`;
  return axiosApi
    .post<string>(url, answerSheetCdo)
    .then(response => response && response.data);
}

export function saveAnswerSheet(
  surveyCaseId: string,
  round: number,
  answerSheetCdo: AnswerSheetCdo
): Promise<string> {
  const url = `${BASE_URL}/response/save/${surveyCaseId}/rounds/${round}`;
  return axiosApi
    .put(url, answerSheetCdo)
    .then(response => response && response.data);
}

export function submitAnswerSheet(
  surveyCaseId: string,
  round: number,
  answerSheetCdo: AnswerSheetCdo
): Promise<string> {
  const url = `${BASE_URL}/response/complete/${surveyCaseId}/rounds/${round}`;
  return axiosApi
    .put(url, answerSheetCdo)
    .then(response => response && response.data);
}
