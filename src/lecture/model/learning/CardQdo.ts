import { decorate, observable } from 'mobx';
import moment from 'moment';
import { FilterCondition } from 'myTraining/model/FilterCondition';
import { DifficultyLevel } from 'personalcube/cubeintro/model';
import CardOrderBy from './CardOrderBy';
import StudentLearningType from './StudentLearningType';

class CardQdo {
  //
  offset: number = 0;
  limit: number = 20;

  name: string = '';
  registrantName: string = '';
  collegeIds: string = '';
  channelIds: string = '';

  difficultyLevels: string = '';
  learningTimeRanges: string = '';
  hasStamp: boolean | '' = '';
  hasBadge: boolean | '' = '';

  required: boolean | '' = '';
  searchable: boolean | '' = '';
  instructorId: string = '';
  startLearningDate: string = '';
  endLearningDate: string = '';

  type: string = '';
  studentLearning: StudentLearningType = StudentLearningType.None;

  bookmark: boolean | '' = '';

  orderBy: CardOrderBy = CardOrderBy.None;

  constructor(card?: CardQdo) {
    if (card) {
      Object.assign(this, card);
    }
  }

  setBycondition(conditions: FilterCondition) {
    console.log(conditions);
    this.startLearningDate = conditions.startDate
      ? moment(conditions.startDate).format('YYYY-MM-DD')
      : '';
    this.endLearningDate = conditions.endDate
      ? moment(conditions.endDate).format('YYYY-MM-DD')
      : '';
    this.required =
      conditions.required === 'none' || conditions.required === 'false'
        ? false
        : true;

    if (conditions.certifications && conditions.certifications.length > 0) {
      this.hasStamp =
        (conditions.certifications.find((x) => x === 'stamp') && true) || false;
      this.hasBadge =
        (conditions.certifications.find((x) => x === 'badge') && true) || false;
    }

    this.offset = 0;
    this.limit = 20;

    this.collegeIds = conditions.collegeIds.join(',');
    this.difficultyLevels = conditions.difficultyLevels.join(',');
    this.learningTimeRanges = conditions.learningTimes.join(',');

    return this;
  }
}

decorate(CardQdo, {
  offset: observable,
  limit: observable,

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
  bookmark: observable,
  orderBy: observable,
});

export default CardQdo;
