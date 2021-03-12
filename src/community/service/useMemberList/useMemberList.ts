import {
  findAllMemberByQuery,
  findApprovedMember,
  memberFollowAdd,
  modifyMembers,
  companionMembers,
  searchMember,
  memberFollowDel,
  findMembers,
  removeMembers,
  registerMemberTempComplete,
} from 'community/api/MemberApi';
import { setCommunityMemberApprove } from 'community/store/CommunityMemberApproveStore';
import { setCommunityMember } from 'community/store/CommunityMemberStore';
import { getSearchBox } from 'community/store/SearchBoxStore';
import { getEmptySearchBox } from 'community/model/SearchBox';
import { MemberTempCdoModel } from 'community/model/MemberTempCdoModel';
import { MemberTempModel } from 'community/model/MemberTempModel';

export function getMembers(communityId: string) {
  findMembers(communityId, getSearchBox() || getEmptySearchBox()).then(
    response => response && setCommunityMember(response.data)
  );
}

export function getAllMember(communityId: string, offset: number = 0) {
  findAllMemberByQuery(communityId, offset).then(
    response => response && setCommunityMember(response.data)
  );
}

export function getApproveMember(communityId: string, offset: number = 0) {
  findApprovedMember(communityId, offset).then(
    response => response && setCommunityMemberApprove(response.data)
  );
}

export function updateMembers(
  communityId: string,
  memberIdList: (string | undefined)[]
) {
  modifyMembers(communityId, memberIdList).then(response => {
    getMembers(communityId);
    //  searchQuery();
  });
}
export function rejectMembers(
  communityId: string,
  memberIdList: (string | undefined)[],
  remark: string
) {
  companionMembers(communityId, memberIdList, remark).then(response => {
    getMembers(communityId);
    //  searchQuery();
  });
}
export function deleteMembers(
  communityId: string,
  memberIdList: (string | undefined)[]
) {
  removeMembers(communityId, memberIdList).then(response => {
    getMembers(communityId);
    //  searchQuery();
  });
}

export function getSearchMember(communityId: string, nickName: any) {
  searchMember(communityId, nickName).then(
    res => res && setCommunityMember(res.data)
  );
}

export function onFollow(
  communityId: string,
  memberId: string,
  pageNum: number
) {
  //
  memberFollowAdd(memberId).then(res => {
    getAllMember(communityId, pageNum);
  });
}

export function onUnFollow(
  communityId: string,
  memberId: string,
  pageNum: number
) {
  memberFollowDel(memberId).then(res => {
    getAllMember(communityId, pageNum);
  });
}

export function registerMembersTempComplete(
  communityId: string,
  memberTempCboList: MemberTempCdoModel[]
): Promise<MemberTempModel[]> {
  //
  const memberTempProcList = registerMemberTempComplete(
    communityId,
    memberTempCboList
  );
  return memberTempProcList;
}
