import { axiosApi } from '@nara.platform/accent';
import { AxiosResponse } from 'axios';
import Profile from 'community/model/Profile';
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
    .put<Profile>(url, profileNameValues)
    .then(response => response && response.data);
}

export function findCommunityProfile(
  profileId: string
): Promise<Profile | undefined> {
  const url = `${BASE_URL}/profiles/flow/${profileId}`;
  return axiosApi
    .get<Profile>(url)
    .then(AxiosReturn);
}
