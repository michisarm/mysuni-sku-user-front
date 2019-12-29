import { axiosApi as axios } from '@nara.platform/accent';
import { AnswerModel } from '../../model/AnswerModel';

export default class AnswerApi {

  URL = '/api/board/posts/answer';

  static instance: AnswerApi;

  findAnswerByPostId(postId : string) {
    return axios.get<AnswerModel>(this.URL + `/matched/${postId}`)
      .then(response => response && response.data || null);
  }
}

Object.defineProperty(AnswerApi, 'instance', {
  value: new AnswerApi(),
  writable: false,
  configurable: false,
});
