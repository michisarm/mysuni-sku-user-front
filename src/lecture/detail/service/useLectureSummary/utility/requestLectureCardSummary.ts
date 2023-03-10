import { timeToHourMinuteFormat } from '../../../../../shared/helper/dateTimeHelper';
import { Card } from '../../../../model/Card';
import { CardContents } from '../../../../model/CardContents';
import { CardRelatedCount } from '../../../../model/CardRelatedCount';
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
import { UserIdentity } from 'shared/model/UserIdentity';
import { getDefaultLang } from 'lecture/model/LangSupport';
import moment from 'moment';
import { setAddLearningCardIds } from 'playlist/playlistAddPopUp/playlistAddPopUpView.store';

function getVaildLeaningDate(
  validLearningDate: number,
  validStartDate: number,
  cardRelatedStudent?: MyCardRelatedStudentsRom
) {
  if (
    cardRelatedStudent &&
    cardRelatedStudent.cardStudent &&
    validLearningDate
  ) {
    const { registeredTime } = cardRelatedStudent.cardStudent;
    const validStartTime = Math.max(registeredTime, validStartDate);

    const parseCreateDate = new Date(validStartTime);
    parseCreateDate.setDate(
      parseCreateDate.getDate() + Math.max(validLearningDate - 1, 0)
    );

    // const year = parseCreateDate.getFullYear();
    // const month = parseCreateDate.getMonth() + 1;
    // const day = parseCreateDate.getDate();
    //
    // const result = `${year}.${month}.${day}`;
    return Math.max(parseCreateDate.getTime(), validStartDate);
  } else {
    return 0;
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
    langSupports,
  } = card;
  const { communityId, validLearningDate, patronKey } = cardContents;
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
      id: cardOperatorIdentity?.id || '',
      email: cardOperatorIdentity?.email || '',
      name: parsePolyglotString(
        cardOperatorIdentity?.name,
        getDefaultLang(langSupports)
      ),
      companyName: parsePolyglotString(
        cardOperatorIdentity?.companyName,
        getDefaultLang(langSupports)
      ),
    },
    stampCount,
    thumbImagePath,
    passedStudentCount,
    studentCount,
    difficultyLevel: difficultyLevel || 'Basic',
    hasCommunity: (communityId || '') !== '',
    communityId,
    // validLearningDate:
    //   getVaildLeaningDate(
    //     validLearningDate,
    //     moment(cardContents.learningPeriod.endDate).endOf('day').valueOf(),
    //     cardRelatedStudent
    //   ) || moment(cardContents.learningPeriod.endDate).endOf('day').valueOf(),
    learningStartDate: moment(cardContents.learningPeriod.startDate)
      .startOf('day')
      .valueOf(),
    learningEndDate: moment(cardContents.learningPeriod.endDate)
      .endOf('day')
      .valueOf(),
    validStartDate: cardRelatedStudent?.cardStudent?.registeredTime || 0,
    validEndDate:
      getVaildLeaningDate(
        validLearningDate,
        moment(cardContents.learningPeriod.startDate).endOf('day').valueOf(),
        cardRelatedStudent
      ) || moment(cardContents.learningPeriod.endDate).endOf('day').valueOf(),
    restrictLearningPeriod: cardContents.restrictLearningPeriod,
    complete: cardRelatedStudent!.cardStudent?.complete || false,
    learningState: cardRelatedStudent?.cardStudent?.learningState || '',
    patronKey,
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
  setAddLearningCardIds([lectureCardSummary.cardId]);
  const inMyLectureCdo = makeInMyLectureCdo(card);
  setInMyLectureCdo(inMyLectureCdo);
}
