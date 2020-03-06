
import { observable, action, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import AnswerApi from '../apiclient/AnswerApi';
import { AnswerModel } from '../../model';


@autobind
class AnswerService {
  //
  static instance: AnswerService;

  answerApi: AnswerApi;

  @observable
  answer: AnswerModel = {} as AnswerModel;

  @observable
  answers: AnswerModel[] = [];

  constructor(answerApi: AnswerApi) {
    this.answerApi = answerApi;
  }

  @action
  async findAnswerByPostId(postId: string) {
    const answer = await this.answerApi.findAnswerByPostId(postId);
    return runInAction(() => this.answer = new AnswerModel(answer));
  }

  @action
  clearAnswer() {
    //
    this.answer = {} as AnswerModel;
  }
}

Object.defineProperty(AnswerService, 'instance', {
  value: new AnswerService(AnswerApi.instance),
  writable: false,
  configurable: false,
});

export default AnswerService;
