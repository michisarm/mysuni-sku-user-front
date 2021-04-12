import { getAxios } from '../../../shared/api/Axios';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';
import { NameValueList } from '../../../shared/model/NameValueList';
import { Cube } from '../../model/Cube';
import { CubeDetail } from '../../model/CubeDetail';
import { PostBodyCdo, PostCdo } from '../model/TaskCdo';
import { createCacheApi } from './cacheableApi';

const BASE_URL = '/api/cube';

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
  const url = `${BASE_URL}/cubes/byIds`;
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
  const url = `${BASE_URL}/cubes/${cubeId}/detail`;
  return axios.get<CubeDetail>(url).then(AxiosReturn);
}

const [findCubeDetailCache, clearFindCubeDetailCache] = createCacheApi(
  findCubeDetail
);
export { findCubeDetailCache, clearFindCubeDetailCache };

export function registerPost(postCdo: PostCdo) {
  const axios = getAxios();
  const url = `${BASE_URL}/posts`;
  return axios.post<string>(url, postCdo).then(AxiosReturn);
}

export function registerPostBody(postBodyCdo: PostBodyCdo) {
  const axios = getAxios();
  const url = `${BASE_URL}/postbodys`;
  return axios.post<string>(url, postBodyCdo).then(AxiosReturn);
}

export function modifyPost(
  postId: string,
  nameValueList: { nameValues: { name: string; value: string }[] }
) {
  const axios = getAxios();
  const url = `${BASE_URL}/posts/${postId}`;
  return axios.put<void>(url, nameValueList).then(AxiosReturn);
}

export function modifyPostBody(
  postBodyId: string,
  nameValueList: { nameValues: { name: string; value: string }[] }
) {
  const axios = getAxios();
  const url = `${BASE_URL}/postbodys/${postBodyId}`;
  return axios.put<void>(url, nameValueList).then(AxiosReturn);
}
