import { CardBundleType } from './CardBundleType';
import { CardWithCardRealtedCount } from '../../model/CardWithCardRealtedCount';

export interface CardBundle {
  cardIds: string[];
  cards: CardWithCardRealtedCount[];
  displayOrder: number;
  displayText: string;

  enabled: boolean;
  id: string;
  modifierName: string;
  patronKey: {
    keyString: string;
  };
  name: string;
  type: CardBundleType;
  updataeTime: number;
}
