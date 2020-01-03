
import { observable, action } from 'mobx';
import { autobind } from '@nara.platform/accent';
import _ from 'lodash';

import CardModel from '../model/CardModel';


@autobind
class CardService {
  //
  static instance: CardService;

  @observable
  card?: CardModel;

  @observable
  cardMap: Map<string, CardModel> = new Map();


  @action
  newCard() {
    //
    const cardId = _.uniqueId('Card.');

    this.cardMap.set(cardId, new CardModel());
    return cardId;
  }

  @action
  setCardProp(cardId: string, name: string, value: any) {
    //
    const card = this.cardMap.get(cardId);

    Object.defineProperty(card, name, {
      value,
    });
  }
}

CardService.instance = new CardService();

export default CardService;
