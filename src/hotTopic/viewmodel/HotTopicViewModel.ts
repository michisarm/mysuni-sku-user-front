import { CardBundleType } from 'lecture/shared/model/CardBundleType';
import CardType from 'lecture/shared/model/CardType';

export interface HotTopicDetailViewModel {
  cardIds: string[];
  displayText: string;
  id: string;
  type: CardBundleType;
  description: string;
  imageUrl: string;
  learningTime: number;
  likeFeedbackId: string;

  cards?: HotTopicCardViewModel[];
}

export interface HotTopicLikeInfo {
  feedbackId: string;
  count: number;
  my?: boolean;
}

export interface HotTopicCardViewModel {
  id: string;
  learningState: string | null;
  learningTime: number;
  name: string;
  simpleDescription: string;
  starCount: number;
  passedStudentCount: number;
  thumbImagePath: string;
  thumbnailImagePath: string;
  type: CardType;
  mainCollegeId: string;
  phaseCount: number;
}
