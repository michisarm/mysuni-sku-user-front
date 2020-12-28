import { axiosApi as axios } from '@nara.platform/accent';
import GroupCdoModel from '../model/GroupCdoModel';
import { number } from '@storybook/addon-knobs';
import { SearchBox } from 'community/model/SearchBox';
import AdminGroupCreate from 'community/viewModel/AdminGroupCreate';


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

export function searchGroup(
  communityId: string,
  searchTerm: string
):Promise<any> {

  return axios
  .get(`${BASE_URL_T}/${communityId}/groups?name=${searchTerm}&offset=0&limit=20&searchFilter=&communityId=${communityId}`)
}

export function findAdminGroups(
  communityId: string,
  searchBox : SearchBox
):Promise<any> {
  return axios
  .get(`${BASE_URL_T}/${communityId}/groups`, {
    params: searchBox,
  })
}

export function findAdminGroup(
  searchBox : SearchBox
):Promise<any> {
  return axios
  .get(`${BASE_URL_T}/${searchBox.communityId}/groups/${searchBox.groupId}`, {
    params: searchBox,
  })
}

export function registerGroup(adminGroupCreate: AdminGroupCreate): Promise<string> {
  return axios
    .post<string>(
      `${BASE_URL}/communities/${adminGroupCreate.communityId}/groups`,
      adminGroupCreate
    )
    .then((response) => response && response.data);
}

export function modifyGroup(
  adminGroupCreate: AdminGroupCreate
): Promise<string> {
  return axios
    .put<string>(
      `${BASE_URL}/communities/${adminGroupCreate.communityId}/groups/${adminGroupCreate.groupId}`,
      adminGroupCreate
    )
    .then((response) => response && response.data);
}

export function removeGroup(
  adminGroupCreate: AdminGroupCreate
): Promise<any> {
  return axios.delete(`${BASE_URL}/communities/${adminGroupCreate.communityId}/groups/${adminGroupCreate.groupId}`);
}

export function existsByCommunityIdAndName(communityId: string, name: string): Promise<boolean> {
  return axios
    .get<boolean>(`${BASE_URL}/communities/${communityId}/groups/existsByCommunityIdAndName?communityId=${communityId}&name=${name}`)
    .then((response) => response && response.data);
}