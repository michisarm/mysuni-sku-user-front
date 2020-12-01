import { findAllMemberByQuery, findApprovedMember, memberFollowAdd, modifyMembers, searchMember, memberFollowDel } from 'community/api/MemberApi';
import { setCommunityMemberApprove } from 'community/store/CommunityMemberApproveStore';
import { setFollowMember } from 'community/store/CommunityMemberFollowStore';
import { setCommunityMember } from 'community/store/CommunityMemberStore';

export function getAllMember(communityId:string, pageNumer:number = 0) {
  findAllMemberByQuery(communityId , pageNumer)
  .then(response => response && setCommunityMember(response.data));
}

export function getApproveMember(communityId: string, pageNum:number = 0) {
  findApprovedMember(communityId, pageNum)
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
  communityId: string,
  memberId:string,
  pageNum: number
) {
  //
  memberFollowAdd(memberId).then(res => {getAllMember(communityId, pageNum)})
}

export function onUnFollow(
  communityId: string,
  memberId:string,
  pageNum: number
  ) {
  memberFollowDel(memberId).then(res => {getAllMember(communityId, pageNum)})
}