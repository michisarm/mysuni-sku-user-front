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

const BASE_URL = '/api/lecture';

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
  const url = `${BASE_URL}/students`;
  return axios
    .put<void>(url, { studentId })
    .then(AxiosReturn);
}
