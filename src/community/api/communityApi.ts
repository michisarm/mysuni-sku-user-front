import { axiosApi, OffsetElementList } from '@nara.platform/accent';
import Axios, { AxiosResponse } from 'axios';
import Post from 'community/model/Post';
import PostList from 'community/model/PostList';
import PostCdo from 'community/model/PostCdo';
import PostUdo from 'community/model/PostUdo';
import Community from '../model/Community';
import CommunityHomeInfo from '../model/CommunityHome';
import CommunityMenu from '../model/CommunityMenu';
import Profile from '../model/Profile';
import FieldItem from '../viewModel/OpenCommunityIntro/FieldItem';
import PostRdo from 'community/model/PostRdo';
import FollowCommunityItem from 'community/viewModel/CommunityFollowIntro/FollowCommunityItem';
import { NameValueList } from 'shared/model';

const BASE_URL = '/api/community';

function AxiosReturn<T>(response: AxiosResponse<T>) {
  if (
    response === null ||
    response === undefined ||
    response.data === null ||
    response.data === null ||
    (response.data as unknown) === ''
  ) {
    return undefined;
  }
  return response.data;
}

export function registerCommunityCommentPost(
  title: string,
): Promise<string> {
  const url = `/api/feedback/feedback/comment`;
  return axiosApi
    .post<string>(url, { "title": title, "audienceKey": "", "sourceEntity": { "id": "post", "name": "post" } })
    .then(response => response && response.data);
}

export function registerPost(
  communityId: string,
  postCdo: PostCdo
): Promise<Post> {
  const url = `${BASE_URL}/communities/${communityId}/posts`;
  return axiosApi
    .post<Post>(url, postCdo)
    .then(response => response && response.data);
}

export function registerNoticePost(
  communityId: string,
  postCdo: PostCdo
): Promise<Post> {
  const url = `${BASE_URL}/communities/${communityId}/noticePosts`;
  return axiosApi
    .post<Post>(url, postCdo)
    .then(response => response && response.data);
}

export function findPostViewsByMenuId(
  postRdo: any
): Promise<OffsetElementList<Post> | undefined> {
  const params = {
    communityId: postRdo.communityId,
    offset: postRdo.offset,
    limit: postRdo.limit,
    menuId: postRdo.menuId,
    searchGubun: postRdo.searchGubun,
    sort: postRdo.sort,
    searchTitle: postRdo.searchTitle

  };
  const url = `${BASE_URL}/postviews/menu/${postRdo.menuId}`
  return axiosApi.get<OffsetElementList<Post>>(url, {params}).then(AxiosReturn);
}

export function findAllPostViewsFromMyCommunities(
  sort: string,
  offset: number,
  limit: number
): Promise<OffsetElementList<Post> | undefined> {
  const url = `${BASE_URL}/postviews/my?sort=${sort}&offset=${offset}&limit=${limit}`;
  return axiosApi.get<OffsetElementList<Post>>(url).then(AxiosReturn);
}

export function findNoticePostViews(
  communityId: string,
  sort: string,
  offset: number,
  limit: number
): Promise<OffsetElementList<Post> | undefined> {
  const url = `${BASE_URL}/postviews/notice/${communityId}?sort=${sort}&offset=${offset}&limit=${limit}`;
  return axiosApi.get<OffsetElementList<Post>>(url).then(AxiosReturn);
}

export function findPostView(
  postId: string
): Promise<Post> {
  const url = `${BASE_URL}/postviews/post/${postId}`;
  return axiosApi.get<Post>(url).then(response => response && response.data);
}

//커뮤니티 - 전체글
export function findAllPost(
  postRdo: any
): Promise<OffsetElementList<Post> | undefined> {
  const url = `${BASE_URL}/postviews/community/${postRdo.communityId}?sort=${postRdo.sort}&offset=${postRdo.offset}&limit=${postRdo.limit}`;
  return axiosApi.get<OffsetElementList<Post>>(url).then(response => response && response.data);
}

