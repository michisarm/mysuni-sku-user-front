import { axiosApi as axios } from '@nara.platform/accent';
import { SurveyFormModel } from '../../model/SurveyFormModel';

export default class SurveyFormApi {

  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_SURVEY_FORM_API === undefined || process.env.REACT_APP_SURVEY_FORM_API === '' ?
    '/api/survey/surveyForms' : process.env.REACT_APP_SURVEY_FORM_API;

  static instance: SurveyFormApi;

  findSurvey(surveyId: string) {
    //
    return axios.get<SurveyFormModel>(this.baseUrl + `/${surveyId}`)
      .then(response => response && response.data || null);
  }

}

Object.defineProperty(SurveyFormApi, 'instance', {
  value: new SurveyFormApi(),
  writable: false,
  configurable: false,
});
