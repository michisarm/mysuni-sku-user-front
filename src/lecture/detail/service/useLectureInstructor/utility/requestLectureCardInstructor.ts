import { CardContents } from '../../../../model/CardContents';
import { findCardCache } from '../../../api/cardApi';
import { setLectureInstructor } from '../../../store/LectureOverviewStore';
import LectureInstructor from '../../../viewModel/LectureOverview/LectureInstructor';

function parseLectureInstructor(cardContents: CardContents): LectureInstructor {
  const { instructors } = cardContents;
  return {
    instructors,
  };
}

export async function requestLectureCardInstructor(cardId: string) {
  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);
  if (cardWithContentsAndRelatedCountRom === undefined) {
    return;
  }
  const { cardContents } = cardWithContentsAndRelatedCountRom;
  const lectureCardInstructor = parseLectureInstructor(cardContents);
  setLectureInstructor(lectureCardInstructor);
}
