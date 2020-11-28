import { axiosApi } from '@nara.platform/accent';
import Profile from 'community/model/Profile';
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