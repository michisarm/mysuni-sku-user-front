import { Card } from "./Card";
import { CardRelatedCount } from "./CardRelatedCount";

export interface CardWithLearningContentCountRom {
  card: Card;
  cardRelatedCount: CardRelatedCount;
  cubeCount: number;
  discussionCount: number;
  chapterCount: number;
}