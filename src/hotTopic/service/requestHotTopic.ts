import { findCardFromCardBundle } from 'hotTopic/api/hotTopicApi';
import {
  setHotTopicDetailViewModel,
  setHotTopicListViewModel,
} from 'hotTopic/store/HotTopicStore';
import {
  HotTopicCardViewModel,
  HotTopicDetailViewModel,
} from 'hotTopic/viewmodel/HotTopicViewModel';
import { findAvailableCardBundles } from 'lecture/shared/api/arrangeApi';
import { CardBundle } from 'lecture/shared/model/CardBundle';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

export async function requestHotTopic(id: string) {
  setHotTopicDetailViewModel();
  setHotTopicListViewModel();

  const cardBundles: CardBundle[] | undefined =
    await findAvailableCardBundles();

  if (cardBundles === undefined) {
    return;
  }

  const hotTopicList: HotTopicDetailViewModel[] = [];

  cardBundles.map((cardBundle) => {
    const cardBundleDetail: HotTopicDetailViewModel = {
      cardIds: cardBundle.cardIds,
      description: parsePolyglotString(cardBundle.description),
      displayText: parsePolyglotString(cardBundle.displayText),
      id: cardBundle.id,
      imageUrl: parsePolyglotString(cardBundle.imageUrl),
      learningTime: cardBundle.learningTime,
      likeFeedbackId: cardBundle.likeFeedbackId,
      type: cardBundle.type,
    };
    if (cardBundle.type === 'HotTopic') {
      if (cardBundle.id === id) {
        setHotTopicDetailWithCards(cardBundleDetail);
      } else {
        hotTopicList.push(cardBundleDetail);
      }
    }
  });
  setHotTopicListViewModel(hotTopicList);
}

async function setHotTopicDetailWithCards(
  cardBundleDetail: HotTopicDetailViewModel
) {
  const cards = await findCardFromCardBundle(cardBundleDetail.cardIds);
  cardBundleDetail.cards = cards?.map((card) => {
    const hotTopicCard: HotTopicCardViewModel = {
      id: card.id,
      learningState: card.learningState,
      learningTime: card.learningTime,
      name: parsePolyglotString(card.name),
      simpleDescription: parsePolyglotString(card.simpleDescription),
      starCount: Math.floor(card.starCount * 10) / 10,
      passedStudentCount: card.passedStudentCount,
      thumbImagePath: card.thumbImagePath,
      thumbnailImagePath: card.thumbnailImagePath,
      type: card.type,
      mainCollegeId: card.mainCollegeId,
      phaseCount: card.phaseCount,
    };
    return hotTopicCard;
  });

  setHotTopicDetailViewModel(cardBundleDetail);
}
