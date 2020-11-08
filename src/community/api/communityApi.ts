import { axiosApi, OffsetElementList } from '@nara.platform/accent';
import { AxiosResponse } from 'axios';
import Post from 'community/model/Post';
import PostList from 'community/model/PostList';
import { CommunityPostItem } from 'community/viewModel/CommunityPostList';
import PostCdo from 'community/model/PostCdo';
import PostUdo from 'community/model/PostUdo';
import Community from '../model/Community';
import CommunityHomeInfo from '../model/CommunityHome';
import CommunityMenu from '../model/CommunityMenu';
import Profile from '../model/Profile';
import FieldItem from '../viewModel/OpenCommunityIntro/FieldItem';
import PostRdo from 'community/model/PostRdo';

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

export function registerCommunityPost(
  communityId: string,
  postCdo: PostCdo
): Promise<Post> {
  const url = `${BASE_URL}/communities/${communityId}/posts`;
  return axiosApi
    .post<Post>(url, postCdo)
    .then(response => response && response.data);
}

export function findCommunityPost(
  communityId: string,
  postId: string
): Promise<Post> {
  const url = `${BASE_URL}/communities/${communityId}/posts/${postId}`;
  return axiosApi.get<Post>(url).then(response => response && response.data);
}

export function findPosts(
  communityId: string,
  offset: number,
  limit: number
): Promise<OffsetElementList<Post> | undefined> {
  const url = `${BASE_URL}/communities/${communityId}/posts?offset=${offset}&limit=${limit}`;
  return axiosApi.get<OffsetElementList<Post>>(url).then(AxiosReturn);
}

export function findNoticePosts(
  communityId: string,
  offset: number,
  limit: number
): Promise<OffsetElementList<Post> | undefined> {
  const url = `${BASE_URL}/communities/${communityId}/posts/notice?offset=${offset}&limit=${limit}`;
  return axiosApi.get<OffsetElementList<Post>>(url).then(AxiosReturn);
}

export function findPostsByMenuId(
  menuId: string,
  offset: number,
  limit: number
): Promise<OffsetElementList<Post> | undefined> {
  const url = `${BASE_URL}/communities/board/${menuId}/posts?offset=${offset}&limit=${limit}`;
  return axiosApi.get<OffsetElementList<Post>>(url).then(AxiosReturn);
}

export function findCommunityPostList(postRdo: PostRdo): Promise<PostList> {
  const url = `${BASE_URL}/communities/${postRdo.communityId}/posts?startDate=${postRdo.startDate}&endDate=${postRdo.endDate}&title=${postRdo.title}&html=${postRdo.html}&creatorId=${postRdo.creatorId}&offset=${postRdo.offset}&limit=${postRdo.limit}&searchFilter=${postRdo.searchFilter}&menuId=${postRdo.menuId}&communityId=${postRdo.communityId}&sort=${postRdo.sort}`;
  return (
    axiosApi
      .get<PostList>(url)
      // .get<PostList>(url)
      .then(response => {
        console.log('response', response);
        return response && response.data;
      })
  );
}

export function modifyCommunityPost(
  communityId: string,
  postId: string,
  postUdo: PostUdo
): Promise<Post> {
  const url = `${BASE_URL}/communities/${communityId}/posts/${postId}`;
  return axiosApi
    .put<Post>(url, postUdo)
    .then(response => response && response.data);
}

export function findProfile(): Promise<Profile | undefined> {
  const url = `${BASE_URL}/profiles`;
  return axiosApi.get<Profile>(url).then(AxiosReturn);
}

export function findAllMyCommunities(): Promise<
  OffsetElementList<Community> | undefined
> {
  const url = `${BASE_URL}/communities/my`;
  return axiosApi.get<OffsetElementList<Community>>(url).then(AxiosReturn);
}

export function findAllOpenCommunities(
  fieldId?: string
): Promise<OffsetElementList<Community> | undefined> {
  const url = `${BASE_URL}/communities/openCommunities?field=${
    fieldId === undefined ? '' : fieldId
  }`;
  return axiosApi.get<OffsetElementList<Community>>(url).then(AxiosReturn);
}

export function findAllPostsFromMyCommunities(): Promise<
  OffsetElementList<Post> | undefined
> {
  const url = `${BASE_URL}/communities/my`;
  return axiosApi.get<OffsetElementList<Post>>(url).then(AxiosReturn);
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
