import { getAxios } from 'shared/api/Axios';
import { AxiosReturn } from 'shared/api/AxiosReturn';
import { createCacheApi } from './cacheableApi';
import { SkProfileService } from '../../../profile/stores';

const BASE_URL = '/api/checkpoint';

function findSsoType() {
  const email = SkProfileService.instance.skProfile.email;
  const axios = getAxios();
  const url = `${BASE_URL}/sso/type?loginId=${email}`;
  return axios.get<string>(url).then(AxiosReturn);
}

export const [findSsoTypeCache] = createCacheApi(findSsoType);
