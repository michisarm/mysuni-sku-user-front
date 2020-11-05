import { axiosApi } from '@nara.platform/accent';
import Post from 'community/model/Post';
import { CommunityPostItem } from 'community/viewModel/CommunityPostList';

const BASE_URL = '/api/community';

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
  communityId: string,
): Promise<Post> {
  const url = `${BASE_URL}/communities/${communityId}/posts`;
  return axiosApi
    .get<Post>(url)
    .then(response => response && response.data);
}