import { getAxios } from '../../../../packages/api/getAxios';
import { AxiosReturn } from '../../../../packages/api/AxiosReturn';
import { MemberSearchBox } from '../models/MemberSearchBox';
import { OffsetElementList } from '../../accent/models/OffsetElementList';
import { Member } from '../models/Member';
import { CommunityMemberTabTypeCount } from '../models/CommunityMemberTabCount';
import { CountType } from '../models/CountType';
import { MemberCount } from '../models/MemberCount';
import { CommunityMemberApprovedType } from '../models/CommunityMemberApprovedType';

const BASE_URL = '/api/community';

export function findMembers(
  communityId: string,
  searchBox: MemberSearchBox
): Promise<OffsetElementList<Member> | undefined> {
  const axios = getAxios();

  return axios
    .get<OffsetElementList<Member>>(`${BASE_URL}/memberviews/${communityId}`, {
      params: searchBox,
    })
    .then(AxiosReturn);
}

export function findMember(communityId: string): Promise<Member | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/communities/${communityId}/members/findMember`;

  return axios.get<Member>(url).then(AxiosReturn);
}

export function joinCommunity(communityId: string): Promise<void> {
  const axios = getAxios();
  const url = `${BASE_URL}/communities/${communityId}/members/flow/join`;

  return axios.post<void>(url).then(AxiosReturn);
}

export function findMemberTabCount(
  communityId: string
): Promise<CommunityMemberTabTypeCount | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/communities/${communityId}/members/flow/tabCount`;

  return axios.get<CommunityMemberTabTypeCount>(url).then(AxiosReturn);
}

// 카운트  api 확인 필요
export function findMemberCount(communityId: string, countType: CountType) {
  const axios = getAxios();
  const url = `${BASE_URL}/communities/${communityId}/members/count?type=${countType}`;
  return axios.get<MemberCount>(url).then(AxiosReturn);
}

export function findMemberApprovedType(
  communityId: string
): Promise<CommunityMemberApprovedType | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/memberviews/existsMe/${communityId}`;

  return axios.get<CommunityMemberApprovedType>(url).then(AxiosReturn);
}
