import LectureDescription from '../../../viewModel/LectureOverview/LectureDescription';
import { Card } from '../../../../model/Card';
import { setLectureDescription } from '../../../store/LectureOverviewStore';
import { findCardCache } from '../../../api/cardApi';
import { CardContents } from '../../../../model/CardContents';
import { parsePolyglotString } from '../../../../../shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../../model/LangSupport';

function parseLectureDescription(
  card: Card,
  cardContens: CardContents
): LectureDescription {
  const { langSupports } = card;
  const { description } = cardContens;
  return {
    description: parsePolyglotString(description, getDefaultLang(langSupports)),
  };
}

export async function requestLectureCardDescription(cardId: string) {
  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);
  if (cardWithContentsAndRelatedCountRom === undefined) {
    return;
  }
  const { card, cardContents } = cardWithContentsAndRelatedCountRom;
  if (card === null || cardContents === null) {
    return;
  }
  const lectureCardDescription = parseLectureDescription(card, cardContents);
  setLectureDescription(lectureCardDescription);
}
