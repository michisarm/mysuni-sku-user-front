import { CardContents } from '../../../../model/CardContents';
import { findCardCache } from '../../../api/cardApi';
import { findReviewSummary } from '../../../api/feedbackApi';
import { setLectureReview } from '../../../store/LectureOverviewStore';
import LectureReview from '../../../viewModel/LectureOverview/LectureReview';

async function parseLectureReview(
  cardContents: CardContents
): Promise<LectureReview> {
  const { reviewFeedbackId } = cardContents;
  const { average } = await findReviewSummary(reviewFeedbackId);

  return {
    id: reviewFeedbackId,
    average: isNaN(average) ? 0 : average,
  };
}

export async function requestLectureCardReview(cardId: string) {
  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);
  if (cardWithContentsAndRelatedCountRom === undefined) {
    return;
  }
  const { cardContents } = cardWithContentsAndRelatedCountRom;
  const lectureCardReview = await parseLectureReview(cardContents);
  setLectureReview(lectureCardReview);
}
