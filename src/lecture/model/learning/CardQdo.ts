import { decorate, observable } from 'mobx';
import { DifficultyLevel } from 'personalcube/cubeintro/model';
import CardOrderBy from './CardOrderBy';

class CardQdo {
  //
  offset: number = 0;
  limit: number = 0;

  startDate: number = 0;
  endDate: number = 0;

  name: string = '';
  registrantName: string = '';
  collegeIds: string[] = [];
  channelIds: string[] = [];

  difficultyLevels: string[] = [];
  learningTimeRanges: string[] = [];
  hasStamp: boolean = false;
  hasBadge: boolean = false;

  required: boolean = false;
  searchable: boolean = false;
  instructorId: string = '';
  startLearningDate: string = '';
  endLearningDate: string = '';

  type: string[] = [];
  studentLearning: string[] = [];
  orderBy: CardOrderBy = CardOrderBy.StudentModifiedTimeDesc;

  constructor(card?: CardQdo) {
    if (card) {
      Object.assign(this, card);
      this.collegeIds =
        (card.collegeIds &&
          card.collegeIds.length > 0 && [...card.collegeIds]) ||
        [];
      this.channelIds =
        (card.channelIds &&
          card.channelIds.length > 0 && [...card.channelIds]) ||
        [];
      this.difficultyLevels =
        (card.difficultyLevels &&
          card.difficultyLevels.length > 0 && [...card.difficultyLevels]) ||
        [];
      this.learningTimeRanges =
        (card.learningTimeRanges &&
          card.learningTimeRanges.length > 0 && [...card.learningTimeRanges]) ||
        [];
      this.type =
        (card.collegeIds && card.type.length > 0 && [...card.type]) || [];
      this.studentLearning =
        (card.studentLearning &&
          card.studentLearning.length > 0 && [...card.studentLearning]) ||
        [];
    }
  }
}

decorate(CardQdo, {
  offset: observable,
  limit: observable,

  startDate: observable,
  endDate: observable,

  name: observable,
  registrantName: observable,
  collegeIds: observable,
  channelIds: observable,

  difficultyLevels: observable,
  learningTimeRanges: observable,
  hasStamp: observable,
  hasBadge: observable,

  required: observable,
  searchable: observable,
  instructorId: observable,
  startLearningDate: observable,
  endLearningDate: observable,

  type: observable,
  studentLearning: observable,
  orderBy: observable,
});

export default CardQdo;
