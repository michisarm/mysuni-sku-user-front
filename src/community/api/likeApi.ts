import { axiosApi, OffsetElementList } from '@nara.platform/accent';
import Axios, { AxiosResponse } from 'axios';

const BASE_URL = '/api/community/like';

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

export function findCommunityPostLikeCountByMember(
  param_postId: string,
  param_memberId: string
): Promise<number> {
  const params = {
    postId: param_postId,
    memberId: param_memberId,
  }
  const url = `${BASE_URL}/count`
  return axiosApi.get<number>(url, { params }).then(response => response && response.data);
}

export function registerLike(
  postId: string,
  memberId: string
): Promise<string> {
  const likeCdo = {
    postId,
    memberId
  }
  const url = `${BASE_URL}/flow`
  return axiosApi.post<string>(url, likeCdo).then(response => response && response.data);
}