import { getAxios } from '../../../../packages/api/getAxios';
import { AxiosReturn } from '../../../../packages/api/AxiosReturn';
import { OffsetElementList } from '../../accent/models/OffsetElementList';
import { Post } from '../models/Post';
import { PostRdo } from '../models/PostRdo';
import { createCacheApi } from '../../../../packages/api/cacheableApi';
import { LastNoticePost } from '../models/LastNoticePost';

const BASE_URL = '/api/community/postviews';

export function findAllPost(communityId: string, postRdo: PostRdo) {
  const axios = getAxios();

  const url = `${BASE_URL}/community/${communityId}`;

  return axios
    .get<OffsetElementList<Post>>(url, { params: postRdo })
    .then(AxiosReturn);
}

export function findNoticePostViews(
  communityId: string,
  postNoticeRdo: PostRdo
): Promise<OffsetElementList<Post> | undefined> {
  const axios = getAxios();

  const url = `${BASE_URL}/notice/${communityId}`;

  return axios
    .get<OffsetElementList<Post>>(url, { params: postNoticeRdo })
    .then(AxiosReturn);
}

export const [findNoticePostViewsCache, clearFindNoticePostViewsCache] =
  createCacheApi(findNoticePostViews);

export function findHomeRecentPostViews(
  communityId: string,
  sort: string,
  offset: number,
  limit: number,
  orderNotContainPinned?: boolean
): Promise<OffsetElementList<Post> | undefined> {
  const axios = getAxios();

  const url = `${BASE_URL}/home/recent?communityId=${communityId}`;

  const params = {
    sort,
    offset,
    limit,
    orderNotContainPinned,
  };

  return axios.get<OffsetElementList<Post>>(url, { params }).then(AxiosReturn);
}

export const [findHomeRecentPostViewsCache, clearFindHomeRecentPostViewsCache] =
  createCacheApi(findHomeRecentPostViews);

export function findPostViewsByMenuId(
  communityId: string,
  menuId: string,
  postRdo: PostRdo
): Promise<OffsetElementList<Post> | undefined> {
  const axios = getAxios();

  const params = {
    communityId,
    menuId,
    offset: postRdo.offset,
    limit: postRdo.limit,
    searchGubun: postRdo.searchGubun,
    sort: postRdo.sort,
    searchTitle: postRdo.searchTitle,
    hasRelatedCards: postRdo.hasRelatedCards,
    orderNotContainPinned: postRdo.orderNotContainPinned,
  };

  const url = `${BASE_URL}/menu/${menuId}`;

  return axios
    .get<OffsetElementList<Post>>(url, { params })
    .then(AxiosReturn)
    .catch(() => undefined);
}

export const [findPostViewsByMenuIdCache, clearFindPostViewsByMenuIdCache] =
  createCacheApi(findPostViewsByMenuId);

export function findPostByMenuIdAndType(
  menuId: string,
  type: string
): Promise<Post | undefined> {
  const axios = getAxios();

  const url = `${BASE_URL}/post/menu/${menuId}/type/${type}`;
  return axios.get<Post>(url).then(AxiosReturn);
}

export function findAllPostViewsFromMyCommunities(
  sort: string,
  offset: number
): Promise<OffsetElementList<Post> | undefined> {
  const axios = getAxios();
  const limit = 10;
  const url = `${BASE_URL}/my`;
  return axios
    .get<OffsetElementList<Post>>(url, { params: { sort, offset, limit } })
    .then(AxiosReturn);
}

export function findPostView(postId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/post/${postId}`;
  return axios
    .get<Post>(url)
    .then(AxiosReturn)
    .catch(() => undefined);
}

export const [findPostViewCache, clearFindPostViewCache] =
  createCacheApi(findPostView);

export function findPostViewWithRead(postId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/postWithIncreaseReadCount/${postId}`;
  return axios.get<Post>(url).then(AxiosReturn);
}

export function findFollowPostViews(offset: number, limit: number = 5) {
  const axios = getAxios();
  const url = `${BASE_URL}/followers`;
  return axios
    .get<OffsetElementList<Post>>(url, { params: { offset, limit } })
    .then(AxiosReturn);
}

export function findAllPostViewsFromProfileFeed(
  memberId: string,
  offset: number,
  limit: number
): Promise<OffsetElementList<Post> | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/feed?offset=${offset}&limit=${limit}&memberId=${memberId}`;

  return axios.get<OffsetElementList<Post>>(url).then(AxiosReturn);
}

export function findAllPostViewsFromProfileBookmark(
  offset: number,
  limit: number
): Promise<OffsetElementList<Post> | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/bookmarks?offset=${offset}&limit=${limit}`;
  return axios.get<OffsetElementList<Post>>(url).then(AxiosReturn);
}

export function findLastNoticePost(
  communityId: string
): Promise<LastNoticePost | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/${communityId}/lastNoticePost`;

  return axios.get<LastNoticePost>(url).then(AxiosReturn);
}
