import { timeToHourMinuteFormat } from '../../../../../shared/helper/dateTimeHelper';
import { Card } from '../../../../model/Card';
import { CardContents } from '../../../../model/CardContents';
import { CardRelatedCount } from '../../../../model/CardRelatedCount';
import { UserIdentity } from '../../../../model/UserIdentity';
import { findCardCache } from '../../../api/cardApi';
import InMyLectureCdo from '../../../model/InMyLectureCdo';
import {
  setInMyLectureCdo,
  setLectureCardSummary,
} from '../../../store/LectureOverviewStore';
import LectureCardSummary from '../../../viewModel/LectureOverview/LectureCardSummary';

function parseInMyLectureCdo(card: Card): InMyLectureCdo {
  const {
    id: cardId,
    name,
    mainCategory = card.mainCategory || {
      channelId: '',
      collegeId: '',
      mainCategory: true,
    },
    learningTime,
    stampCount,
  } = card;
  return {
    category: mainCategory,
    learningTime,
    name,
    serviceId: cardId,
    cardId,
    serviceType: 'Card',
    stampCount,
  };
}

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
  const lectureCardSummary = parseLectureSummary(
    card,
    cardContents,
    cardOperatorIdentity,
    cardRelatedCount
  );
  setLectureCardSummary(lectureCardSummary);
  const inMyLectureCdo = parseInMyLectureCdo(card);
  setInMyLectureCdo(inMyLectureCdo);
}
