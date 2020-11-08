import { axiosApi } from '@nara.platform/accent';
import Post from 'community/model/Post';
import PostList from 'community/model/PostList';
import PostCdo from 'community/model/PostCdo';
import PostUdo from 'community/model/PostUdo';
import PostRdo from 'community/model/PostRdo';

const BASE_URL = '/api/community';

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
  return axiosApi
    .get<Post>(url)
    .then(response => response && response.data);
}

export function findCommunityPostList(
  postRdo: PostRdo
): Promise<PostList> {
  const url = `${BASE_URL}/communities/${postRdo.communityId}/posts?startDate=${postRdo.startDate}&endDate=${postRdo.endDate}&title=${postRdo.title}&html=${postRdo.html}&creatorId=${postRdo.creatorId}&offset=${postRdo.offset}&limit=${postRdo.limit}&searchFilter=${postRdo.searchFilter}&menuId=${postRdo.menuId}&communityId=${postRdo.communityId}&sort=${postRdo.sort}`;
  return axiosApi
    .get<PostList>(url)
    // .get<PostList>(url)
    .then(response => {
      console.log('response', response)
      return response && response.data
    });
}

export function modifyCommunityPost(
  communityId: string,
  postId: string,
  postUdo: PostUdo
): Promise<Post> {
  const url = `${BASE_URL}/communities/${communityId}/posts/${postId}`;
  return axiosApi
    .put<Post>(url,postUdo)
    .then(response => response && response.data);
}

export function deleteCommunityPost(
  communityId: string,
  postId: string,
): Promise<Post> {
  const url = `${BASE_URL}/communities/${communityId}/posts/${postId}`;
  return axiosApi
    .delete(url)
    .then(response => response && response.data);
}