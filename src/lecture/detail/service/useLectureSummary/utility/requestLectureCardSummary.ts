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

function parseLectureSummary(
  card: Card,
  cardContents: CardContents,
  cardOperatorIdentity: UserIdentity,
  cardRelatedCount: CardRelatedCount
): LectureCardSummary {
  const {
    id,
    mainCategory,
    learningTime,
    thumbImagePath,
    difficultyLevel,
    name,
    stampCount,
  } = card;
  const { communityId } = cardContents;
  const { studentCount, passedStudentCount } = cardRelatedCount;

  return {
    cardId: id,
    name,
    learningTime: timeToHourMinuteFormat(learningTime),
    category: {
      collegeId: mainCategory?.collegeId || '',
      channelId: mainCategory?.channelId || '',
    },
    operator: {
      email: cardOperatorIdentity.email,
      name: cardOperatorIdentity.names?.langStringMap.ko || '',
      companyName: cardOperatorIdentity.companyNames?.langStringMap.ko || '',
    },
    stampCount,
    thumbImagePath,
    passedStudentCount,
    studentCount,
    difficultyLevel: difficultyLevel || 'Basic',
    hasCommunity: (communityId || '') !== '',
    communityId,
  };
}

export async function requestLectureCardSummary(cardId: string) {
  const cardWithContentsAndRelatedCountRom = await findCardCache(cardId);
  if (cardWithContentsAndRelatedCountRom === undefined) {
    return;
  }
  const {
    card,
    cardContents,
    cardOperatorIdentity,
    cardRelatedCount,
  } = cardWithContentsAndRelatedCountRom;
  if (card === null) {
    return;
  }
  await InMyLectureService.instance.findAllInMyLectures();
  const lectureCardSummary = parseLectureSummary(
    card,
    cardContents,
    cardOperatorIdentity,
    cardRelatedCount
  );
  const cubeIds: string[] = [];
  for (let i = 0; i < cardContents.learningContents.length; i++) {
    const learningContent = cardContents.learningContents[i];
    if (learningContent.learningContentType === 'Cube') {
      cubeIds.push(learningContent.contentId);
    }
    if (learningContent.learningContentType === 'Chapter') {
      learningContent.children.forEach(c => cubeIds.push(c.contentId));
    }
  }
  const cubes = await findCubesByIdsCache(cubeIds);
  if (
    Array.isArray(cubes) &&
    cubes.some(c => c.type === 'ClassRoomLecture' || c.type === 'ELearning')
  ) {
    const cube = cubes.find(
      c => c.type === 'ClassRoomLecture' || c.type === 'ELearning'
    );
    if (cube !== undefined) {
      await requestLectureState(cube.id, cube.type);
      await getClassroomFromCube(cube.id);
      lectureCardSummary.hasClassroomCube = true;
    }
  }
  setLectureCardSummary(lectureCardSummary);
  const inMyLectureCdo = makeInMyLectureCdo(card);
  setInMyLectureCdo(inMyLectureCdo);
}
