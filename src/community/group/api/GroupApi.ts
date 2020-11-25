import { axiosApi as axios } from '@nara.platform/accent';
import Group from '../model/Group';
import GroupCdoModel from '../model/GroupCdoModel';
import GroupRdo from '../model/GroupRdo';

const BASE_URL = '/api/community/communities';

export function findCommunities(limit: number, offset: number): Promise<any> {
  return axios.get<Group[]>(`${BASE_URL}`, {
    params: { limit, offset },
  });
}

export function findAllGroupByQuery(groupRdo: GroupRdo): Promise<any> {
  return (
    axios
    
      //.get<Group[]>(`${BASE_URL}` + `/searchKey`, {
      .get<Group[]>(`${BASE_URL}/${groupRdo.communityId}/groups?name=&offset=0&limit=20&searchFilter=&communityId=${groupRdo.communityId}`, {
        params: groupRdo,
      })
  );
}

export function findGroup(
  communityId: string,
  groupId: string
): Promise<GroupCdoModel | undefined> {
  return axios
    .get<GroupCdoModel>(`${BASE_URL}/${communityId}/groups/${groupId}`)
    .then((response) => response && response.data);
}
export function registerGroup(groupCdoModel: GroupCdoModel): Promise<string> {
  return axios
    .post<string>(
      `${BASE_URL}/${groupCdoModel.communityId}/groups`,
      groupCdoModel
    )
    .then((response) => response && response.data);
}
export function modifyGroup(
  groupId: string,
  groupCdoModel: GroupCdoModel
): Promise<string> {
  return axios
    .put<string>(
      `${BASE_URL}/${groupCdoModel.communityId}/groups/${groupId}`,
      groupCdoModel
    )
    .then((response) => response && response.data);
}

// export function findGroupByName(
//   groupName: string
// ): Promise<GroupCdoModel | undefined> {
//   return axios
//     .get<GroupCdoModel>(`${BASE_URL}/checkByName/${groupName}`)
//     .then((response) => response && response.data);
// }

export function removeGroup(
  communityId: string,
  groupId: string
): Promise<any> {
  return axios.delete(`${BASE_URL}/${communityId}/groups/${groupId}`);
}
