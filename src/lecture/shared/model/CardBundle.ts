import { CardBundleType } from './CardBundleType';
import { CardWithCardRealtedCount } from '../../model/CardWithCardRealtedCount';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';

export interface CardBundle {
  cardIds: string[];
  cards: CardWithCardRealtedCount[];
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
}
