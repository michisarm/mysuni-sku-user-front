import { findAllGroupByQuery,findGroupMember } from 'community/api/GroupApi';
import { setCommunityGroup } from 'community/store/CommunityGroupStore';
import { setCommunityGroupMember } from 'community/store/CommunityGroupMemberStore';
import { memberFollowAdd, memberFollowDel } from 'community/api/MemberApi';

export function getGroup(communityId:string, pageNum:number) {
  findAllGroupByQuery(communityId, pageNum).then(res => setCommunityGroup(res.data))
}

export function getGroupMember(communityId:string, groupId:string, page:number) {
  findGroupMember(communityId, groupId, page).then(res => setCommunityGroupMember(res.data))
}

export function getGroupMemberData(communityId:string, groupId:string, page:number) {
  return findGroupMember(communityId, groupId, page).then(response => response && response.data);
}


export function onFollowGroupMember(
  communityId: string,
  groupId:string,
  memberId:string,
  pageNum: number,
) {
  //
  memberFollowAdd(memberId).then(res => {getGroupMemberData(communityId, groupId, pageNum)})
}

export function onUnFollowGroupMember(
  communityId: string,
  groupId:string,
  memberId:string,
  pageNum: number,
  ) {
  memberFollowDel(memberId).then(res => {getGroupMemberData(communityId, groupId, pageNum)})
}