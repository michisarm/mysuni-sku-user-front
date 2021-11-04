import { UserLectureCard } from '@sku/skuniv-ui-lecture-card';
import { CardWithCardRealtedCount } from '../../model/CardWithCardRealtedCount';

export interface RecommendationViewModel {
  recTitle: string;
  cards: UserLectureCard[];
}
