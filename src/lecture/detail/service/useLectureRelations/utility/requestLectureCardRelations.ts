import { CardContents } from '../../../../model/CardContents';
import { findCardCache } from '../../../api/cardApi';
import { setLectureRelations } from '../../../store/LectureOverviewStore';
import LectureRelations from '../../../viewModel/LectureOverview/LectureRelations';

function parseLectureRelations(cardContents: CardContents): LectureRelations {
  const { relatedCards } = cardContents;

  return {
    relatedCards,
  };
}

export async function requestLectureCardRelations(cardId: string) {
  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);
  if (cardWithContentsAndRelatedCountRom === undefined) {
    return;
  }
  const { cardContents } = cardWithContentsAndRelatedCountRom;
  const lectureCardRelations = parseLectureRelations(cardContents);
  setLectureRelations(lectureCardRelations);
}
