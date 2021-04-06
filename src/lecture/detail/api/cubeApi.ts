import { getAxios } from '../../../shared/api/Axios';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';
import { Cube } from '../../model/Cube';
import { CubeDetail } from '../../model/CubeDetail';
import { createCacheApi } from './cacheableApi';

const BASE_URL = '/api/cube/cubes';

function paramsSerializer(paramObj: Record<string, any>) {
  const params = new URLSearchParams();
  for (const key in paramObj) {
    if (paramObj[key] !== undefined) {
      params.append(key, paramObj[key]);
    }
  }
  return params.toString();
}

function findCubesByIds(ids: string[]) {
  if (ids.length === 0) {
    return Promise.resolve([]);
  }
  const axios = getAxios();
  const url = `${BASE_URL}/byIds`;
  return axios
    .get<Cube[]>(url, {
      params: { ids },
      paramsSerializer,
    })
    .then(AxiosReturn);
}

const [findCubesByIdsCache, clearFindCubesByIdsCache] = createCacheApi(
  findCubesByIds
);
export { findCubesByIdsCache, clearFindCubesByIdsCache };

function findCubeDetail(cubeId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/${cubeId}/detail`;
  return axios.get<CubeDetail>(url).then(AxiosReturn);
}

const [findCubeDetailCache, clearFindCubeDetailCache] = createCacheApi(
  findCubeDetail
);
export { findCubeDetailCache, clearFindCubeDetailCache };
