import { CardCategory } from '../../../shared/model/CardCategory';
import { Card } from '../../model/Card';
import CardType from '../../shared/model/CardType';

export default interface InMyLectureCdo {
  serviceType: 'Card';
  serviceId: string;
  category: CardCategory;
  name: string;
  cubeType: CardType;
  learningTime: number;
  stampCount: number;
}

export function makeInMyLectureCdo(card: Card): InMyLectureCdo {
  const { id, name, mainCategory, type, learningTime, stampCount } = card;
  return {
    serviceType: 'Card',
    serviceId: id,
    category: mainCategory,
    name,
    cubeType: type,
    learningTime,
    stampCount,
  };
}
