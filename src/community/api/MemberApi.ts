import { axiosApi as axios, axiosApi } from '@nara.platform/accent';
import MemberCdo from '../model/MemberCdo';
import Member from 'community/model/Member';
import { SearchBox } from 'community/model/SearchBox';
import { MemberTempModel } from 'community/model/MemberTempModel';
import { MemberTempCdoModel } from 'community/model/MemberTempCdoModel';
import { param } from 'jquery';

const BASE_URL = '/api/community';

export function findCommunities(limit: number, offset: number): Promise<any> {
  return axios.get(`${BASE_URL}`, {
    params: { limit, offset },
  });
}

export function findMembers(
  communityId: string,
  searchBox: SearchBox
): Promise<any> {
  return axios.get(`${BASE_URL}/memberviews/${communityId}`, {
    params: searchBox,
  });
}

export function findAllMemberByQuery(
  communityId: string,
  pageNum: number
): Promise<any> {
  return axios.get(
    `${BASE_URL}/memberviews?communityId=${communityId}&offset=${pageNum}&limit=8`
  );
}

export function findApprovedMember(
  communityId: string,
  pageNum: number
): Promise<any> {
  return axios.get(
    `${BASE_URL}/memberviews?communityId=${communityId}&offset=${pageNum}&limit=8&approved=false`
  );
}

export function searchMember(communityId: string, nickName: any): Promise<any> {
  return axios.get(
    `${BASE_URL}/memberviews?communityId=${communityId}&offset=0&limit=8&nickName=${nickName}`
  );
}

export function memberFollowAdd(memberId: string): Promise<any> {
  return axios.post(`${BASE_URL}/follow/flow/${memberId}`);
}

export function memberFollowDel(memberId: string): Promise<any> {
  return axios
    .delete(`${BASE_URL}/follow/flow/${memberId}/unfollow`)
    .then(res => res && res.data);
}

export function modifyMember(
  memberId: string,
  memberCdoModel: MemberCdo
): Promise<string> {
  return axios
    .put<string>(
      `${BASE_URL}/${memberCdoModel.communityId}/members/${memberId}`,
      memberCdoModel
    )
    .then(response => response && response.data);
}

export function modifyMembers(
  communityId: string,
  memberIdList: (string | undefined)[]
): Promise<string> {
  return axios
    .put<string>(
      `${BASE_URL}/communities/${communityId}/members/flow/${memberIdList.join(
        ','
      )}`
    )
    .then(response => response && response.data);
}

export function companionMembers(
  communityId: string,
  memberIdList: (string | undefined)[],
  remark: string
): Promise<string> {
  const params = { remark: `${remark}`, approvedType: 'Return' };
  return axios
    .put<string>(
      `${BASE_URL}/communities/${communityId}/members/flow/return/${memberIdList.join(
        ','
      )}`,
      params
    )
    .then(response => response && response.data);
}

export function findMember(communityId: string): Promise<Member> {
  const url = `${BASE_URL}/communities/${communityId}/members/findMember`;
  return axiosApi.get<Member>(url).then(response => response && response.data);
}

export function removeMembers(
  communityId: string,
  memberIdList: (string | undefined)[]
): Promise<any> {
  return axios.delete(
    `${BASE_URL}/communities/${communityId}/members/flow/${memberIdList.join(
      ','
    )}`
  );
}

export function registerMemberTempComplete(
  communityId: string,
  memberTempCdoList: MemberTempCdoModel[]
) {
  return axios
    .post<MemberTempModel[]>(
      `${BASE_URL}/communities/${communityId}/members/flow/registerMemberTempComplete`,
      memberTempCdoList
    )
    .then(response => (response && response.data) || null);
}
