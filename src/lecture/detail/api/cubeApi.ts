// @ts-ignore
import { getAxios } from '../../../shared/api/Axios';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';
import { Cube } from '../../model/Cube';
import { CubeDetail } from '../../model/CubeDetail';
import { PostBodyCdo, PostCdo } from '../model/TaskCdo';
import { createCacheApi } from './cacheableApi';
import { LectureTimeSummary } from '../../../personalcube/personalcube/model/LectureTimeSummary';
import TaskChild from '../model/TaskChild';
import { TaskChildCdo } from '../model/TaskChildCdo';
import TaskDetail from '../model/TaskDetail';

import TaskDetailPost from '../model/TaskDetail';

import { IntPair } from '../../../shared/model/IntPair';
import { CubeMyDiscussionCounts } from '../../model/CubeMyDiscussionCounts';
import { CubeMyTaskConditionCounts } from '../../model/CubeMyTaskConditionCounts';
import { getCookie } from '@nara.platform/accent';
import { CubeMaterial } from '../../model/CubeMaterial';
import { CubeContents } from '../../model/CubeContents';
import { findContentsProviderSamlCache } from '../../../shared/api/checkpointApi';
import { ContentsProviderSaml } from '../../../shared/model/ContentsProviderSaml';
import ContentsProvider from '../../model/ContentsProvider';
import { ContentsProviderInfo } from '../../model/ContentsProviderInfo';
import { findSsoTypeCache } from './checkpointApi';
import { InstructorLearningTimeSummary } from 'personalcube/personalcube/model/InstructorLearningTimeSummary';

const BASE_URL = '/api/cube';

function concatDirectConnection(url: string, directConnection: string) {
  if (url === null || url === '') {
    return url;
  }
  if (!url.includes('?')) {
    return `${url}?${directConnection}`;
  }
  return `${url}&${directConnection}`;
}

async function AppendSamlQueryToCubeMaterial(
  cubeContents: CubeContents,
  cubeMaterial: CubeMaterial
) {
  if (cubeContents === undefined || cubeContents === null) {
    return cubeMaterial;
  }
  if (cubeMaterial === undefined || cubeMaterial === null) {
    return cubeMaterial;
  }
  let contentsProviderSamls: ContentsProviderSaml[] | undefined;
  try {
    contentsProviderSamls = await findContentsProviderSamlCache();
  } catch (error) {
    return cubeMaterial;
  }
  if (
    !Array.isArray(contentsProviderSamls) ||
    contentsProviderSamls.length === 0
  ) {
    return cubeMaterial;
  }
  let contentsProviderSaml = contentsProviderSamls.find(
    (c) => c.contentsProviderId === cubeContents.organizerId
  );
  if (
    cubeMaterial.media?.mediaContents.contentsProvider.contentsProviderType !==
      undefined &&
    cubeMaterial.media?.mediaContents.contentsProvider.url !== undefined
  ) {
    contentsProviderSaml = contentsProviderSamls.find(
      (c) =>
        c.contentsProviderId ===
        cubeMaterial.media?.mediaContents.contentsProvider.contentsProviderType
          .id
    );
  }
  if (contentsProviderSaml === undefined) {
    return cubeMaterial;
  }

  const loginUserSourceType = await findSsoTypeCache();
  if (loginUserSourceType === undefined) {
    return cubeMaterial;
  }
  const directConnection = contentsProviderSaml.contentsProviderDirectConnections.find(
    (c) => c.loginUserSourceType === loginUserSourceType
  )?.directConnection;
  if (directConnection === undefined) {
    return cubeMaterial;
  }

  if (
    cubeMaterial.media?.mediaContents.contentsProvider.contentsProviderType !==
      undefined &&
    cubeMaterial.media?.mediaContents.contentsProvider.url !== undefined
  ) {
    cubeMaterial.media.mediaContents.contentsProvider.url = concatDirectConnection(
      cubeMaterial.media?.mediaContents.contentsProvider.url,
      directConnection
    );
    contentsProviderSaml = contentsProviderSamls.find(
      (c) =>
        c.contentsProviderId ===
        cubeMaterial.media?.mediaContents.contentsProvider.contentsProviderType
          .id
    );
  }
  if (cubeMaterial.officeWeb?.webPageUrl !== undefined) {
    cubeMaterial.officeWeb.webPageUrl = concatDirectConnection(
      cubeMaterial.officeWeb.webPageUrl,
      directConnection
    );
  }
  if (Array.isArray(cubeMaterial.classrooms)) {
    cubeMaterial.classrooms = cubeMaterial.classrooms.map((classrooom) => {
      if (
        classrooom.operation.siteUrl !== undefined &&
        classrooom.operation.siteUrl !== ''
      ) {
        classrooom.operation.siteUrl = concatDirectConnection(
          classrooom.operation.siteUrl,
          directConnection
        );
      }
      return classrooom;
    });
  }

  return cubeMaterial;
}

