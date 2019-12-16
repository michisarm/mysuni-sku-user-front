import { decorate, observable } from 'mobx';
import { QueryModel } from '../../shared/model/QueryModel';
import { LearningCardRdoModel } from './LearningCardRdoModel';

export class LearningCardQueryModel extends QueryModel {
  cubeType: string = '';

  static asLearningCardRdo(learningCardQuery: LearningCardQueryModel): LearningCardRdoModel {
    let isCardName = false;
    let isWord = false;
    if (learningCardQuery.searchPart === '과정명') isCardName = true;
    if (learningCardQuery.searchPart === '생성자') isWord = true;
    return (
      {
        startDate: learningCardQuery.period.startDateNumber,
        endDate: learningCardQuery.period.endDateNumber,
        college: learningCardQuery.college,
        channel: learningCardQuery.channel,
        cardName: isCardName && learningCardQuery && learningCardQuery.searchWord || '',
        creatorName: isWord && learningCardQuery && learningCardQuery.searchWord || '',
        offset: learningCardQuery.offset,
        limit: learningCardQuery.limit,

        cubeType: learningCardQuery.cubeType,
      }
    );
  }
}

decorate(LearningCardQueryModel, {
  cubeType: observable,
});
