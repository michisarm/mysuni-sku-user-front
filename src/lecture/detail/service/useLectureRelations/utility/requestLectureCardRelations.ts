import { CardContents } from '../../../../model/CardContents';
import { findCardCache, findCardList } from '../../../api/cardApi';
import { setLectureRelations } from '../../../store/LectureOverviewStore';

async function parseLectureRelations(cardIds: string[]) {
  const cards = (await findCardList(cardIds)) || [];
  return {
    cards,
  };
}

export async function requestLectureCardRelations(cardId: string) {
  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);
  if (cardWithContentsAndRelatedCountRom === undefined) {
    return;
  }
  const {
    cardContents: { relatedCards },
  } = cardWithContentsAndRelatedCountRom;
  if (Array.isArray(relatedCards) && relatedCards.length > 0) {
    const joinedIds = relatedCards.map((c) => c.relatedCardId);

    const lectureCardRelations = await parseLectureRelations(joinedIds);
    setLectureRelations(lectureCardRelations);
  }
}
