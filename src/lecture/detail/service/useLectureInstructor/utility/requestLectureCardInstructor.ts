import { findInstructorCache } from '../../../../../expert/present/apiclient/InstructorApi';
import { CardContents } from '../../../../model/CardContents';
import { findCardCache } from '../../../api/cardApi';
import { setLectureInstructor } from '../../../store/LectureOverviewStore';

async function parseLectureInstructor(cardContents: CardContents) {
  const { instructors } = cardContents;
  const proimseArray = instructors.map(c => {
    return findInstructorCache(c.instructorId)
      .then(r => {
        if (r !== undefined) {
          c.memberSummary = {
            employeeId: r.memberSummary.employeeId,
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
