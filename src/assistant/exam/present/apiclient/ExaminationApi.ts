import { axiosApi as axios } from '@nara.platform/accent';
import { ExaminationResultModel } from '../../model/ExaminationResultModel';
import { ExaminationModel } from '../../model/ExaminationModel';

export default class ExaminationApi {

  URL = '/lp/adm/exam/examinations';

  // URL = 'http://ma.mysuni.sk.com/lp/adm/exam/examinations';

  static instance: ExaminationApi;

  findExamination(examinationId : string) {
    return axios.get<ExaminationResultModel>(this.URL + `/${examinationId}/findExamination`, { noAuth: true })
      .then((response: any) => response && response.data && response.data.result && new ExaminationModel(response.data.result) || null);
  }
}

Object.defineProperty(ExaminationApi, 'instance', {
  value: new ExaminationApi(),
  writable: false,
  configurable: false,
});
