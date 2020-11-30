import { findAllGroupByQuery,findGroupMember } from 'community/api/GroupApi';
import { setCommunityGroup } from 'community/store/CommunityGroupStore';
import { setCommunityGroupMember } from 'community/store/CommunityGroupMemberStore';

export function getGroup(communityId:string, pageNum:number) {
  findAllGroupByQuery(communityId, pageNum).then(res => setCommunityGroup(res.data))
}

export function getGroupMember(communityId:string, groupId:string, page:number) {
  findGroupMember(communityId, groupId, page).then(res => setCommunityGroupMember(res.data))
}