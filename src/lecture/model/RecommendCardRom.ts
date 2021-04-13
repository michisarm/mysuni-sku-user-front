import { CardWithCardRealtedCount } from './CardWithCardRealtedCount';

export interface RecommendCardRom {
  cardCount: number;
  channelId: string;
  cardWithRelatedCountRoms: CardWithCardRealtedCount[];
}
