import { findCardCache } from '../../../api/cardApi';
import { setLectureDiscussion } from '../../../store/LectureDiscussionStore';
import { LearningContent } from '../../../../model/LearningContent';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';

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
      langSupports,
    },
    cardContents: { learningContents, creatorName },
  } = cardWithContentsAndRelatedCountRom;

  let discussion: LearningContent | undefined;

  learningContents.map((content) => {
    if (content.chapter) {
      content.children.forEach((child) => {
        if (
          child.contentId.substring(child.contentId.length - 4) === discussionId
        ) {
          discussion = child;
        }
      });
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

  const { contentId, name } = discussion;

  setLectureDiscussion({
    id: contentId,
    name: parsePolyglotString(name, getDefaultLang(langSupports)),
    creator: creatorName,
    creatorAudienceId: keyString,
    time: cardWithContentsAndRelatedCountRom.card.cardStateUpdatedTime,
  });

  return discussion;
}
