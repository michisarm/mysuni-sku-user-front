import { CardBundleType } from './CardBundleType';
import { CardWithCardRealtedCount } from '../../model/CardWithCardRealtedCount';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';
import { UserLectureCard } from '@sku/skuniv-ui-lecture-card';

export interface CardBundle {
  cardIds: string[];
  cards: UserLectureCard[];
  displayOrder: number;
  displayText: PolyglotString;

  enabled: boolean;
  id: string;
  modifierName: string;
  patronKey: {
    keyString: string;
  };
  name: string;
  type: CardBundleType;
  updataeTime: number;

  description: PolyglotString;
  imageUrl: PolyglotString;
  learningTime: number;
  likeFeedbackId: string;
}
