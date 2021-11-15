import { getAxios } from '../../../../packages/api/getAxios';
import { AxiosReturn } from '../../../../packages/api/AxiosReturn';

const BASE_URL = '/api/community/bookmarks';

export function registerBookmark(postId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/posts/${postId}`;
  return axios.post<string>(url).then(AxiosReturn);
}

export function removeBookmark(postId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/posts/${postId}`;
  return axios.delete(url).then(AxiosReturn);
}

export function registerCommunityBookmark(communityId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/communities/${communityId}`;
  return axios.post<string>(url).then(AxiosReturn);
}

export function removeCommunityBookmark(communityId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/communities/${communityId}`;
  return axios.delete(url).then(AxiosReturn);
}

export function findCommunityBookmarkCount(communityId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/communities/${communityId}/count`;
  return axios.get<number>(url).then(AxiosReturn);
}
