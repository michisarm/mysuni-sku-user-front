import _ from 'lodash';
import { CardWithLearningContentCountRom } from './CardWithLearningContentCountRom';
import { getMainCategory } from 'shared/model/CardCategory';

export type CardWithCardRealtedCount = Pick<
  CardWithLearningContentCountRom,
  'card' | 'cardRelatedCount'
>;

export function takeTwoOfEachCollege(
  cardWithCardRealtedCounts: CardWithCardRealtedCount[]
) {
  const collegeCountMap = new Map();
  const result: CardWithCardRealtedCount[] = [];
  const temp: CardWithCardRealtedCount[] = [];

  cardWithCardRealtedCounts.forEach((c) => {
    if (result.length === 8) {
      return;
    }

    const collegeId = getMainCategory(c.card.categories)?.collegeId || '';
    const collegeCount = collegeCountMap.get(collegeId);

    if (collegeCount === undefined) {
      collegeCountMap.set(collegeId, 1);
      result.push(c);
    } else if (collegeCount === 2) {
      temp.push(c);
    } else {
      collegeCountMap.set(collegeId, collegeCount + 1);
      result.push(c);
    }
  });

  if (result.length < 8) {
    const addCount = 8 - result.length;
    const addList = _.take(temp, addCount);
    result.push(...addList);
  }

  return result;
}
