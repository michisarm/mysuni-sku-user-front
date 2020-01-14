import { decorate, observable } from 'mobx';
import { AnswerItemModel } from './AnswerItemModel';

export default class AnswerModel {
  //
  questionNumber: string = '';
  answerItem: AnswerItemModel = new AnswerItemModel();

  constructor(answer?: AnswerModel) {
    if (answer) {
      Object.assign(this, answer);
      this.answerItem = new AnswerItemModel(answer.answerItem);
    }
  }
}

decorate(AnswerModel, {
  questionNumber: observable,
  answerItem: observable,
});
