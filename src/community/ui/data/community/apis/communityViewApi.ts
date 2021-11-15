import { getAxios } from '../../../../packages/api/getAxios';
import { AxiosReturn } from '../../../../packages/api/AxiosReturn';
import { createCacheApi } from '../../../../packages/api/cacheableApi';
import { CommunityView } from '../models/CommunityView';
import { CommunityMenu } from '../models/CommunityMenu';
import { OffsetElementList } from '../../accent/models/OffsetElementList';
import { MemberTempCdoModel } from '../models/MemberTempCdoModel';
import { MemberTempModel } from '../models/MemberTempModel';
import { Group } from '../models/Group';
import { AdminGroupCreate } from '../models/AdminGroupCreate';
import { GroupMember } from '../models/GroupMember';
import { GroupMemberSearchBox } from '../models/GroupMemberSearchBox';
import { GroupDetail } from '../models/GroupDetail';
import { CommunityGroupMemberIds } from '../models/CommunityGroupMember';
import { CommunityGroupMemberList } from '../models/CommunityGroupMember';
import { BookMarkCommunity } from '../models/BookMarkCommunity';
import { CommunityCount } from '../models/CommunityCount';
import { CommunityCountByField } from '../models/CommunityCountByField';

const BASE_URL = '/api/community';

export function findCommunityView(
  communityId: string
): Promise<CommunityView | undefined> {
  const axios = getAxios();

  const url = `${BASE_URL}/communities/communityView/${communityId}`;

  return axios
    .get<CommunityView>(url)
    .then(AxiosReturn)
    .catch(() => undefined);
}

export const [findCommunityViewCache, clearfindCommunityViewCache] =
  createCacheApi(findCommunityView);

export function findMyMenus(
  communityId: string
): Promise<CommunityMenu[] | undefined> {
  const axios = getAxios();

  const url = `${BASE_URL}/${communityId}/menus/my`;

  return axios.get<CommunityMenu[]>(url).then(AxiosReturn);
}

