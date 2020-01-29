import { decorate, observable } from 'mobx';
import { AnswerSheetModel } from './AnswerSheetModel';

export class AnswerSheetResultModel {
  //
  result: AnswerSheetModel = new AnswerSheetModel();

  constructor(result?: AnswerSheetResultModel) {
    if (result) {
      Object.assign(this, { ...result });
    }
  }

}

decorate(AnswerSheetResultModel, {
  result: observable,
});
