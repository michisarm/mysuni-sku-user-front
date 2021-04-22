import { createCacheApi } from '../../lecture/detail/api/cacheableApi';
import { ContentsProviderSaml } from '../model/ContentsProviderSaml';
import { getAxios } from './Axios';
import { AxiosReturn } from './AxiosReturn';

const BASE_URL = '/api/checkpoint';

function findContentsProviderSaml() {
  const axios = getAxios();
  const url = `${BASE_URL}/contentsProviderSaml`;
  return axios.get<ContentsProviderSaml[]>(url).then(AxiosReturn);
}

export const [findContentsProviderSamlCache] = createCacheApi(
  findContentsProviderSaml
);
