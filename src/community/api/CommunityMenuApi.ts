import { axiosApi as axios, axiosApi } from '@nara.platform/accent';
import MemberCdo from '../model/MemberCdo';
import Member from 'community/model/Member';
import { SearchBox } from 'community/model/SearchBox';

const BASE_URL = '/api/community';

export function findCommunityMenu(communityId: string): Promise<any> {
  return axios.get(`${BASE_URL}/${communityId}/menus`);
}

export function findCommunityMenuDetail(menuId: string): Promise<any> {
  return axios.get(`${BASE_URL}/post/menu/${menuId}`);
}

export function findMembers(
  communityId: string,
  // pageNum:number,
  // limit:number,
  searchBox: SearchBox
): Promise<any> {
  return (
    axios
      // .get(`${BASE_URL}/memberviews?communityId=${communityId}&offset=${pageNum}&limit=${limit}`)
      .get(`${BASE_URL}/memberviews/${communityId}`, {
        params: searchBox,
      })

    // http://university.sk.com/api/community/communities/COMMUNITY-1t/members
  );
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
    `${BASE_URL}/memberviews?communityId=${communityId}&offset=${pageNum}&limit=8&approved=WAITING`
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
