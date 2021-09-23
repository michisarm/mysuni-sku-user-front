import {
  initUserIdentity,
  UserIdentity,
} from '../../shared/model/UserIdentity';
import AnswerModel from './vo/AnswerModel';
import QuestionModel from './QuestionModel';
import LatestOperatorSentEmail from './sdo/LatestOperatorSentEmail';
import { decorate, observable } from 'mobx';
import QuestionSdo from './sdo/QuestionSdo';

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

  static asQuestionSdo(qna: QnAModel): QuestionSdo {
    //
    const { question } = qna;
    return {
      requestChannel: question.requestChannel,

      mainCategoryId: question.mainCategoryId,
      subCategoryId: question.subCategoryId,

      relatedCardId: question.relatedCardId,
      relatedQuestionId: question.relatedQuestionId,

      title: question.title,
      content: question.content,

      depotId: question.depotId,
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
