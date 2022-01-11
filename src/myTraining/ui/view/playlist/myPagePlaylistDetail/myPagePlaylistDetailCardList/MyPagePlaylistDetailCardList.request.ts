import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { findCardFromCardBundle } from 'hotTopic/api/hotTopicApi';
import { phaseStepCount } from '../MyPagePlaylistDetail.event';
import { setMyPagePlaylistDetailCards } from '../MyPagePlaylistDetail.services';
import { setCheckedCardList } from './MyPagePlaylistDetailCardList.service';

async function requestMyPagePlaylistDetailCardList(cardIds: string[]) {
  const cards = await findCardFromCardBundle(cardIds);
  if (cards === undefined) {
    return;
  }

  const value = cards.map((card) => {
    return {
      cardThumbnailImage: card.thumbnailImagePath,
      cardTitle: parsePolyglotString(card.name),
      phaseCount: card.phaseCount,
      completePhaseCount: card.completePhaseCount || 0,
      learningTime: card.learningTime,
      stepCount: phaseStepCount(card.phaseCount, card.completePhaseCount || 0),
    };
  });

  const totalCount = cards.length;
  const cardLearningTime = cards.map((card) => {
    return card.learningTime;
  });
  const totalLearningTime = cardLearningTime.reduce((i, total) => i + total, 0);

  setMyPagePlaylistDetailCards({
    playlistCard: value,
    totalCount,
    totalLearningTime,
  });

  const checkedValue = cards.map((card) => {
    return {
      cardId: card.id,
      cardTitle: parsePolyglotString(card.name),
      cardThumNail: card.thumbnailImagePath,
      checked: false,
    };
  });
  setCheckedCardList(checkedValue);
}

export default requestMyPagePlaylistDetailCardList;
