import QuestionItems from './QuestionItems';

export class EssayQuestionItems implements QuestionItems {

  maxLength: number = 0;
  optional: boolean = false;

  constructor(answerItemsApiModel?: any) {
    if (answerItemsApiModel) {
      Object.assign(this, answerItemsApiModel);
    }
  }

  getAnswerType() {
    return 'Essay';
  }
}
