import LectureDescription from '../../../viewModel/LectureOverview/LectureDescription';
import { Card } from '../../../../model/Card';
import { setLectureDescription } from '../../../store/LectureOverviewStore';
import { findCardCache } from '../../../api/cardApi';

function parseLectureDescription(card: Card): LectureDescription {
  const { description } = card;

  return {
    description,
  };
}

export async function requestLectureCardDescription(cardId: string) {
  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);
  if (cardWithContentsAndRelatedCountRom === undefined) {
    return;
  }
  const { card } = cardWithContentsAndRelatedCountRom;
  if (card === null) {
    return;
  }
  const lectureCardDescription = parseLectureDescription(card);
  setLectureDescription(lectureCardDescription);
}
