import { AxiosReturn } from '../../../../packages/api/AxiosReturn';
import { getAxios } from '../../../../packages/api/getAxios';
import { hanleUnAuthorizedError } from '../../../../packages/api/AxiosError';
import Profile from '../models/Profile';
import { NameValue } from '../../accent/models/NameValue';
import { AdditionalUserInfo } from '../models/AdditionalUserInfo';
import { createCacheApi } from '../../../../packages/api/cacheableApi';

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
