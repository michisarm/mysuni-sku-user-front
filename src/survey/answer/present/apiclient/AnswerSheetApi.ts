import { axiosApi as axios } from '@nara.platform/accent';
import AnswerSheetModel from '../../model/AnswerSheetModel';
import EvaluationSheetModel from '../../model/EvaluationSheetModel';

export default class AnswerSheetApi {
  //
  rootURL = '/api/survey/answerSheets';
  // rootURL = 'http://ma.mysuni.sk.com/api/survey/answerSheets';

  static instance: AnswerSheetApi;

  findAnswerSheet(surveyCaseId: string) {
    return axios.get<AnswerSheetModel>(this.rootURL + `/bySurveyCaseId`, { params: { surveyCaseId }})
      .then((response) => response && response.data && new AnswerSheetModel(response.data) || new AnswerSheetModel());
  }

  modifyAnswerSheet(answerSheet: AnswerSheetModel) {
    const nameValues = AnswerSheetModel.getNameValueList(answerSheet);
    return axios.put(this.rootURL + `/${answerSheet.id}`, nameValues)
      .then((response) => response && response.data || null);
  }

  modifyEvaluationSheet(answerSheetId: string, evaluationSheet: EvaluationSheetModel) {
    const nameValues = EvaluationSheetModel.getNameValueList(evaluationSheet);
    return axios.put(this.rootURL + `/${answerSheetId}/evaluationSheet`, nameValues)
      .then((response) => response && response.data || null);
  }
}

Object.defineProperty(AnswerSheetApi, 'instance', {
  value: new AnswerSheetApi(),
  writable: false,
  configurable: false,
});
