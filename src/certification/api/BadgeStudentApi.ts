import { getAxios } from "../../shared/api/Axios";
import { AxiosReturn } from "../../shared/api/AxiosReturn";
import { BadgeStudent } from "../model/BadgeStudent";

const BASE_URL = '/api/badge/badgeStudents';

export function findBadgeStudent(badgeId: string): Promise<BadgeStudent | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/${badgeId}`;

  return axios.get<BadgeStudent>(url).then(AxiosReturn);
}