import { axiosApi } from '@nara.platform/accent';
import Post from 'community/model/Post';

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