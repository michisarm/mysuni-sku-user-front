import { CardWithLearningContentCountRom } from "../../lecture/model/CardWithLearningContentCountRom";

export interface ChallengeBadgeCards {
  badgeCards: CardWithLearningContentCountRom[];
  badgeCardCount: number;
}

export function getEmptyChallengeBadgeCards(): ChallengeBadgeCards {
  return {
    badgeCards: [],
    badgeCardCount: 0,
  };
}