import { axiosApi as axios } from '@nara.platform/accent';
import { SearchBox } from 'community/model/SearchBox';
import GroupMember from 'community/model/GroupMember';

const BASE_URL = '/api/community';

export function findAllGroupMemberByQuery(
  searchBox: SearchBox
): Promise<any> {
  return (
    axios
      .get(
        `${BASE_URL}/communities/${searchBox.communityId}/${searchBox.groupId}/members`,
        {
          params: searchBox,
        }
      )
  );
}

export function removeGroupMembers(
  communityId: string,
  groupId: string,
  groupMemberIdList: (string | undefined)[]
): Promise<any> {
  return axios.delete(
    `${BASE_URL}/communities/${communityId}/${groupId}/members/flow/${groupMemberIdList.join(
      ','
    )}`
  );
}

export function modifyGroupMemberAdmin(
  communityId: string,
  groupId: string,
  groupMemberId: string
): Promise<string> {
  return axios
    .put<string>(
      `${BASE_URL}/communities/${communityId}/${groupId}/members/flow/${groupMemberId}`
    )
    .then((response) => response && response.data);
}


export function registerGroupMembers(
  searchBox: SearchBox
): Promise<string> {
  return axios
    .post<string>(
      `${BASE_URL}/communities/${searchBox.communityId}/${searchBox.groupId}/members/flow/${searchBox.groupMemberIdList && searchBox.groupMemberIdList.join(
        ','
      )}`
    )
    .then((response) => response && response.data);
}

export function findGroupMemberAdmin(
  searchBox: SearchBox
): Promise<GroupMember | undefined> {
  return axios
    .get<GroupMember>(`${BASE_URL}/communities/${searchBox.communityId}/${searchBox.groupId}/members/admin`)
    .then((response) => response && response.data);
}