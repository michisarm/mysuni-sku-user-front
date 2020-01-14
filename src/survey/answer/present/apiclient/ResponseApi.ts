import axios from 'axios';
import AnswerSheetModel from '../../model/AnswerSheetModel';

export default class ResponseApi {
  //
  rootURL = '/api/survey/response';

  static instance: ResponseApi;

  openAnswerSheet(surveyCaseId: string, round: number, answerSheet: AnswerSheetModel) {
    return axios.post(this.rootURL + `/open/${surveyCaseId}/rounds/${round}`, answerSheet)
      .then((response) => response && response.data || null);
  }

  submitAnswerSheet(answerSheetId: string) {
    return axios.put(this.rootURL + `/complete/${answerSheetId}`);
  }
}

Object.defineProperty(ResponseApi, 'instance', {
  value: new ResponseApi(),
  writable: false,
  configurable: false,
});

