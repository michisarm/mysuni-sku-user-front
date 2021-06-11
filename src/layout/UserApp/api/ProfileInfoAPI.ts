import { axiosApi, OffsetElementList, NameValue } from '@nara.platform/accent';
import { getAxios } from '../../../shared/api/Axios';
import { CommunityModel } from '../model/CommunityModel';
import Axios, { AxiosResponse } from 'axios';
import { PostModel } from '../model/PostModel';
import { MyBadgeRdo } from '../../../certification/model/MyBadgeRdo';
import { BadgeModel, BadgesModel } from '../model/BadgeModel';
import { FollowModel } from '../model/FollowModel';

const BASE_URL = '/api/community';
const BASE_URL_Badge = '/api/badge/badges';
const BASE_URL_Follow = '/api/profile/follow';

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

// 가입된 커뮤니티 리스트 : 멤버아이디로 조회
export function findAllOtherCommunities(
  memberId: string,
  sort: string,
  offset: number
): Promise<OffsetElementList<CommunityModel> | undefined> {
  const url = `${BASE_URL}/communities/communityView/other/${memberId}?sort=${sort}&offset=${offset}&limit=0`;
  return axiosApi.get<OffsetElementList<CommunityModel>>(url).then(AxiosReturn);
}

// PostFeed 조회 : 멤버아이디로 조회
export function findAllPostViewsFromProfileFeed(
  memberId: string,
  offset: number
): Promise<OffsetElementList<PostModel> | undefined> {
  const url = `${BASE_URL}/postviews/ProfileFeed?offset=${offset}&limit=9999&memberId=${memberId}`;
  return axiosApi.get<OffsetElementList<PostModel>>(url).then(AxiosReturn);
}

// 뱃지 조회 : 멤버아이디로 조회
export function findBadgesByBadgeIssueState(
  memberId: string,
  startDate: string,
  endDate: string,
): Promise<OffsetElementList<BadgeModel> | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL_Badge}/findBadges/${memberId}?level=&issued=true&offset=0&limit=9999&startDate=${startDate}&endDate=${endDate}`;

  return axios
    .get<OffsetElementList<BadgeModel>>(url)
    .then(AxiosReturn);
}

// Follow List 조회
export function findAllFollow(
): Promise<string[] | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL_Follow}/flow`;

  return axios
    .get<string[]>(url)
    .then(AxiosReturn);
}

export function followMember(
  memberId: string,
): Promise<FollowModel | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL_Follow}/flow/${memberId}`;
  return axios
    .post<FollowModel>(url)
    .then(AxiosReturn);
}

// unFollow
export function unfollowMember(
  memberId: string,
): Promise<FollowModel | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL_Follow}/flow/${memberId}/unfollow`;
  return axios
    .post<FollowModel>(url)
    .then(AxiosReturn);
}