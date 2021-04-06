import { Card } from '../../../../model/Card';
import { findCardCache } from '../../../api/cardApi';
import { setLectureTags } from '../../../store/LectureOverviewStore';
import LectureTags from '../../../viewModel/LectureOverview/LectureTags';

function parseLectureTags(card: Card): LectureTags {
  const { tags = [] } = card;

  return {
    tags,
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
