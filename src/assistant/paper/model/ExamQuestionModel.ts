import { decorate, observable } from 'mobx';
import { QuestionType } from './QuestionType';
import { QuestionItemModel } from './QuestionItemModel';

export class ExamQuestionModel {
  //
  id: string = '';
  paperId: string = '';
  questionNo: string = '';
  allocatedPoint: number = 0;
  questionType: QuestionType = QuestionType.Essay;
  direction: string = '';
  answer: string = '';
  items: QuestionItemModel[] = [];

  constructor(question?: ExamQuestionModel) {
    if (question) {
      const items = question.items && question.items.length && question.items.map(item => new QuestionItemModel(item)) || this.items;
      Object.assign(this, { ...question, items });
    }
  }
}

decorate(ExamQuestionModel, {
  id: observable,
  paperId: observable,
  questionNo: observable,
  allocatedPoint: observable,
  questionType: observable,
  direction: observable,
  answer: observable,
  items: observable,
});
