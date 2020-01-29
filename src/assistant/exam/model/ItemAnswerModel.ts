import { decorate, observable } from 'mobx';

export class ItemAnswerModel {
  //
  questionNo: string = '';
  answer: string = '';

  constructor(itemAnswer?: ItemAnswerModel) {
    if (itemAnswer) {
      Object.assign(this, { ...itemAnswer });
    }
  }

}

decorate(ItemAnswerModel, {
  questionNo: observable,
  answer: observable,
});
