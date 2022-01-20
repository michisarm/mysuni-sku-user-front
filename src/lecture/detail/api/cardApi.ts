import { CardWithContentsAndRelatedCountRom } from 'lecture/model/CardWithContentsAndRelatedCountRom';
import { getAxios } from 'shared/api/Axios';
import { AxiosReturn } from 'shared/api/AxiosReturn';
import { MyCardRelatedStudentsRom } from '../../model/MyCardRelatedStudentsRom';
import Student from '../../model/Student';
import { Test } from '../../model/Test';
import { createCacheApi } from './cacheableApi';
import { CardWithLearningContentCountRom } from '../../model/CardWithLearningContentCountRom';
import { StudentCdo } from '../../model/StudentCdo';
import { CardWithCardRealtedCount } from '../../model/CardWithCardRealtedCount';
import { EnrollingCardList } from '../../model/EnrollingCardList';
import { Card } from '../../model/Card';
import { CardRdo } from '../model/CardRdo';
import { OffsetElementList } from '../../../shared/model';
import LectureFilterRdoModel from '../../model/LectureFilterRdoModel';
import { ExtraTaskType } from '../../model/ExtraTaskType';
import { CollegeAndCardCount } from '../../model/CollegeAndCardCount';
import { RecommendCardRom } from '../../model/RecommendCardRom';
import { CardTypeAndCardCount } from '../../model/CardTypeAndCardCount';
import { ChannelAndCardCountRom } from '../model/ChannelAndCardCountRom';
import { UserLectureCard } from '@sku/skuniv-ui-lecture-card';
import LearningTabCountViewModel from 'lecture/model/learning/LearningTabCountViewModel';
import CardOrderBy from 'lecture/model/learning/CardOrderBy';
import { MyLearningRdo } from '../model/MyLearningRdo';
import moment from 'moment';
import MyPlaylistCardRdo from '../../../layout/UserApp/Header/present/model/MyPlaylistCardRdo';

const BASE_URL = '/api/lecture';

function paramsSerializer(paramObj: Record<string, any>) {
  const params = new URLSearchParams();
  for (const key in paramObj) {
    if (paramObj[key] !== undefined) {
      params.append(key, paramObj[key]);
    }
  }
  return params.toString();
}

function findCard(cardId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/${cardId}`;
  return axios.get<CardWithContentsAndRelatedCountRom>(url).then(AxiosReturn);
}

export const [findCardCache, clearFindCardCache] = createCacheApi(findCard);

export function findCardFromCardBundle(
  cardIds: string[],
  limit: number,
  isRecommendation: boolean
) {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/byCardFromCardBundleRdo`;
  const postBodyCdo = {
    cardIds,
    limit,
    recommendation: isRecommendation,
  };

  return axios.post<UserLectureCard[]>(url, postBodyCdo).then(AxiosReturn);
}

// export function findCardList(cardIds: string) {
//   const axios = getAxios();
//   // const url = `${BASE_URL}/cards/findCards`;
//   const url = `${BASE_URL}/cards/findCardForUserViewRdos`;
//
//   return axios
//     .get<UserLectureCard[]>(url, { params: { ids: cardIds } })
//     .then(AxiosReturn);
// }

export function findCardList(cardIds: string[]) {
  const axios = getAxios();
  // const url = `${BASE_URL}/cards/findCards`;
  const url = `${BASE_URL}/cards/findCardForUserViewRdos`;
  const cardForUserViewByIdQdo = {
    ids: cardIds,
  };
  return axios
    .post<UserLectureCard[]>(url, cardForUserViewByIdQdo)
    .then(AxiosReturn);
}

export const [findCardListCache, clearFindCardListCache] = createCacheApi(
  findCardList
);

export function findMyLatestLearningCards(count: number) {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/findMyLatestLearningCards`;

  return axios
    .get<UserLectureCard[]>(url, { params: { count } })
    .then(AxiosReturn);
}

export function findCardWithLearningContentCounts(
  cardIds: string[]
): Promise<CardWithLearningContentCountRom[] | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/findCardsWithLearningContentCounts`;
  const splitedCardIds = (cardIds && cardIds.join(',')) || [];

  return axios
    .get<CardWithLearningContentCountRom[]>(url, {
      params: {
        ids: splitedCardIds,
      },
    })
    .then(AxiosReturn);
}

async function findMyCardRelatedStudents(cardId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/students/myCardRelatedStudents/${cardId}`;
  const result = await axios
    .get<MyCardRelatedStudentsRom>(url)
    .then(AxiosReturn);
  if (result !== undefined) {
    if (
      result.cardStudent === null &&
      Array.isArray(result.cubeStudents) &&
      result.cubeStudents[0] !== undefined
    ) {
      const cubeStudent = result.cubeStudents[0];
      await registerStudent({
        cardId,
        cubeId: cubeStudent.lectureId,
        round: cubeStudent.round,
      });
      return axios.get<MyCardRelatedStudentsRom>(url).then(AxiosReturn);
    }
  }
  return result;
}

export const [
  findMyCardRelatedStudentsCache,
  clearFindMyCardRelatedStudentsCache,
] = createCacheApi(findMyCardRelatedStudents);

function findRelatedCards(cardId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/card/findRelatedCards/${cardId}`;
  return axios.get<Card[]>(url).then(AxiosReturn);
}

export const [
  findRelatedCardsCache,
  clearFindRelatedCardsCache,
] = createCacheApi(findRelatedCards);

export function findByRdo(cardRdo: CardRdo) {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/findCardWithRelatedCountByRdo`;
  return axios
    .get<OffsetElementList<CardWithCardRealtedCount>>(url, {
      params: cardRdo,
      paramsSerializer,
    })
    .then(AxiosReturn);
}

export function findByQdo(cardRdo: CardRdo) {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/findCardForUserViewRdoByCardQdo`;
  return axios
    .get<OffsetElementList<UserLectureCard>>(url, {
      params: cardRdo,
      paramsSerializer,
    })
    .then(AxiosReturn);
}

