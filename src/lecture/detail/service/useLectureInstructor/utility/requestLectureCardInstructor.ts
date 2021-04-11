import InstructorApi from '../../../../../expert/present/apiclient/InstructorApi';
import { CardContents } from '../../../../model/CardContents';
import { findCardCache } from '../../../api/cardApi';
import { setLectureInstructor } from '../../../store/LectureOverviewStore';
import LectureInstructor from '../../../viewModel/LectureOverview/LectureInstructor';

async function parseLectureInstructor(cardContents: CardContents) {
  const { instructors } = cardContents;
  const instructorApi = new InstructorApi();
  const proimseArray = instructors.map(c => {
    return instructorApi
      .findInstructor(c.instructorId)
      .then(r => {
        if (r !== undefined) {
          c.memberSummary = {
            department: r.memberSummary.department,
            email: r.memberSummary.email,
            name: r.memberSummary.name,
            photoId: r.memberSummary.photoId,
          };
        }
      })
      .catch(() => {});
  });
  await Promise.all(proimseArray);
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
  const lectureCardInstructor = await parseLectureInstructor(cardContents);
  setLectureInstructor(lectureCardInstructor);
}
