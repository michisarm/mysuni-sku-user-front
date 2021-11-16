import { CardForUserViewRdos } from './CardForUserViewRdos';

export interface RecommendCardRom {
  cardCount: number;
  totalCardCount?: number;
  channelId: string;
  // cardWithRelatedCountRdos: CardWithCardRealtedCount[];
  cardForUserViewRdos: CardForUserViewRdos[];
}
