import { findInstructorCache } from '../../../../../expert/present/apiclient/InstructorApi';
import { CardContents } from '../../../../model/CardContents';
import { Instructor } from '../../../../model/Instructor';
import { findCardCache } from '../../../api/cardApi';
import { setLectureInstructor } from '../../../store/LectureOverviewStore';
import { find } from 'lodash';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { findInstructorWithIdentityCache } from 'expert/apis/instructorApi';
import { InstructorWithIdentity } from 'expert/model/InstructorWithIdentity';

function getUniqueList(instructors: Instructor[]) {
  const uniqueInstructorList: Instructor[] = [];

  instructors
    .filter((c) => c.representative === true)
    .forEach((c) => {
      if (
        !uniqueInstructorList.some((d) => d.instructorId === c.instructorId)
      ) {
        uniqueInstructorList.push(c);
      }
    });

  instructors
    .filter((c) => c.representative === false)
    .forEach((c) => {
      if (
        !uniqueInstructorList.some((d) => d.instructorId === c.instructorId)
      ) {
        uniqueInstructorList.push(c);
      }
    });

  return uniqueInstructorList;
}

async function parseLectureInstructor(cardContents: CardContents) {
  const { instructors } = cardContents;
  const instructorList = getUniqueList(instructors);

  const proimseArray = instructorList.map(async (c) => {
    const r = await findInstructorWithIdentityCache(c.instructorId);
    if (r !== undefined) {
      c.instructorWithIdentity = r;
    }
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
