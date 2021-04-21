import LectureDescription from '../../../viewModel/LectureOverview/LectureDescription';
import { Card } from '../../../../model/Card';
import { setLectureDescription } from '../../../store/LectureOverviewStore';
import { findCardCache } from '../../../api/cardApi';
import { CardContents } from '../../../../model/CardContents';

function parseLectureDescription(
  cardContens: CardContents
): LectureDescription {
  const { description } = cardContens;
  return {
    description,
  };
}

export async function requestLectureCardDescription(cardId: string) {
  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);
  if (cardWithContentsAndRelatedCountRom === undefined) {
    return;
  }
  const { cardContents } = cardWithContentsAndRelatedCountRom;
  if (cardContents === null) {
    return;
  }
  const lectureCardDescription = parseLectureDescription(cardContents);
  setLectureDescription(lectureCardDescription);
}
