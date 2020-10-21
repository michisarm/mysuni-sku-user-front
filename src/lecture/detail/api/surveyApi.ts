import { axiosApi } from '@nara.platform/accent';
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
