import { parsePolyglotString } from '../../../../../shared/viewmodel/PolyglotString';
import { Card } from '../../../../model/Card';
import { getDefaultLang } from '../../../../model/LangSupport';
import { findCardCache } from '../../../api/cardApi';
import { setLectureTags } from '../../../store/LectureOverviewStore';
import LectureTags from '../../../viewModel/LectureOverview/LectureTags';

function parseLectureTags(card: Card): LectureTags {
  const { tags } = card;

  if (
    tags === undefined ||
    tags === null ||
    parsePolyglotString(tags, getDefaultLang(card.langSupports)) === null
  ) {
    return {
      tags: [],
    };
  }

  return {
    tags: parsePolyglotString(tags, getDefaultLang(card.langSupports))
      .split(',')
      .map((c) => c.trim()),
  };
}

export async function requestLectureCardTags(cardId: string) {
  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);
  if (cardWithContentsAndRelatedCountRom === undefined) {
    return;
  }
  const { card } = cardWithContentsAndRelatedCountRom;
  if (card === null) {
    return;
  }
  const lectureCardTags = parseLectureTags(card);
  setLectureTags(lectureCardTags);
}
