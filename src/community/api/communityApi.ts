import { axiosApi } from '@nara.platform/accent';
import Post from 'community/model/Post';
import PostList from 'community/model/PostList';
import { CommunityPostItem } from 'community/viewModel/CommunityPostList';
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
  console.log('postRdo', postRdo)
  const url = `${BASE_URL}/communities/${postRdo.communityId}/posts`;
  return axiosApi
    .post<PostList>(url,postRdo)
    // .get<PostList>(url)
    .then(response => response && response.data);
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