export function findAllMyOpenCommunities(
  sort: string
): Promise<OffsetElementList<CommunityView> | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/communities/communityView/open/my?sort=${sort}`;
  return axios.get<OffsetElementList<CommunityView>>(url).then(AxiosReturn);
}

// 가입 승인 api
export function modifyMembers(
  communityId: string,
  memberIdList: string[]
): Promise<void> {
  const axios = getAxios();
  return axios
    .put<void>(
      `${BASE_URL}/communities/${communityId}/members/flow/${memberIdList.join()}`
    )
    .then(AxiosReturn);
}

// 가입 반려 api
export function companionMembers(
  communityId: string,
  memberIdList: string[],
  reseaon: string
): Promise<void> {
  const axios = getAxios();

  return axios
    .put<void>(
      `${BASE_URL}/communities/${communityId}/members/flow/reject/${memberIdList.join()}`,
      { remark: reseaon }
    )
    .then(AxiosReturn);
}

export function modifyMemberType(
  communityId: string,
  memberIdList: (string | undefined)[],
  memberType: string
): Promise<string | undefined> {
  const axios = getAxios();

  return axios
    .put<string>(
      `${BASE_URL}/communities/${communityId}/members/memberType/${memberIdList.join()}?memberType=${memberType}`
    )
    .then(AxiosReturn);
}

export function removeMembers(
  communityId: string,
  memberIdList: (string | undefined)[]
): Promise<any | undefined> {
  const axios = getAxios();

  return axios.delete(
    `${BASE_URL}/communities/${communityId}/members/flow/${memberIdList.join()}`
  );
}

export function findAllOpenCommunities(openCommunityRdo: {
  sort: string;
  offset: number;
  bookMarked?: boolean;
  fieldId?: string;
}): Promise<OffsetElementList<CommunityView> | undefined> {
  const axios = getAxios();
  const { sort, offset, bookMarked, fieldId } = openCommunityRdo;

  const url = `${BASE_URL}/communities/communityView/open?${
    fieldId === undefined ? '' : `field=${fieldId}`
  }&sort=${sort}&offset=${offset}&limit=12&bookmarked=${bookMarked || false}`;
  return axios.get<OffsetElementList<CommunityView>>(url).then(AxiosReturn);
}

export function registerMemberTempComplete(
  communityId: string,
  memberTempCdoList: MemberTempCdoModel[]
): Promise<MemberTempModel[] | undefined> {
  const axios = getAxios();

  return axios
    .post<MemberTempModel[]>(
      `${BASE_URL}/communities/${communityId}/members/flow/registerMemberTempComplete`,
      memberTempCdoList
    )
    .then(AxiosReturn);
}

export function existsByCommunityIdAndName(
  communityId: string,
  name: string
): Promise<boolean | undefined> {
  const axios = getAxios();
  return axios
    .get<boolean>(
      `${BASE_URL}/communities/${communityId}/groups/existsByCommunityIdAndName?communityId=${communityId}&name=${name}`
    )
    .then(AxiosReturn);
}

export function findAdminGroups(
  communityId: string,
  searchBox?: any
): Promise<OffsetElementList<Group>> {
  const axios = getAxios();

  return axios
    .get(`${BASE_URL}/communities/${communityId}/groups`, {
      params: searchBox,
    })
    .then(AxiosReturn);
}

export function findAdminGroup(
  communityId: string,
  groupId: string
): Promise<Group> {
  const axios = getAxios();

  return axios
    .get(`${BASE_URL}/communities/${communityId}/groups/${groupId}`)
    .then(AxiosReturn);
}

export function findGroupMemberAdmin(
  communityId: string,
  groupId: string
): Promise<GroupMember | undefined> {
  const axios = getAxios();
  return axios
    .get<GroupMember>(
      `${BASE_URL}/communities/${communityId}/${groupId}/members/admin`
    )
    .then(AxiosReturn);
}

export function registerGroup(
  communityId: string,
  adminGroupCreate: AdminGroupCreate
): Promise<void | undefined> {
  const axios = getAxios();
  return axios
    .post<void>(
      `${BASE_URL}/communities/${communityId}/groups`,
      adminGroupCreate
    )
    .then(AxiosReturn);
}

export function findAllGroupMember(
  communityId: string,
  groupId: string,
  searchBox: GroupMemberSearchBox
): Promise<OffsetElementList<GroupMember>> {
  const axios = getAxios();
  return axios
    .get(`${BASE_URL}/communities/${communityId}/${groupId}/members`, {
      params: searchBox,
    })
    .then(AxiosReturn);
}

export function modifyGroup(
  communityId: string,
  groupId: string,
  adminGroupCreate: AdminGroupCreate
): Promise<void> {
  const axios = getAxios();
  return axios
    .put<void>(
      `${BASE_URL}/communities/${communityId}/groups/${groupId}`,
      adminGroupCreate
    )
    .then(AxiosReturn);
}

export function removeGroup(
  communityId: string,
  groupId: string
): Promise<void> {
  const axios = getAxios();
  return axios
    .delete(`${BASE_URL}/communities/${communityId}/groups/${groupId}`)
    .then(AxiosReturn);
}

export function findAllGroupByQuery(
  communityId: string,
  pageNum: number
): Promise<OffsetElementList<GroupDetail>> {
  const axios = getAxios();

  return axios
    .get(
      `${BASE_URL}/groupviews?communityId=${communityId}&offset=${pageNum}&limit=20`
    )
    .then(AxiosReturn);
}

export function findGroupMember(
  communityId: string,
  groupId: string,
  pageNum: number
): Promise<CommunityGroupMemberList> {
  const axios = getAxios();

  return axios
    .get(
      `${BASE_URL}/groupviews/memberList?communityId=${communityId}&groupId=${groupId}&offset=${pageNum}&limit=10`
    )
    .then(AxiosReturn);
}

export function modifyGroupMemberAdmin(
  communityId: string,
  groupId: string,
  groupMemberId: string
): Promise<void> {
  const axios = getAxios();

  return axios
    .put<void>(
      `${BASE_URL}/communities/${communityId}/${groupId}/members/flow/${groupMemberId}`
    )
    .then(AxiosReturn);
}

export function registerGroupMembers(
  communityId: string,
  groupId: string,
  memberIdList: CommunityGroupMemberIds
): Promise<void> {
  const axios = getAxios();

  return axios
    .post<void>(
      `${BASE_URL}/communities/${communityId}/${groupId}/members/flow`,
      memberIdList
    )
    .then(AxiosReturn);
}

export function removeGroupMembers(
  communityId: string,
  groupId: string,
  groupMemberIdList: string[]
): Promise<void> {
  const axios = getAxios();
  return axios
    .delete(
      `${BASE_URL}/communities/${communityId}/${groupId}/members/flow/${groupMemberIdList.join()}`
    )
    .then(AxiosReturn);
}

export function deleteMember(
  communityId: string,
  memberId: string
): Promise<string | undefined> {
  const axios = getAxios();

  return axios
    .put(`${BASE_URL}/communities/${communityId}/members/flow/draw/${memberId}`)
    .then((res) => res && 'success');
}

export function deleteCommunityPost(
  communityId: string,
  postId: string
): Promise<any | undefined> {
  const axios = getAxios();

  return axios.delete(`${BASE_URL}/communities/${communityId}/posts/${postId}`);
}

// 가입된 커뮤니티 리스트 : 멤버아이디로 조회
export function findAllOtherCommunities(
  memberId: string,
  sort: string,
  offset: number
): Promise<OffsetElementList<CommunityView> | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/communities/communityView/other/${memberId}?sort=${sort}&offset=${offset}&limit=0`;

  return axios.get<OffsetElementList<CommunityView>>(url).then(AxiosReturn);
}

export function findBookMarkCommunity(
  limit: number,
  offset: number,
  sort: string
): Promise<OffsetElementList<BookMarkCommunity> | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/communities/communityView/my-bookmarks?limit=${limit}&offset=${offset}&sort=${sort}`;

  return axios.get<OffsetElementList<BookMarkCommunity>>(url).then(AxiosReturn);
}

export function findManagedCommunity(
  limit: number,
  offset: number,
  sort: string
): Promise<OffsetElementList<BookMarkCommunity> | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/communities/communityView/my-managed?limit=${limit}&offset=${offset}&sort=${sort}`;

  return axios.get<OffsetElementList<BookMarkCommunity>>(url).then(AxiosReturn);
}

export function findCommunityCount(): Promise<CommunityCount | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/communities/communityView/count`;

  return axios.get<CommunityCount>(url).then(AxiosReturn);
}

export function findCommunityCountByField(): Promise<
  CommunityCountByField[] | undefined
> {
  const axios = getAxios();
  const url = `${BASE_URL}/communities/communityView/countByField`;

  return axios.get<CommunityCountByField[]>(url).then(AxiosReturn);
}
