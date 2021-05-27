import { findInstructorCache } from '../../../../../expert/present/apiclient/InstructorApi';
import { CardContents } from '../../../../model/CardContents';
import { Instructor } from '../../../../model/Instructor';
import { findCardCache } from '../../../api/cardApi';
import { setLectureInstructor } from '../../../store/LectureOverviewStore';
import { find } from 'lodash';

function getUniqueList(instructors: Instructor[]) {
  const uniqueInstructorList: Instructor[] = [];

  instructors
    .filter(c => c.representative === true)
    .forEach(c => {
      if (!uniqueInstructorList.some(d => d.instructorId === c.instructorId)) {
        uniqueInstructorList.push(c);
      }
    });

  instructors
    .filter(c => c.representative === false)
    .forEach(c => {
      if (!uniqueInstructorList.some(d => d.instructorId === c.instructorId)) {
        uniqueInstructorList.push(c);
      }
    });

  return uniqueInstructorList;
}

async function parseLectureInstructor(cardContents: CardContents) {
  const { instructors } = cardContents;
  const instructorList = getUniqueList(instructors);

  const proimseArray = instructorList.map(c => {
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
    instructors: instructorList,
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
