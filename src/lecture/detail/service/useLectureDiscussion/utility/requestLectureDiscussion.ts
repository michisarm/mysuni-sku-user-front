import { findCardCache } from '../../../api/cardApi';
import { findSkProfileByAudienceId } from '../../../api/profileApi';
import { setLectureDiscussion } from '../../../store/LectureDiscussionStore';

export async function requestLectureDiscussion(
  cardId: string,
  discussionId: string
) {
  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);
  if (
    cardWithContentsAndRelatedCountRom === undefined ||
    cardWithContentsAndRelatedCountRom.card === null
  ) {
    return;
  }
  const {
    card: {
      patronKey: { keyString },
    },
    cardContents: { learningContents, creatorName },
  } = cardWithContentsAndRelatedCountRom;
  const discussion = learningContents.find(
    ({ contentId }) =>
      contentId.substring(contentId.length - 4) === discussionId
  );
  if (discussion === undefined) {
    return;
  }
  const profile = await findSkProfileByAudienceId(keyString);
  if (profile === undefined) {
    return;
  }
  const { contentId, name } = discussion;
  setLectureDiscussion({
    id: contentId,
    name: name === null ? '' : name,
    creator: creatorName,
    creatorAudienceId: keyString,
    creatorImage: profile.photoImage,
    time: cardWithContentsAndRelatedCountRom.card.cardStateUpdatedTime,
  });
}
