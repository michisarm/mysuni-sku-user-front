import { getAxios } from '../../../shared/api/Axios';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';
import { UserWorkspace } from '../../../approval/models/UserWorkspace';
import { createCacheApi } from './cacheableApi';

const BASE_URL = '/api/approval';
export function findMembersByDenizenKeys(denizenKeys: string[]) {
  const axios = getAxios();
  const url = `${BASE_URL}/members/byDenizenKeys`;
  return axios.post<string[]>(url, denizenKeys).then(AxiosReturn);
}

export function findMyUserWorkspace() {
  const axios = getAxios();
  const url = `${BASE_URL}/userWorkspaces/my`;
  return axios.get<UserWorkspace>(url).then(AxiosReturn);
}

export const [findMyUserWorkspaceCache, clearFindMyUserWorkspaceCache] =
  createCacheApi(findMyUserWorkspace);
