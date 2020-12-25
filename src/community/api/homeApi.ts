import { axiosApi, OffsetElementList, NameValueList } from '@nara.platform/accent';
import Axios, { AxiosResponse } from 'axios';
import CommunityHomeInfo from 'community/model/CommunityHome';
import { CommunityHomeCreateItem } from 'community/viewModel/CommunityHomeCreate';

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

// admin Home - save
export function modifyHome(
  communityId: string,
  homeId: string,
  nameValueList: NameValueList
): Promise<any> {
  return axiosApi.put(`${BASE_URL}/${communityId}/home/${homeId}`, nameValueList).then(AxiosReturn);
}

export function registerHome(
  communityId: string, 
  communityHomeCreateItem: CommunityHomeCreateItem): Promise<string> {
  return axiosApi
    .post<string>(`${BASE_URL}/${communityId}/home`, communityHomeCreateItem)
    .then((response) => response && response.data && response.data);
}