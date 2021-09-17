import {
  initUserIdentity,
  UserIdentity,
} from '../../shared/model/UserIdentity';
import AnswerModel from './vo/AnswerModel';
import QuestionModel from './vo/QuestionModel';
import LatestOperatorSentEmail from './sdo/LatestOperatorSentEmail';
import { decorate, observable } from 'mobx';

export default class QnAModel {
  answer: AnswerModel = new AnswerModel();
  inquirerIdentity: UserIdentity = initUserIdentity();
  question: QuestionModel = new QuestionModel();
  operators: UserIdentity[] = [];
  latestOperatorSentEmail: LatestOperatorSentEmail = new LatestOperatorSentEmail();
  // questionerIdentity: UserIdentity = initUserIdentity();

  // email 발송 여부
  checkMail: boolean = false;

  constructor(qnaModel?: QnAModel) {
    //
    if (qnaModel) {
      const answer = new AnswerModel(qnaModel.answer);
      const question = new QuestionModel(qnaModel.question);

      Object.assign(this, { ...qnaModel, answer, question });
    }
  }
}

decorate(QnAModel, {
  answer: observable,
  inquirerIdentity: observable,
  question: observable,
  operators: observable,
  latestOperatorSentEmail: observable,
  checkMail: observable,
});
