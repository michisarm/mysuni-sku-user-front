import { timeToHourMinuteFormat } from '../../../../../shared/helper/dateTimeHelper';
import { Card } from '../../../../model/Card';
import { CardContents } from '../../../../model/CardContents';
import { CardRelatedCount } from '../../../../model/CardRelatedCount';
import { findCardCache } from '../../../api/cardApi';
import { setLectureSubcategory } from '../../../store/LectureOverviewStore';
import LectureSubcategory from '../../../viewModel/LectureOverview/LectureSubcategory';

function parseLectureSubcategory(card: Card): LectureSubcategory {
  const { categories } = card;

  return {
    categories:
      categories?.map(({ channelId, collegeId }) => ({
        channelId,
        collegeId,
      })) || [],
  };
}

export async function requestLectureCardSubcategory(cardId: string) {
  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);
  if (cardWithContentsAndRelatedCountRom === undefined) {
    return;
  }
  const { card } = cardWithContentsAndRelatedCountRom;
  if (card === null) {
    return;
  }
  const lectureCardSubcategory = parseLectureSubcategory(card);
  setLectureSubcategory(lectureCardSubcategory);
}
