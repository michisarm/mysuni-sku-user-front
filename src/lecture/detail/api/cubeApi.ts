import { getAxios } from '../../../shared/api/Axios';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';
import { Cube } from '../../model/Cube';
import { CubeDetail } from '../../model/CubeDetail';
import { PostBodyCdo, PostCdo } from '../model/TaskCdo';
import { createCacheApi } from './cacheableApi';
import { LectureTimeSummary } from '../../../personalcube/personalcube/model/LectureTimeSummary';
import TaskChild from '../model/TaskChild';
import { TaskChildCdo } from '../model/TaskChildCdo';
import TaskDetailPost from '../model/TaskDetail';
import TaskDetailBody from '../model/TaskDetailBody';
import { IntPair } from '../../../shared/model/IntPair';

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

export function findPost(postId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/posts/${postId}`;
  return axios.get<TaskDetailPost>(url).then(AxiosReturn);
}

export function registerPostBody(postBodyCdo: PostBodyCdo) {
  const axios = getAxios();
  const url = `${BASE_URL}/postbodys`;
  return axios.post<string>(url, postBodyCdo).then(AxiosReturn);
}

export function findPostBody(postId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/postbodys/${postId}`;
  return axios.get<TaskDetailBody>(url).then(AxiosReturn);
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

export function findMyLectureTimeSummary() {
  const axios = getAxios();
  const url = `${BASE_URL}/cubes/myLectureTimeSummary`;
  return axios.get<LectureTimeSummary>(url).then(AxiosReturn);
}

// reply api-----------------------------------------------------------------

export function getReply(replyId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/replies/${replyId}`;

  return axios.get<TaskChild>(url).then(AxiosReturn);
}

export function postReply(replyCdo: TaskChildCdo) {
  const axios = getAxios();
  const url = `${BASE_URL}/replies`;

  return axios.post<string>(url, replyCdo).then(AxiosReturn);
}

export function modifyReply(
  replyId: string,
  nameValueList: { nameValues: { name: string; value: string }[] }
) {
  const axios = getAxios();
  const url = `${BASE_URL}/replies/${replyId}`;

  return axios.put<void>(url, nameValueList).then(AxiosReturn);
}

function countClassroomStudents(cubeId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/cubes/countClassroomStudents`;
  return axios
    .get<IntPair[]>(url, { params: { cubeId } })
    .then(AxiosReturn);
}

export const [
  countClassroomStudentsCache,
  cleaCountClassroomStudentsCache,
] = createCacheApi(countClassroomStudents);
