import {
  initUserIdentity,
  UserIdentity,
} from '../../shared/model/UserIdentity';
import AnswerModel from './vo/AnswerModel';
import QuestionModel from './vo/QuestionModel';

export default class QnAModel {
  answer: AnswerModel = new AnswerModel();
  answererIdentity: UserIdentity = initUserIdentity();
  question: QuestionModel = new QuestionModel();
  questionerIdentity: UserIdentity = initUserIdentity();

  constructor(qnaModel?: QnAModel) {
    //
    if (qnaModel) {
      const answer = new AnswerModel(qnaModel.answer);
      const question = new QuestionModel(qnaModel.question);

      Object.assign(this, { ...qnaModel, answer, question });
    }
  }
}
