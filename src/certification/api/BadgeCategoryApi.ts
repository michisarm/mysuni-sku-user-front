import { getAxios } from "../../shared/api/Axios";
import { AxiosReturn } from "../../shared/api/AxiosReturn";
import { BadgeCategory } from "../model/BadgeCategory";

const BASE_URL = '/api/badge/badgeCategories';

export function findAvailableBadgeCategories(): Promise<BadgeCategory[] | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/available`

  return axios.get<BadgeCategory[]>(url).then(AxiosReturn);
}