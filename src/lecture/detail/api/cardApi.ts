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
import { Card } from '../../model/Card';
import { CardRdo } from '../model/CardRdo';
import { OffsetElementList } from '../../../shared/model';
import LectureFilterRdoModel from '../../model/LectureFilterRdoModel';
import { ExtraTaskType } from '../../model/ExtraTaskType';
import { CollegeAndCardCount } from '../../model/CollegeAndCardCount';

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

export function findCardList(cardIds: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/findCards`;

  return axios
    .get<CardWithCardRealtedCount[]>(url, { params: { ids: cardIds } })
    .then(AxiosReturn);
}

export const [findCardListCache, clearFindCardListCache] = createCacheApi(
  findCardList
);

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
function findMyCardRelatedStudents(cardId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/students/myCardRelatedStudents/${cardId}`;
  return axios.get<MyCardRelatedStudentsRom>(url).then(AxiosReturn);
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
  const url = `${BASE_URL}/cards/findByRdo`;
  return axios
    .get<OffsetElementList<CardWithCardRealtedCount>>(url, {
      params: cardRdo,
      paramsSerializer,
    })
    .then(AxiosReturn);
}

export function findByCardId(cardId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/students/card/${cardId}`;
  return axios.get<Student>(url).then(AxiosReturn);
}

export function findByCubeId(cubeId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/students/cube/${cubeId}`;
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
    .get<OffsetElementList<CardWithCardRealtedCount>>(
      `${BASE_URL}/cards/enrollingCards`,
      { params }
    )
    .then(response => (response && response.data) || null);
}
export function countRequiredCards() {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/required/count`;
  return axios.get<number>(url).then(AxiosReturn);
}

export function findCollegeAndCardCount() {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/required/collegeAndCardCount`;
  return axios.get<CollegeAndCardCount[]>(url).then(AxiosReturn);
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

export function registerHomework(
  studentId: string,
  fileBoxId: string,
  homework: string
): Promise<void> {
  const url = `${BASE_URL}/students/registerHomework/${studentId}/${fileBoxId}`;
  const axios = getAxios();
  return axios
    .put<void>(url, { homeworkContent: homework })
    .then(response => response && response.data);
}
