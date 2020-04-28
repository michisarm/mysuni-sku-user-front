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
  answersChk: ItemAnswerModel[] = [];

  constructor(answerSheet?: AnswerSheetModel) {
    if (answerSheet) {
      const answers = answerSheet.answers && answerSheet.answers.length
        && answerSheet.answers.map(answer => new ItemAnswerModel(answer)) || this.answers;
      Object.assign(this, { ...answerSheet, answers });

      const answersChk = answerSheet.answersChk && answerSheet.answersChk.length
        && answerSheet.answersChk.map(answer => new ItemAnswerModel(answer)) || this.answers;
      Object.assign(this, { ...answerSheet, answersChk });
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