async function AppendPanoptoSamlQueryToCubeMaterial(
  cubeContents: CubeContents,
  cubeMaterial: CubeMaterial
) {
  if (cubeContents === undefined || cubeContents === null) {
    return cubeMaterial;
  }
  if (cubeMaterial === undefined || cubeMaterial === null) {
    return cubeMaterial;
  }
  let contentsProviderSamls: ContentsProviderSaml[] | undefined;
  try {
    contentsProviderSamls = await findContentsProviderSamlCache();
  } catch (error) {
    return cubeMaterial;
  }
  if (
    !Array.isArray(contentsProviderSamls) ||
    contentsProviderSamls.length === 0
  ) {
    return cubeMaterial;
  }
  if (
    Array.isArray(cubeMaterial.media?.mediaContents.internalMedias) &&
    cubeMaterial.media?.mediaContents.internalMedias[0] !== undefined
  ) {
    const panoptoContentsProviderSaml = contentsProviderSamls.find(
      (c) => c.contentsProviderId === 'PANOPTO'
    );
    if (panoptoContentsProviderSaml !== undefined) {
      const loginUserSourceType = await findSsoTypeCache();
      if (loginUserSourceType === undefined) {
        return cubeMaterial;
      }
      const contentsProviderDirectConnection = panoptoContentsProviderSaml.contentsProviderDirectConnections.find(
        (c) => c.loginUserSourceType === loginUserSourceType
      );
      if (contentsProviderDirectConnection === undefined) {
        return cubeMaterial;
      }

      Array.from(cubeMaterial.media?.mediaContents.internalMedias).forEach(
        (internalMediaConnection) => {
          internalMediaConnection.directConnectionName =
            contentsProviderDirectConnection.directConnectionName;
          internalMediaConnection.targetSamlInstanceName =
            contentsProviderDirectConnection.targetSamlInstanceName;
        }
      );
    }
  }
  return cubeMaterial;
}

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
  return axios.post<Cube[]>(url, ids).then(AxiosReturn);
}

const [findCubesByIdsCache, clearFindCubesByIdsCache] = createCacheApi(
  findCubesByIds
);
export { findCubesByIdsCache, clearFindCubesByIdsCache };

function findCubeDetail(cubeId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/cubes/${cubeId}/detail`;
  return axios
    .get<CubeDetail>(url)
    .then(AxiosReturn)
    .then((r) => {
      if (r === undefined) {
        return undefined;
      }
      return AppendSamlQueryToCubeMaterial(r.cubeContents, r.cubeMaterial).then(
        (cubeMaterial) => {
          return { ...r, cubeMaterial } as CubeDetail;
        }
      );
    })
    .then((r) => {
      if (r === undefined) {
        return undefined;
      }
      return AppendPanoptoSamlQueryToCubeMaterial(
        r.cubeContents,
        r.cubeMaterial
      ).then((cubeMaterial) => {
        return { ...r, cubeMaterial } as CubeDetail;
      });
    });
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
  const url = `${BASE_URL}/posts/${postId}/detail`;
  return axios.get<TaskDetail>(url).then(AxiosReturn);
}

export function modifyPost(
  postId: string,
  nameValueList: { nameValues: { name: string; value: any }[] }
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

export function findMyInstructTimeSummary(year: number) {
  const axios = getAxios();
  const url = `${BASE_URL}/cubes/myInstructorLearningTimeSummary?year=${year}`;
  return axios.get<InstructorLearningTimeSummary>(url).then(AxiosReturn);
}

export function setPinByPostId(postId: string, pinned: number) {
  const axios = getAxios();
  const url = `${BASE_URL}/posts/setPinByPostId/${postId}/${pinned}`;
  return axios.put<string>(url).then(AxiosReturn);
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

export function findMyDiscussionCounts(studentId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/cubes/myDiscussionCounts/${studentId}`;
  return axios.get<CubeMyDiscussionCounts>(url).then(AxiosReturn);
}

function findContentProvider(contentsProviderId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/contentsProviders/${contentsProviderId}`;
  return axios.get<ContentsProviderInfo>(url).then(AxiosReturn);
}

export const [findContentProviderCache] = createCacheApi(findContentProvider);

export function findMyTaskConditionCounts(studentId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/cubes/myTaskConditionCounts/${studentId}`;
  return axios.get<CubeMyTaskConditionCounts>(url).then(AxiosReturn);
}
