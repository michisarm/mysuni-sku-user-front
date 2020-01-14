import QuestionItems from './QuestionItems';
import { NumberValue } from './NumberValue';

export class ChoiceQuestionItems implements QuestionItems {

  answerType: string = 'Choice';
  multipleChoice: boolean = false;
  items: NumberValue[] = [];

  constructor(answerItemsApiModel?: any) {
    if (answerItemsApiModel) {
      Object.assign(this, answerItemsApiModel);
      this.items = answerItemsApiModel.items.map((item: any) => new NumberValue(item));
    }
  }

  getAnswerType() {
    return this.answerType;
  }
}