//커뮤니티 - 공지사항
export function findNoticePost(
  postRdo: any
): Promise<OffsetElementList<Post> | undefined> {
  const url = `${BASE_URL}/postviews/notice/${postRdo.communityId}?sort=${postRdo.sort}&offset=${postRdo.offset}&limit=${postRdo.limit}`;
  return axiosApi.get<OffsetElementList<Post>>(url).then(response => response && response.data);
}

export function modifyCommunityPost(
  communityId: string,
  postId: string,
  nameValues: NameValueList
): Promise<Post> {
  const url = `${BASE_URL}/communities/${communityId}/posts/${postId}/nameValues`;
  return axiosApi
    .put<Post>(url, nameValues)
    .then(response => response && response.data);
}

export function findProfile(): Promise<Profile | undefined> {
  const url = `${BASE_URL}/profiles`;
  return axiosApi.get<Profile>(url).then(AxiosReturn);
}

export function findAllMyCommunities(sort:string): Promise<
  OffsetElementList<Community> | undefined
> {
  const url = `${BASE_URL}/communities/my?sort=${sort}&offset=0&limit=100`;
  return axiosApi.get<OffsetElementList<Community>>(url).then(AxiosReturn);
}

export function findAllOpenCommunities(
  fieldId?: string
): Promise<OffsetElementList<Community> | undefined> {
  const url = `${BASE_URL}/communities/openCommunities?field=${fieldId === undefined ? '' : fieldId
    }&offset=0&limit=100`;
  return axiosApi.get<OffsetElementList<Community>>(url).then(AxiosReturn);
}

export function findAllFields(): Promise<FieldItem[] | undefined> {
  const url = `${BASE_URL}/fields`;
  return axiosApi.get<FieldItem[]>(url).then(AxiosReturn);
}

export function findCommunity(
  communityId: string
): Promise<Community | undefined> {
  const url = `${BASE_URL}/communities/${communityId}`;
  return axiosApi.get<Community>(url).then(AxiosReturn);
}

export function findHome(
  communityId: string
): Promise<CommunityHomeInfo | undefined> {
  const url = `${BASE_URL}/${communityId}/home`;
  return axiosApi.get<CommunityHomeInfo>(url).then(AxiosReturn);
}

export function findAllMenus(
  communityId: string
): Promise<CommunityMenu[] | undefined> {
  const url = `${BASE_URL}/${communityId}/menus`;
  return axiosApi.get<CommunityMenu[]>(url).then(AxiosReturn);
}

export function findPostByMenuId(
  menuId: string
): Promise<Post> {
  const url = `${BASE_URL}/post/menu/${menuId}`;
  return axiosApi.get<Post>(url).then(response => response && response.data);
}

export function deleteCommunityPost(
  communityId: string,
  postId: string
): Promise<Post> {
  const url = `${BASE_URL}/communities/${communityId}/posts/${postId}`;
  return axiosApi.delete(url).then(response => response && response.data);
}
// follow
export function followPostList(
  offset: number,
  limit: number
): Promise<OffsetElementList<Post> | undefined> {
  const url = `${BASE_URL}/postviews/followers?offset=${offset}&limit=${limit}`;
  // console.log('axios offset', offset, limit);
  return axiosApi.get<OffsetElementList<Post>>(url).then(response => response && response.data);
}
export function followList(
  offset: number,
  limit: number,
  nickName: string
): Promise<
  OffsetElementList<FollowCommunityItem> | undefined
> {
  const url = `${BASE_URL}/profileviews/follow?offset=${offset}&limit=${limit}&nickName=${nickName}`;
  // console.log('list',axiosApi.get<OffsetElementList<Community>>(url).then(AxiosReturn));
  return axiosApi.get<OffsetElementList<FollowCommunityItem>>(url).then(AxiosReturn);
}

export function followModal(): Promise<any> {
  const url=`${BASE_URL}/profileviews/following?offset=0&limit=13`;
  return axiosApi.get(url).then(AxiosReturn);
}

export function findPostMenuName(
  communityId: string,
  menuId: string
): Promise<any> {
  const url = `${BASE_URL}/${communityId}/menus/${menuId}`;
  return axiosApi.get(url).then(response => {
    return response && response.data
  });
}