import { axiosApi } from '@nara.platform/accent';
import Post from 'community/model/Post';
import PostCdo from 'community/model/PostCdo';
import PostUdo from 'community/model/PostUdo';
import Profile from 'community/model/Profile';

const BASE_URL = '/api/community';

export function registerCommunityProfile(
  communityId: string,
  postCdo: PostCdo
): Promise<Post> {
  const url = `${BASE_URL}/profiles/${communityId}/posts`;
  return axiosApi
    .post<Post>(url, postCdo)
    .then(response => response && response.data);
}

export function findCommunityMyProfile(
): Promise<Profile> {
  const url = `${BASE_URL}/profiles`;
  return axiosApi
    .get<Profile>(url)
    .then(response => response && response.data);
}

export function modifyCommunityProfile(
  communityId: string,
  postId: string,
  postUdo: PostUdo
): Promise<Post> {
  const url = `${BASE_URL}/profiles/${communityId}/posts/${postId}`;
  return axiosApi
    .put<Post>(url,postUdo)
    .then(response => response && response.data);
}

export function removeCommunityProfile(
  communityId: string,
  postId: string,
  postUdo: PostUdo
): Promise<Post> {
  const url = `${BASE_URL}/profiles/${communityId}/posts/${postId}`;
  return axiosApi
    .put<Post>(url,postUdo)
    .then(response => response && response.data);
}