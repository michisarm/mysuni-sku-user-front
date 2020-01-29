import { axiosApi as axios } from '@nara.platform/accent';
import AnswerSheetModel from '../../model/AnswerSheetModel';

export default class ResponseApi {
  //
  rootURL = '/api/survey/response';

  static instance: ResponseApi;

  openAnswerSheet(surveyCaseId: string, round: number, answerSheet: AnswerSheetModel) {
    return axios.post(this.rootURL + `/open/${surveyCaseId}/rounds/${round}`, answerSheet)
      .then((response) => response && response.data || null);
  }

  submitAnswerSheet(answerSheetId: string, round: number, answerSheet: AnswerSheetModel) {
    return axios.put(this.rootURL + `/complete/${answerSheetId}/rounds/${round}`, answerSheet);
  }
}

Object.defineProperty(ResponseApi, 'instance', {
  value: new ResponseApi(),
  writable: false,
  configurable: false,
});

