import { LearningState } from "../../shared/model";
import { getAxios } from "../../shared/api/Axios";
import { AxiosReturn } from "../../shared/api/AxiosReturn";
import Student from "../../lecture/model/Student";

const BASE_URL = '/api/lecture/students';

export function findCardStudentsByCardIdsAndLearningState(cardIds: string[], learningState: LearningState) {
  const axios = getAxios();
  const url = `${BASE_URL}/card/learningState`;
  const splitedIds = cardIds && cardIds.join(',') || '';

  return axios.get<Student[]>(url, {
    params: {
      cardIds: splitedIds,
      learningState,
    }
  }).then(AxiosReturn);
}

export function findCardStudentsByCardIds(cardIds: string[]) {
  const axios = getAxios();
  const url = `${BASE_URL}/card`;
  const splitedIds = cardIds && cardIds.join(',') || '';

  return axios.get<Student[]>(url, {
    params: {
      cardIds: splitedIds,
    }
  }).then(AxiosReturn);
}