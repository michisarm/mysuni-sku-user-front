import { useEffect, useState, useCallback } from 'react';
import { CardWithLearningContentCountRom } from '../../../lecture/model/CardWithLearningContentCountRom';
import { findCardWithLearningContentCounts } from '../../../lecture/detail/api/cardApi';


interface ReturnValue {
  badgeCards: CardWithLearningContentCountRom[];
  onSetBadgeCards: (next: CardWithLearningContentCountRom[]) => void;
}

export function useBadgeCards(cardIds: string[]): ReturnValue {
  const [badgeCards, setBadgeCards] = useState<CardWithLearningContentCountRom[]>([]);

  useEffect(() => {
    requestBadgeCards(cardIds);
  }, [cardIds]);

  const requestBadgeCards = async (cardIds: string[]) => {
    const foundBadgeCards = await findCardWithLearningContentCounts(cardIds);

    if (foundBadgeCards && foundBadgeCards.length > 0) {
      setBadgeCards(foundBadgeCards);
    }
  };

  const onSetBadgeCards = useCallback((next: CardWithLearningContentCountRom[]): void => {
    setBadgeCards(next);
  }, []);

  return { badgeCards, onSetBadgeCards };
}
