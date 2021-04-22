import { findCardCache } from '../../../api/cardApi';
import { findSkProfileByAudienceId } from '../../../api/profileApi';
import { setLectureDiscussion } from '../../../store/LectureDiscussionStore';
import { LearningContent } from '../../../../model/LearningContent';

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

  let discussion: LearningContent | undefined;

  learningContents.map(content => {
    if (content.chapter) {
      discussion = content.children.find(
        ({ contentId }) =>
          contentId.substring(contentId.length - 4) === discussionId
      );
    } else {
      if (
        content.contentId.substring(content.contentId.length - 4) ===
        discussionId
      ) {
        discussion = content;
      }
    }
  });

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
