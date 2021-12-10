import { axiosApi } from '@nara.platform/accent';
import { AxiosResponse } from 'axios';
import ProfilePopupModel from '../model/ProfilePopupModel';
import ProfileInfoModel from '../model/ProfileInfoModel';
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

export function findCommunityMyProfile(): Promise<ProfilePopupModel> {
  const url = `${BASE_URL}/profiles`;
  return axiosApi
    .get<ProfilePopupModel>(url)
    .then((response) => response && response.data);
}

export function modifyCommunityProfile(
  profileNameValues: NameValueList
): Promise<ProfilePopupModel> {
  const url = `${BASE_URL}/profiles`;
  return axiosApi
    .put<ProfilePopupModel>(url, profileNameValues)
    .then((response) => response && response.data);
}

export function findCommunityProfile(
  profileId: string
): Promise<ProfileInfoModel | undefined> {
  const url = `${BASE_URL}/profiles/flow/${profileId}`;
  return axiosApi.get<ProfileInfoModel>(url).then(AxiosReturn);
}

export function existsByNickname(nickname: string): Promise<boolean> {
  const url = `${BASE_URL}/profiles/existsByNickname/${nickname}`;
  return axiosApi
    .get<boolean>(url)
    .then((response) => response && response.data);
}

export function findUser(denizenIds: string) {
  return axiosApi
    .post<ProfileInfoModel[]>('/api/user/users/{}', denizenIds)
    .then((response: any) => (response && response.data) || []);
}
