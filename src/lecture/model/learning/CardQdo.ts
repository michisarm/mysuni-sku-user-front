import { decorate, observable } from 'mobx';
import moment from 'moment';
import { FilterCondition } from 'myTraining/model/FilterCondition';
import CardOrderBy from './CardOrderBy';
import StudentLearningType from './StudentLearningType';
import { Direction } from '../../../myTraining/model/Direction';

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
  ignoreAccessRule: boolean | '' = '';

  orderBy: CardOrderBy = CardOrderBy.None;

  constructor(card?: CardQdo) {
    if (card) {
      Object.assign(this, card);
    }
  }

  setBycondition(conditions: FilterCondition) {
    this.startLearningDate = conditions.startDate
      ? moment(conditions.startDate).format('YYYY-MM-DD')
      : '';
    this.endLearningDate = conditions.endDate
      ? moment(conditions.endDate).format('YYYY-MM-DD')
      : '';
    const tempRequired = this.getRequired(conditions.required);
    this.required = tempRequired;

    if (conditions.certifications && conditions.certifications.length > 0) {
      this.hasStamp =
        (conditions.certifications.find((x) => x === 'stamp') && true) || '';
      this.hasBadge =
        (conditions.certifications.find((x) => x === 'badge') && true) || '';
    } else {
      this.hasStamp = '';
      this.hasBadge = '';
    }

    this.offset = 0;
    this.limit = 20;

    this.collegeIds = conditions.collegeIds.join(',');
    this.difficultyLevels = conditions.difficultyLevels.join(',');
    this.learningTimeRanges = conditions.learningTimes.join(',');
    this.type = conditions.learningTypes.join(',');

    return this;
  }

  private getRequired(value: string): boolean | '' {
    switch (value) {
      case 'true':
        return true;
      case 'false':
        return false;
      case 'none':
      case '':
      default:
        return '';
    }
  }

  private getOrderByCardQdo(
    columnType: string,
    direction: Direction,
    studentLearning?: StudentLearningType,
    bookmark?: boolean
  ) {
    //
    const cardQdo = new CardQdo();

    if (columnType === 'modifiedTime') {
      cardQdo.orderBy =
        direction === Direction.ASC
          ? CardOrderBy.StudentModifiedTimeAsc
          : CardOrderBy.StudentModifiedTimeDesc;
    } else if (columnType === 'learningTime') {
      cardQdo.orderBy =
        direction === Direction.ASC
          ? CardOrderBy.CardLearningTimeAsc
          : CardOrderBy.CardLearningTimeDesc;
    }

    cardQdo.studentLearning = studentLearning || StudentLearningType.None;
    cardQdo.bookmark = bookmark || false;

    return cardQdo;
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
