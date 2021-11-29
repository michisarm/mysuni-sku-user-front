import { getAxios } from '../../../../packages/api/getAxios';
import { AxiosReturn } from '../../../../packages/api/AxiosReturn';
import { FollowWithFollowingCount } from '../../../../model/FollowWithFollowingCount';
import { OffsetElementList } from '../../accent/models/OffsetElementList';
import Profile from '../models/Profile';
import { Follows } from '../models/Follows';

const BASE_URL = '/api/community/follows';

export function findAllFollow(): Promise<Follows[] | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}`;
  return axios.get<Follows[]>(url).then(AxiosReturn);
}

export function follow(id: string) {
  const axios = getAxios();
  const url = `${BASE_URL}?followingId=${id}`;
  return axios.post(url).then(AxiosReturn);
}

export function unfollow(id: string) {
  const axios = getAxios();
  const url = `${BASE_URL}?followingId=${id}`;
  return axios.delete(url).then(AxiosReturn);
}

export function findFollowCount(
  memberId: string
): Promise<FollowWithFollowingCount | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/count/${memberId}`;
  return axios.get<FollowWithFollowingCount>(url).then(AxiosReturn);
}

export function findFollowerUsers(
  memberId: string
): Promise<OffsetElementList<Profile> | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/followers/${memberId}`;
  return axios.get<OffsetElementList<Profile>>(url).then(AxiosReturn);
}

export function findFollowingUsers(
  memberId: string
): Promise<OffsetElementList<Profile> | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/followings/${memberId}`;
  return axios.get<OffsetElementList<Profile>>(url).then(AxiosReturn);
}
