import React, { useEffect } from 'react';
import AdminMemberContainer from '../logic/AdminMemberContainer';
import { getMembers } from 'community/service/useMemberList/useMemberList';
import {
  useSearchBox,
  getSearchBox,
  setSearchBox,
} from 'community/store/SearchBoxStore';
import { getEmptySearchBox } from 'community/model/SearchBox';
import { CommunityMemberApprovedType } from '../../model/CommunityMember';

function AdminMemberPage(
  community: string,
  approveMember: CommunityMemberApprovedType,
  groupId: string
) {
  if (approveMember === 'APPROVED') {
    window.location.href = `/suni-community/admin/${community}/memberManagement/member`;
  } else if (approveMember === 'WAITING') {
    window.location.href = `/suni-community/admin/${community}/memberManagement/memberJoin`;
  }

  useEffect(() => {
    setSearchBox(getEmptySearchBox(approveMember, groupId));
    getMembers(community);
  }, [community, approveMember, groupId]);

  return <AdminMemberContainer />;
}

export default AdminMemberPage;
