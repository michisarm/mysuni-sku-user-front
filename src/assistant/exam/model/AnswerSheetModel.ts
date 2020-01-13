import { decorate, observable } from 'mobx';
import { ItemAnswerModel } from './ItemAnswerModel';

export class AnswerSheetModel {
  //
  id: string = '';
  examineeId: string = '';
  examineeEmail: string = '';
  examineeName: string = '';
  questionCount: number = 0;
  finished: boolean = false;
  examId: string = '';
  answers: ItemAnswerModel[] = [];

  constructor(answerSheet?: AnswerSheetModel) {
    if (answerSheet) {
      const answers = answerSheet.answers && answerSheet.answers.length
        && answerSheet.answers.map(answer => new ItemAnswerModel(answer));
      Object.assign(this, { ...answerSheet, answers });
    }
  }

}

decorate(AnswerSheetModel, {
  id: observable,
  examId: observable,
  examineeId: observable,
  examineeEmail: observable,
  examineeName: observable,
  questionCount: observable,
  finished: observable,
  answers: observable,
});
