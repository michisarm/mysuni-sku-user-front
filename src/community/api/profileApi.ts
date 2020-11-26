import { axiosApi } from '@nara.platform/accent';
import Post from 'community/model/Post';
import PostCdo from 'community/model/PostCdo';
import PostUdo from 'community/model/PostUdo';
import Profile from 'community/model/Profile';
import ProfileUdo from 'community/model/ProfileUdo';
import { NameValueList } from 'shared/model';

const BASE_URL = '/api/community';

export function findCommunityMyProfile(
): Promise<Profile> {
  const url = `${BASE_URL}/profiles`;
  return axiosApi
    .get<Profile>(url)
    .then(response => response && response.data);
}

export function modifyCommunityProfile(
  profileNameValues: NameValueList
): Promise<Profile> {
  const url = `${BASE_URL}/profiles`;
  return axiosApi
    .put<Profile>(url,profileNameValues)
    .then(response => response && response.data);
}

/*export function modifyCommunityProfile(
  profileUdo: ProfileUdo
): void {
  const url = `${BASE_URL}/profiles`;
  axiosApi
    .put<Profile>(url,profileUdo)
    .then(response => response && response.data);
}*/