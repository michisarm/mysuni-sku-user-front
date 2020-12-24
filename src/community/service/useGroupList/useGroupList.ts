import { findAllGroupByQuery,findGroupMember, searchGroup, findAdminGroups, registerGroup, modifyGroup, findAdminGroup, removeGroup } from 'community/api/GroupApi';
import { setCommunityGroup } from 'community/store/CommunityGroupStore';
import { setCommunityGroupMember } from 'community/store/CommunityGroupMemberStore';
import { memberFollowAdd, memberFollowDel } from 'community/api/MemberApi';
import { getSearchBox } from 'community/store/SearchBoxStore';
import { getEmptySearchBox, SearchBox } from 'community/model/SearchBox';
import { getAdminGroupCreateItem, useAdminGroupCreateItem, setAdminGroupCreateItem } from 'community/store/AdminGroupCreateStore';

export function getGroup(communityId:string, pageNum:number) {
  findAllGroupByQuery(communityId, pageNum).then(res => setCommunityGroup(res.data))
}

export function getGroupMember(communityId:string, groupId:string, page:number) {
  findGroupMember(communityId, groupId, page).then(res => setCommunityGroupMember(res.data))
}

export function getGroupMemberData(communityId:string, groupId:string, page:number) {
  return findGroupMember(communityId, groupId, page).then(response => {
    return response && response.data
  });
}

export function onSearchGroup(communityId:string, searchTerm:string) {
  searchGroup(communityId, searchTerm).then(res => setCommunityGroup(res.data))
}

export function getAdminGroups(communityId:string) {
  findAdminGroups(communityId,getSearchBox()||getEmptySearchBox()).then(res => setCommunityGroup(res.data))
}

export function getAdminGroup() {
  findAdminGroup(getSearchBox()||getEmptySearchBox()).then(res => setAdminGroupCreateItem(res.data))
}

export function onFollowGroupMember(
  communityId: string,
  groupId:string,
  memberId:string,
  page: number,
) {
  //
  return memberFollowAdd(memberId).then(res => {
    return getGroupMemberData(communityId, groupId, page)
  })
}

export function onUnFollowGroupMember(
  communityId: string,
  groupId:string,
  memberId:string,
  page: number,
  ) {
  return memberFollowDel(memberId).then(res => { 
    return getGroupMemberData(communityId, groupId, page)
  })
}

export function addGroup() {
  const adminGroupCreate = getAdminGroupCreateItem();
  if (adminGroupCreate) registerGroup(adminGroupCreate);
  
}

export function updateGroup() {
  const adminGroupCreate = getAdminGroupCreateItem();
  if (adminGroupCreate) modifyGroup(adminGroupCreate);
}

export function deleteGroup() {
  const adminGroupCreate = getAdminGroupCreateItem();
  if (adminGroupCreate) removeGroup(adminGroupCreate);
}

