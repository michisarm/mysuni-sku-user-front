import { decorate, observable } from 'mobx';

export class QuestionItemModel {
  //
  itemNo: string = '';
  itemText: string = '';
  imgSrc: string = '';

  constructor(item?: QuestionItemModel) {
    if (item) {
      Object.assign(this, { ...item });
    }
  }

}

decorate(QuestionItemModel, {
  itemNo: observable,
  itemText: observable,
  imgSrc: observable,
});
