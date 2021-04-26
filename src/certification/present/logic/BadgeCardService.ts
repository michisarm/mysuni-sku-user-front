import { observable, action, computed, runInAction } from 'mobx';
import { reactAutobind } from '@nara.platform/accent';
import { findCardWithLearningContentCounts } from '../../../lecture/detail/api/cardApi';
import { CardWithLearningContentCountRom } from '../../../lecture/model/CardWithLearningContentCountRom';

@reactAutobind
class BadgeCardService {
  static instance: BadgeCardService;

  @observable
  _badgeCards?: CardWithLearningContentCountRom[];

  @computed get badgeCards(): CardWithLearningContentCountRom[] | undefined {
    return this._badgeCards;
  }

  @observable
  _badgeCardCount: number = 0;

  @computed get badgeCardCount(): number {
    return this._badgeCardCount;
  }

  @action
  async findAllBadgeCards(
    cardIds: string[]
  ): Promise<CardWithLearningContentCountRom[] | undefined> {
    const foundBadgeCards = await findCardWithLearningContentCounts(cardIds);

    if (foundBadgeCards && foundBadgeCards.length > 0) {
      runInAction(() => {
        this._badgeCards = cardIds
          .map(cardId => foundBadgeCards.find(c => c.card.id === cardId))
          .filter(c => c !== undefined) as CardWithLearningContentCountRom[];
        this._badgeCardCount = foundBadgeCards.length;
      });
    }

    return foundBadgeCards;
  }

  @action
  clearBadgeCards() {
    this._badgeCards = [];
    this._badgeCardCount = 0;
  }
}

Object.defineProperty(BadgeCardService, 'instance', {
  value: new BadgeCardService(),
  writable: false,
  configurable: false,
});

export default BadgeCardService;
