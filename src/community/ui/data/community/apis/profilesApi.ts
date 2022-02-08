import { AxiosReturn } from '../../../../packages/api/AxiosReturn';
import { getAxios } from '../../../../packages/api/getAxios';
import { hanleUnAuthorizedError } from '../../../../packages/api/AxiosError';
import Profile from '../models/Profile';
import { NameValue } from '../../accent/models/NameValue';
import { AdditionalUserInfo } from '../models/AdditionalUserInfo';
import { createCacheApi } from '../../../../packages/api/cacheableApi';
import { UserIdentities } from '../models/UserIdentities';
import { OffsetElementList } from 'shared/model';

const BASE_URL = '/api/user/users';

export function findProfile(): Promise<Profile | undefined> {
  const axios = getAxios();
  const url = BASE_URL;
  return axios
    .get<Profile>(url)
    .then(AxiosReturn)
    .catch(hanleUnAuthorizedError);
}

export function modifyProfile(nameValues: NameValue[]) {
  const axios = getAxios();
  const url = BASE_URL;
  return axios.put(url, { nameValues }).then(AxiosReturn);
}

export function findUserProfile(
  profileId: string
): Promise<Profile | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/${profileId}`;
  return axios.get<Profile>(url).then(AxiosReturn);
}

function findMyAdditionalInfo() {
  const axios = getAxios();
  const url = `${BASE_URL}/additionalInfo`;
  return axios.get<AdditionalUserInfo>(url).then(AxiosReturn);
}

export const [findMyAdditionalInfoCache, clearFindMyAdditionalInfoCache] =
  createCacheApi(findMyAdditionalInfo);

export function modifyAdditionalInfo(nameValues: NameValue[]) {
  const axios = getAxios();
  const url = `${BASE_URL}/additionalInfo`;
  return axios.put<void>(url, { nameValues }).then(AxiosReturn);
}

export function findJsonUserGroup() {
  const axios = getAxios();
  const url = `${BASE_URL}/jsonUserGroup`;
  return axios.get(url).then((response) => (response && response.data) || null);
}

export function findSameDepartmentUserIdentities(
  searchWord: string
): Promise<UserIdentities[] | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/findSameDepartmentUserIdentities?keyword=${searchWord}`;

  return axios.get<UserIdentities[]>(url).then(AxiosReturn);
}

export function findUserIdentitiesByKeyword(
  searchWord: string,
  limit: number,
  offset: number
): Promise<OffsetElementList<UserIdentities> | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/findUserIdentitiesByKeyword?keyword=${searchWord}&limit=${limit}&offset=${offset}`;

  return axios.get<OffsetElementList<UserIdentities>>(url).then(AxiosReturn);
}
