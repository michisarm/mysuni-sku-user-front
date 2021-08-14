import { Card } from './Card';
import { CardContents } from './CardContents';
import { CardRelatedCount } from './CardRelatedCount';
import { UserIdentity } from 'shared/model/UserIdentity';

export interface CardWithContentsAndRelatedCountRom {
  card: Card | null;
  cardContents: CardContents;
  cardOperatorIdentity: UserIdentity | null;
  cardRelatedCount: CardRelatedCount;
}
