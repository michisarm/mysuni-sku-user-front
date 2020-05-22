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
  submitted: boolean = false;
  examId: string = '';
  answers: ItemAnswerModel[] = [];
  submitAnswers: ItemAnswerModel[] = [];

  constructor(answerSheet?: AnswerSheetModel) {
    if (answerSheet) {
      const answers = answerSheet.answers && answerSheet.answers.length
        && answerSheet.answers.map(answer => new ItemAnswerModel(answer)) || this.answers;
      Object.assign(this, { ...answerSheet, answers });

      const submitAnswers = answerSheet.submitAnswers && answerSheet.submitAnswers.length
        && answerSheet.submitAnswers.map(answer => new ItemAnswerModel(answer)) || this.submitAnswers;
      Object.assign(this, { ...answerSheet, submitAnswers });
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
  submitted: observable,
  answers: observable,
  submitAnswers: observable,
});
