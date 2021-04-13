import { CardCategory } from '../../../shared/model/CardCategory';
import { Card } from '../../model/Card';
import CardType from '../../shared/model/CardType';

export default interface InMyLectureCdo {
  cardId: string;
  category: CardCategory;
  name: string;
  cardType: CardType;
  learningTime: number;
  stampCount: number;
}

export function makeInMyLectureCdo(card: Card): InMyLectureCdo {
  const { id, name, mainCategory, type, learningTime, stampCount } = card;
  return {
    cardId: id,
    category: mainCategory,
    name,
    cardType: type,
    learningTime,
    stampCount,
  };
}
