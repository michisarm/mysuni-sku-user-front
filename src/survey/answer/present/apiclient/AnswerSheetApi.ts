import { axiosApi as axios } from '@nara.platform/accent';
import AnswerSheetModel from '../../model/AnswerSheetModel';
import EvaluationSheetModel from '../../model/EvaluationSheetModel';

export default class AnswerSheetApi {
  //
  baseUrl = process.env.REACT_APP_ENVIRONMENT === undefined || process.env.REACT_APP_ENVIRONMENT === 'server' ||
  process.env.REACT_APP_ANSWER_SHEET_API === undefined || process.env.REACT_APP_ANSWER_SHEET_API === '' ?
    '/api/survey/answerSheets' : process.env.REACT_APP_ANSWER_SHEET_API;

  static instance: AnswerSheetApi;

  findAnswerSheet(surveyCaseId: string) {
    return axios.get<AnswerSheetModel>(this.baseUrl + `/bySurveyCaseId`, { params: { surveyCaseId }})
      .then((response) => response && response.data && new AnswerSheetModel(response.data) || new AnswerSheetModel());
  }

  modifyAnswerSheet(answerSheet: AnswerSheetModel) {
    const nameValues = AnswerSheetModel.getNameValueList(answerSheet);
    return axios.put(this.baseUrl + `/${answerSheet.id}`, nameValues)
      .then((response) => response && response.data || null);
  }

  modifyEvaluationSheet(answerSheetId: string, evaluationSheet: EvaluationSheetModel) {
    const nameValues = EvaluationSheetModel.getNameValueList(evaluationSheet);
    return axios.put(this.baseUrl + `/${answerSheetId}/evaluationSheet`, nameValues)
      .then((response) => response && response.data || null);
  }
}

Object.defineProperty(AnswerSheetApi, 'instance', {
  value: new AnswerSheetApi(),
  writable: false,
  configurable: false,
});
