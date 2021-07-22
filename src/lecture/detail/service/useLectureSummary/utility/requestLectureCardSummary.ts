import { InMyLectureService } from '../../../../../myTraining/stores';
import { timeToHourMinuteFormat } from '../../../../../shared/helper/dateTimeHelper';
import { Card } from '../../../../model/Card';
import { CardContents } from '../../../../model/CardContents';
import { CardRelatedCount } from '../../../../model/CardRelatedCount';
import { UserIdentity } from '../../../../model/UserIdentity';
import { findCardCache } from '../../../api/cardApi';
import { findCubesByIdsCache } from '../../../api/cubeApi';
import { makeInMyLectureCdo } from '../../../model/InMyLectureCdo';
import {
  setInMyLectureCdo,
  setLectureCardSummary,
} from '../../../store/LectureOverviewStore';
import LectureCardSummary from '../../../viewModel/LectureOverview/LectureCardSummary';
import { getClassroomFromCube } from '../../useLectureClassroom/utility/getClassroomFromCube';
import { requestLectureState } from '../../useLectureState/utility/requestLectureState';
import { findMyCardRelatedStudentsCache } from '../../../api/cardApi';
import { MyCardRelatedStudentsRom } from '../../../../model/MyCardRelatedStudentsRom';
import { parsePolyglotString } from '../../../../../shared/viewmodel/PolyglotString';

function getVaildLeaningDate(
  validLearningDate: number,
  cardRelatedStudent?: MyCardRelatedStudentsRom
) {
  if (
    cardRelatedStudent &&
    cardRelatedStudent.cardStudent &&
    validLearningDate
  ) {
    const { creationTime } = cardRelatedStudent.cardStudent;
    const parseCreateDate = new Date(creationTime);
    parseCreateDate.setDate(parseCreateDate.getDate() + validLearningDate);

    const year = parseCreateDate.getFullYear();
    const month = parseCreateDate.getMonth() + 1;
    const day = parseCreateDate.getDate();

    const result = `${year}.${month}.${day}`;

    return result;
  } else {
    return '';
  }
}

function parseLectureSummary(
  card: Card,
  cardContents: CardContents,
  cardOperatorIdentity: UserIdentity | null,
  cardRelatedCount: CardRelatedCount,
  cardRelatedStudent?: MyCardRelatedStudentsRom
): LectureCardSummary {
  const {
    id,
    mainCategory,
    learningTime,
    additionalLearningTime,
    thumbImagePath,
    difficultyLevel,
    name,
    stampCount,
  } = card;
  const { communityId, validLearningDate } = cardContents;
  const { studentCount, passedStudentCount } = cardRelatedCount;

  return {
    cardId: id,
    name: parsePolyglotString(name),
    learningTime: timeToHourMinuteFormat(learningTime + additionalLearningTime),
    category: {
      collegeId: mainCategory?.collegeId || '',
      channelId: mainCategory?.channelId || '',
    },
    operator: {
      email: cardOperatorIdentity?.email || '',
      name: cardOperatorIdentity?.names?.langStringMap.ko || '',
      companyName: cardOperatorIdentity?.companyNames?.langStringMap.ko || '',
    },
    stampCount,
    thumbImagePath,
    passedStudentCount,
    studentCount,
    difficultyLevel: difficultyLevel || 'Basic',
    hasCommunity: (communityId || '') !== '',
    communityId,
    validLearningDate: getVaildLeaningDate(
      validLearningDate,
      cardRelatedStudent
    ),
  };
}

export async function requestLectureCardSummary(cardId: string) {
  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);
  const cardRelatedStudent = await findMyCardRelatedStudentsCache(cardId);

  if (cardWithContentsAndRelatedCountRom === undefined) {
    return;
  }

  const { card, cardContents, cardOperatorIdentity, cardRelatedCount } =
    cardWithContentsAndRelatedCountRom;

  if (card === null) {
    return;
  }

  await InMyLectureService.instance.findAllInMyLectures();
  const lectureCardSummary = parseLectureSummary(
    card,
    cardContents,
    cardOperatorIdentity,
    cardRelatedCount,
    cardRelatedStudent
  );
  const cubeIds: string[] = [];
  for (let i = 0; i < cardContents.learningContents.length; i++) {
    const learningContent = cardContents.learningContents[i];
    if (learningContent.learningContentType === 'Cube') {
      cubeIds.push(learningContent.contentId);
    }
    if (learningContent.learningContentType === 'Chapter') {
      learningContent.children.forEach((c) => cubeIds.push(c.contentId));
    }
  }
  const cubes = await findCubesByIdsCache(cubeIds);
  if (
    Array.isArray(cubes) &&
    cubes.some((c) => c.type === 'ClassRoomLecture' || c.type === 'ELearning')
  ) {
    const cube = cubes.find(
      (c) => c.type === 'ClassRoomLecture' || c.type === 'ELearning'
    );
    if (cube !== undefined) {
      await requestLectureState(cardId, cube.id, cube.type);
      await getClassroomFromCube(cube.id);
      lectureCardSummary.hasClassroomCube = true;
    }
  }
  setLectureCardSummary(lectureCardSummary);
  const inMyLectureCdo = makeInMyLectureCdo(card);
  setInMyLectureCdo(inMyLectureCdo);
}
