import { axiosApi as axios } from '@nara.platform/accent';
import { AnswerSheetResultModel } from '../../model/AnswerSheetResultModel';
import { AnswerSheetModel } from '../../model/AnswerSheetModel';

export default class AnswerSheetApi {

  URL = '/api/assistant/v1/answersheets';

  static instance: AnswerSheetApi;

  registerAnswerSheet(answerSheet: AnswerSheetModel) {
    return axios.post<string>(this.URL, answerSheet, { noAuth: true })
      .then(response => response && response.data || '');
  }

  modifyAnswerSheet(sheetId: string, answerSheet: AnswerSheetModel) {
    return axios.put<string>(this.URL + `/${sheetId}`, answerSheet, { noAuth: true })
      .then(response => response && response.data || '');
  }

  findAnswerSheet(examId : string, examineeId: string) {
    return axios.get<AnswerSheetResultModel>(this.URL, { noAuth: true, params: { examId, examineeId }})
      .then((response: any) => response && response.data && response.data.result && new AnswerSheetModel(response.data.result) || new AnswerSheetModel());
  }
}

Object.defineProperty(AnswerSheetApi, 'instance', {
  value: new AnswerSheetApi(),
  writable: false,
  configurable: false,
});
