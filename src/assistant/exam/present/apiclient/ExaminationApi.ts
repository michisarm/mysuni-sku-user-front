import { axiosApi as axios } from '@nara.platform/accent';
import { ExaminationResultModel } from '../../model/ExaminationResultModel';
import { ExaminationModel } from '../../model/ExaminationModel';

export default class ExaminationApi {

  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_EXAMINATION_API === undefined || process.env.REACT_APP_EXAMINATION_API === '' ?
    '/lp/adm/exam/examinations' : process.env.REACT_APP_EXAMINATION_API;

  static instance: ExaminationApi;

  findExamination(examinationId : string) {
    return axios.get<ExaminationResultModel>(this.baseUrl + `/${examinationId}/findExamination`, { noAuth: true })
      .then((response: any) => response && response.data && response.data.result && new ExaminationModel(response.data.result) || null);
  }
}

Object.defineProperty(ExaminationApi, 'instance', {
  value: new ExaminationApi(),
  writable: false,
  configurable: false,
});
