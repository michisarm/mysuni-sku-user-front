import { findAllMemberByQuery, findApprovedMember, memberFollowAdd, modifyMembers, searchMember, memberFollowDel } from 'community/api/MemberApi';
import { setCommunityMemberApprove } from 'community/store/CommunityMemberApproveStore';
import { setFollowMember } from 'community/store/CommunityMemberFollowStore';
import { setCommunityMember } from 'community/store/CommunityMemberStore';

export function getAllMember(communityId:string, page:number = 0) {
  findAllMemberByQuery(communityId , page)
  .then(response => response && setCommunityMember(response.data));
}

export function getApproveMember(communityId: string) {
  findApprovedMember(communityId)
  .then(response => response && setCommunityMemberApprove(response.data));
}

export function updateMembers  (
  communityId: string,
  memberIdList: (string | undefined)[]
  ) {
    modifyMembers(communityId, memberIdList).then((response) => {
      //  searchQuery();
  });
}

export function getSearchMember(
  communityId:string, nickName:any
  ) {
  searchMember(communityId, nickName).then(res => res && setCommunityMember(res.data))
}

export function onFollow(
  memberId:string
) {
  memberFollowAdd(memberId).then(res => {getAllMember('COMMUNITY-f',0)})
}

export function onUnFollow(
  memberId:string
  ) {
  memberFollowDel(memberId).then(res => {getAllMember('COMMUNITY-f',0)})
}