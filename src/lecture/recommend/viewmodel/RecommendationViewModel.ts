import { CardWithCardRealtedCount } from '../../model/CardWithCardRealtedCount';

export interface RecommendationViewModel {
  created: string;
  recTitle: string;
  cards: CardWithCardRealtedCount[];
}
