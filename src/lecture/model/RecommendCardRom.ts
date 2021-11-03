import { CardWithCardRealtedCount } from './CardWithCardRealtedCount';

export interface RecommendCardRom {
  cardCount: number;
  totalCardCount?: number;
  channelId: string;
  cardWithRelatedCountRdos: CardWithCardRealtedCount[];
}
