import { axiosApi as axios } from '@nara.platform/accent';
import GroupCdoModel from '../model/GroupCdoModel';
import { number } from '@storybook/addon-knobs';


const BASE_URL = '/api/community';
const BASE_URL_T = '/api/community/communities';

export function findAllGroupByQuery(communityId:string, pageNum:number): Promise<any> {
  return axios
  .get(`${BASE_URL}/groupviews?communityId=${communityId}&offset=${pageNum}&limit=20`)
}

export function findGroupMember(communityId:string, groupId:string, page:number): Promise<any> {
  return axios
  .get(`${BASE_URL}/groupviews/memberList?communityId=${communityId}&groupId=${groupId}&offset=${page}&limit=8`)
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

export function removeGroup(
  communityId: string,
  groupId: string
): Promise<any> {
  return axios.delete(`${BASE_URL}/${communityId}/groups/${groupId}`);
}
