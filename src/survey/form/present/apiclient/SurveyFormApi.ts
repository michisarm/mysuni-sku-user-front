import { axiosApi as axios } from '@nara.platform/accent';
import { SurveyFormModel } from '../../model/SurveyFormModel';

export default class SurveyFormApi {
  // URL = '/api/survey/surveyForms';
  URL = 'http://ma.mysuni.sk.com/api/survey/surveyForms';

  static instance: SurveyFormApi;

  findSurvey(surveyId: string) {
    //
    return axios.get<SurveyFormModel>(this.URL + `/${surveyId}`)
      .then(response => response && response.data || null);
  }

}

Object.defineProperty(SurveyFormApi, 'instance', {
  value: new SurveyFormApi(),
  writable: false,
  configurable: false,
});
