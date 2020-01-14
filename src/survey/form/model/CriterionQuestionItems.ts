import QuestionItems from './QuestionItems';

export class CriterionQuestionItems implements QuestionItems {

  answerType: string = 'Criterion';
  criterionNumber: string = '';

  constructor(answerItemsApiModel?: any) {
    if (answerItemsApiModel) {
      Object.assign(this, answerItemsApiModel);
    }
  }

  getAnswerType() {
    return this.answerType;
  }
}
