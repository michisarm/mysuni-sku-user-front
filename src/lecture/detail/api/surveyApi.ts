import { axiosApi } from '@nara.platform/accent';
import { AxiosResponse } from 'axios';
import AnswerSheetCdo from '../model/AnswerSheetCdo';
import AnswerSheet from '../model/SurveyAnswerSheet';
import SurveyForm from '../model/SurveyForm';
import SurveySumary from '../model/SurveySummary';
import SurveySummary from '../model/SurveySummary';

const BASE_URL = '/api/survey';

function AxiosReturn<T>(response: AxiosResponse<T>) {
  if (
    response === null ||
    response === undefined ||
    response.data === null ||
    response.data === null ||
    (response.data as unknown) === ''
  ) {
    return undefined;
  }
  return response.data;
}

export function findSurveyForm(surveyFormId: string): Promise<SurveyForm> {
  const url = `${BASE_URL}/surveyForms/${surveyFormId}`;
  return axiosApi
    .get<SurveyForm>(url)
    .then(response => response && response.data);
}

export function findAnswerSheetBySurveyCaseId(
  surveyCaseId: string
): Promise<AnswerSheet | undefined> {
  const url = `${BASE_URL}/answerSheets/bySurveyCaseId?surveyCaseId=${surveyCaseId}`;
  return axiosApi.get<AnswerSheet>(url).then(AxiosReturn);
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

export function findSurveySummaryBySurveyCaseIdAndRound(surveyCaseId: string, round: number): Promise<SurveySummary> {
  const url = `${BASE_URL}/surveySummaries/${surveyCaseId}/rounds/${round}`;
  return axiosApi
    .get<SurveySummary>(url)
    .then(response => response && response.data);
}

export function findAnswerSummariesBySurveySummaryId(surveySummaryId: string): Promise<SurveySummary> {
  const url = `${BASE_URL}/answerSummaries?surveySummaryId=${surveySummaryId}`;
  return axiosApi
    .get<SurveySummary>(url)
    .then(response => response && response.data);
}