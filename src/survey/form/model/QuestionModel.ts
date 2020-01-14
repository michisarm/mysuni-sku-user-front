import { decorate, observable } from 'mobx';
import { PatronKey, LangStrings, DramaEntityObservableModel } from 'shared';
import { SequenceModel } from './SequenceModel';
import { QuestionItemType } from './QuestionItemType';
import QuestionItems from './QuestionItems';
import { ChoiceQuestionItems } from './ChoiceQuestionItems';
import { CriterionQuestionItems } from './CriterionQuestionItems';
import { EssayQuestionItems } from './EssayQuestionItems';

export class QuestionModel extends DramaEntityObservableModel {
  //
  sequence: SequenceModel = new SequenceModel();
  sentences: LangStrings = new LangStrings();
  optional: boolean = false;
  questionItemType: QuestionItemType = QuestionItemType.Choice;
  answerItems: QuestionItems = new ChoiceQuestionItems();

  surveyFromId: string = '';

  constructor(question?: QuestionModel) {
    //
    super();
    if (question) {
      //
      const sequence = question.sequence && new SequenceModel(question.sequence) || this.sequence;
      const sentences = question.sentences && new LangStrings(question.sentences) || this.sentences;
      Object.assign(this, { ...question, sequence, sentences });
      switch (this.questionItemType) {
        case QuestionItemType.Criterion:
          this.answerItems = new CriterionQuestionItems(question.answerItems);
          break;
        case QuestionItemType.Choice:
          this.answerItems = new ChoiceQuestionItems(question.answerItems);
          break;
        case QuestionItemType.Essay:
          this.answerItems = new EssayQuestionItems(question.answerItems);
      }
    }
  }
}

decorate(QuestionModel, {
  id: observable,
  entityVersion: observable,
  patronKey: observable,

  sequence: observable,
  sentences: observable,
  optional: observable,
  questionItemType: observable,
  answerItems: observable,
  surveyFromId: observable,
});
