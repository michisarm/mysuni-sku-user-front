import { decorate, observable } from 'mobx';
import { IdName } from '../../shared/model/IdName';

export class LearningCardSetModel {
  //
  cards: IdName[] = [];
  prerequisiteCards: IdName[] = [];

  constructor(learningCardSet?:LearningCardSetModel) {
    //
    if (learningCardSet) {
      Object.assign(this, { ...learningCardSet });
    }
  }
}

decorate(LearningCardSetModel, {
  cards: observable,
  prerequisiteCards: observable,
});
