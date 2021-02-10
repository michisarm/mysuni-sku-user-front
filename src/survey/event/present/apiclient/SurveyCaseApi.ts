import { axiosApi as axios } from '@nara.platform/accent';
import SurveyCaseModel from '../../model/SurveyCaseModel';

export default class SurveyCaseApi {
  //
  rootURL = '/api/survey/surveyCases';
  // rootURL = 'http://ma.mysuni.sk.com/api/survey/surveyCases';

  static instance: SurveyCaseApi;

  findSurveyCase(surveyCaseId: string) {
    return axios.get<SurveyCaseModel>(this.rootURL + `/${surveyCaseId}`).then(({ data }) => new SurveyCaseModel(data));
  }

  findSurveyCaseByFeed(surveyCaseId: string) {
    //return axios.get<SurveyCaseModel>(this.URL + `/${surveyCaseId}`).then((response) => response && response.data);
    return axios.get(this.rootURL + `/${surveyCaseId}`).then((response) => response && response.data);
  }

}

Object.defineProperty(SurveyCaseApi, 'instance', {
  value: new SurveyCaseApi(),
  writable: false,
  configurable: false,
});

