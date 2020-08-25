import { axiosApi as axios } from '@nara.platform/accent';
import { AnswerSheetResultModel } from '../../model/AnswerSheetResultModel';
import { AnswerSheetModel } from '../../model/AnswerSheetModel';

export default class AnswerSheetApi {

  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_ASSISTANT_SHEET_API === undefined || process.env.REACT_APP_ASSISTANT_SHEET_API === '' ?
    '/api/assistant/v1/answersheets' : process.env.REACT_APP_ASSISTANT_SHEET_API;

  static instance: AnswerSheetApi;

  registerAnswerSheet(answerSheet: AnswerSheetModel) {
    return axios.post<string>(this.baseUrl, answerSheet, { noAuth: true })
      .then(response => response && response.data || '');
  }

  modifyAnswerSheet(sheetId: string, answerSheet: AnswerSheetModel) {
    return axios.put<string>(this.baseUrl + `/${sheetId}`, answerSheet, { noAuth: true })
      .then(response => response && response.data || '');
  }

  findAnswerSheet(examId : string, examineeId: string) {
    return axios.get<AnswerSheetResultModel>(this.baseUrl, { noAuth: true, params: { examId, examineeId }})
      .then((response: any) => response && response.data && response.data.result
        && new AnswerSheetModel(response.data.result) || new AnswerSheetModel());
  }
}

Object.defineProperty(AnswerSheetApi, 'instance', {
  value: new AnswerSheetApi(),
  writable: false,
  configurable: false,
});
