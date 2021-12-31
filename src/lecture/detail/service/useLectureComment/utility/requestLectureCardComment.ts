import { SkProfileService } from '../../../../../profile/stores';
import { UserIdentity } from '../../../../../shared/model/UserIdentity';
import { CardContents } from '../../../../model/CardContents';
import { findCardCache } from '../../../api/cardApi';
import { countByFeedbackId } from '../../../api/feedbackApi';
import { setLectureComment } from '../../../store/LectureOverviewStore';
import LectureComment from '../../../viewModel/LectureComment/LectureComment';

async function parseLectureComment(
  cardContents: CardContents,
  cardOperatorIdentity: UserIdentity | null
): Promise<LectureComment> {
  const { reviewFeedbackId, commentFeedbackId } = cardContents;
  const { count } = await countByFeedbackId(commentFeedbackId);

  return {
    commentId: commentFeedbackId,
    reviewId: reviewFeedbackId,
    commentsCount: count,
  };
}

export async function requestLectureCardComment(cardId: string) {
  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);
  if (cardWithContentsAndRelatedCountRom === undefined) {
    return;
  }
  const { card, cardContents, cardOperatorIdentity } =
    cardWithContentsAndRelatedCountRom;
  if (card === null) {
    return;
  }
  const lectureCardComment = await parseLectureComment(
    cardContents,
    cardOperatorIdentity
  );
  setLectureComment(lectureCardComment);
}