export function findCardsByRdo(cardRdo: CardRdo) {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/findCardsByRdo`;
  return axios
    .get<OffsetElementList<Card>>(url, {
      params: cardRdo,
      paramsSerializer,
    })
    .then(AxiosReturn);
}

export function findRequiredLearning() {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/required`;
  return axios.get<UserLectureCard[]>(url).then(AxiosReturn);
}

export const [findByRdoCache, clearFindByRdo] = createCacheApi(findByRdo);

export function findByCardId(cardId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/students/card/${cardId}`;
  return axios.get<Student>(url).then(AxiosReturn);
}

export function getStudentExam(studentId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/students/getStudentExam/${studentId}`;
  return axios.get<Test>(url).then(AxiosReturn);
}

export function confirmProgressByStudentId(studentId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/students/confirm/progressByStudentId/${studentId}`;
  return axios.get<Student>(url).then(AxiosReturn);
}

export function registerStudent(studentCdo: StudentCdo) {
  const axios = getAxios();
  const url = `${BASE_URL}/students`;
  return axios.post<string>(url, studentCdo).then(AxiosReturn);
}

export function cancelStudents(studentId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/students/cancel`;
  return axios.delete(url, { params: { ids: studentId } }).then(AxiosReturn);
}

export function markComplete(studentId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/students/markComplete`;
  return axios
    .put<void>(url, { studentId })
    .then(AxiosReturn);
}

export function findEnrollingCardList(lectureFilterRdo: LectureFilterRdoModel) {
  const params = {
    offset: lectureFilterRdo.offset,
    limit: lectureFilterRdo.limit,
    excludeClosed: lectureFilterRdo.excludeClosed,
  };

  const axios = getAxios();

  return axios
    .get<OffsetElementList<EnrollingCardList>>(
      `${BASE_URL}/cards/enrollingCards`,
      { params }
    )
    .then((response) => (response && response.data) || null);
}
export function countRequiredCards() {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/required/count`;
  return axios.get<number>(url).then(AxiosReturn);
}

export function countLearningTab() {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/cardCount`;
  return axios.get<LearningTabCountViewModel>(url).then(AxiosReturn);
}

export function findCollegeAndCardCount() {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/required/collegeAndCardCount`;
  return axios.get<CollegeAndCardCount[]>(url).then(AxiosReturn);
}

export function findCardTypeAndCardCount() {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/required/cardTypeAndCardCount`;
  return axios.get<CardTypeAndCardCount[]>(url).then(AxiosReturn);
}

export function saveTask(studentId: string, extraTaskType: ExtraTaskType) {
  const axios = getAxios();
  const url = `${BASE_URL}/students/save/${studentId}/${extraTaskType}`;
  return axios.put<void>(url).then(AxiosReturn);
}

export function submitTask(studentId: string, extraTaskType: ExtraTaskType) {
  const axios = getAxios();
  const url = `${BASE_URL}/students/submit/${studentId}/${extraTaskType}`;
  return axios.put<void>(url).then(AxiosReturn);
}

function findRecommendCards(channelLimit?: number, limit?: number) {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/recommend`;
  return axios
    .get<RecommendCardRom[]>(url, {
      params: {
        channelLimit,
        limit,
      },
    })
    .then(AxiosReturn);
}

export function findRecommendCardsByChannelId(
  channelId: string
): Promise<RecommendCardRom> {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/recommend/${channelId}`;
  return axios.get(url).then((response) => (response && response.data) || []);
}

export const [
  findRecommendCardsCache,
  clearFindRecommendCards,
] = createCacheApi(findRecommendCards);

export function registerHomework(
  studentId: string,
  fileBoxId: string,
  homework: string
): Promise<void> {
  const url = `${BASE_URL}/students/registerHomework/${studentId}?fileBoxId=${fileBoxId}`;
  const axios = getAxios();
  return axios
    .put<void>(url, { homeworkContent: homework })
    .then((response) => response && response.data);
}

function findMigCardIdMapping(lectureId: String) {
  const url = `${BASE_URL}/cards/migCardIdMapping/${lectureId}`;
  const axios = getAxios();
  return axios.get<{ cardId: string }>(url).then(AxiosReturn);
}

export const [findMigCardIdMappingCache] = createCacheApi(findMigCardIdMapping);

export function findChannelAndCardCount(language: string) {
  const url = `${BASE_URL}/cards/channelAndCardCount?language=${language}`;
  const axios = getAxios();
  return axios.get<ChannelAndCardCountRom[]>(url).then(AxiosReturn);
}

export function findCardsWithoutLearningExperience(cardIds: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/findCards/withoutLearningExperience`;
  return axios
    .get<UserLectureCard[]>(url, { params: { ids: cardIds } })
    .then(AxiosReturn);
}

export function findBookmarkCards(limit?: number, orderBy?: CardOrderBy) {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/bookmark?limit=${limit || 6}&orderBy=${
    orderBy || CardOrderBy.BookmarkRegisteredTimeDesc
  }`;
  return axios.get<OffsetElementList<UserLectureCard>>(url).then(AxiosReturn);
}

export function findSummeryTimeByYear() {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/findMyLearningRdo`;
  return axios.get<MyLearningRdo>(url).then(AxiosReturn);
}

export function findMyPlaylistCardRdos(
  cardIds: string[]
): Promise<MyPlaylistCardRdo[]> {
  //
  const axios = getAxios();
  const url = `${BASE_URL}/cards/myPlaylistCards`;
  return axios.post(url, cardIds).then(AxiosReturn);
}
