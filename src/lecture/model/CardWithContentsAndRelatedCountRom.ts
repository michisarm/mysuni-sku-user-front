import { Card } from './Card';
import { CardContents } from './CardContents';
import { CardRelatedCount } from './CardRelatedCount';

export interface CardWithContentsAndRelatedCountRom {
  card: Card | null;
  cardContents: CardContents;
  cardRelatedCount: CardRelatedCount;
}
