import {
  setHotTopicDetailViewModel,
  setHotTopicListViewModel,
} from 'hotTopic/store/HotTopicStore';
import {
  HotTopicCardViewModel,
  HotTopicDetailViewModel,
} from 'hotTopic/viewmodel/HotTopicViewModel';
import { findCardFromCardBundle } from 'lecture/detail/api/cardApi';
import { findAvailableCardBundles } from 'lecture/shared/api/arrangeApi';
import { CardBundle } from 'lecture/shared/model/CardBundle';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

export async function requestHotTopic(id: string) {
  setHotTopicDetailViewModel();
  setHotTopicListViewModel();

  const cardBundles: CardBundle[] = await findAvailableCardBundles();

  if (cardBundles === undefined) {
    return;
  }

  const hotTopicList: HotTopicDetailViewModel[] = [];
  cardBundles.map(async (cardBundle) => {
    const cardBundleDetail: HotTopicDetailViewModel = {
      cardIds: cardBundle.cardIds,
      description: parsePolyglotString(cardBundle.description),
      displayText: parsePolyglotString(cardBundle.displayText),
      id: cardBundle.id,
      imageUrl: cardBundle.imageUrl,
      learningTime: cardBundle.learningTime,
      likeFeedbackId: cardBundle.likeFeedbackId,
      type: cardBundle.type,
    };
    if (cardBundle.type === 'HotTopic') {
      const cards = await findCardFromCardBundle(
        cardBundleDetail.cardIds,
        999,
        false
      );
      cardBundleDetail.cards = cards?.map((card) => {
        const hotTopicCard: HotTopicCardViewModel = {
          id: card.id,
          learningState: card.learningState,
          learningTime: card.learningTime,
          name: parsePolyglotString(card.name),
          simpleDescription: parsePolyglotString(card.simpleDescription),
          starCount: card.starCount,
          passedStudentCount: card.passedStudentCount,
          thumbImagePath: card.thumbImagePath,
          thumbnailImagePath: card.thumbnailImagePath,
          type: card.type,
        };
        return hotTopicCard;
      });
      if (cardBundle.id === id) {
        setHotTopicDetailViewModel(cardBundleDetail);
      } else {
        hotTopicList.push(cardBundleDetail);
        //테스트로 여러개
        hotTopicList.push(cardBundleDetail);
        hotTopicList.push(cardBundleDetail);
        hotTopicList.push(cardBundleDetail);
        hotTopicList.push(cardBundleDetail);
        hotTopicList.push(cardBundleDetail);
        setHotTopicListViewModel(hotTopicList);
      }
    }
  });
}
