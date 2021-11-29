import { getAxios } from '../../../../packages/api/getAxios';
import { AxiosReturn } from '../../../../packages/api/AxiosReturn';
import { createCacheApi } from '../../../../packages/api/cacheableApi';
import { College } from '../models/College';
import { CollegeBanner } from '../models/CollegeBanner';

const BASE_URL = '/api/college/colleges';

export function findAllCollege() {
  const axios = getAxios();
  return axios.get<College[]>(BASE_URL).then(AxiosReturn);
}

export function findAvailableCollege() {
  const axios = getAxios();
  return axios.get<College[]>(`${BASE_URL}/available`).then(AxiosReturn);
}

export function findCollege(collegeId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/${collegeId}`;
  return axios.get<College>(url).then(AxiosReturn);
}

export function findCollegeBanners() {
  const axios = getAxios();
  const url = `${BASE_URL}/banner`;
  return axios.get<CollegeBanner[]>(url).then(AxiosReturn);
}

export const [findAllCollegeCache, clearfindAllCollegeCache] =
  createCacheApi(findAllCollege);

export const [findAvailableCollegeCache, clearfindAvailableCollegeCache] =
  createCacheApi(findAvailableCollege);
