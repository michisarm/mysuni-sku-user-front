import { CardContents } from '../../../../model/CardContents';
import { findCardCache } from '../../../api/cardApi';
import { setLecturePrecourse } from '../../../store/LectureOverviewStore';
import LecturePrecourse from '../../../viewModel/LectureOverview/LecturePrecourse';

function parseLecturePrecourse(cardContents: CardContents): LecturePrecourse {
  const { prerequisiteCards } = cardContents;

  return {
    prerequisiteCards,
  };
}

export async function requestLectureCardPrecourse(cardId: string) {
  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);
  if (cardWithContentsAndRelatedCountRom === undefined) {
    return;
  }
  const { cardContents } = cardWithContentsAndRelatedCountRom;
  const lectureCardPrecourse = parseLecturePrecourse(cardContents);
  setLecturePrecourse(lectureCardPrecourse);
}
