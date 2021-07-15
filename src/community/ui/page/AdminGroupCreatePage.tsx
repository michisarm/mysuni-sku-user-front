import React, { useEffect } from 'react';
import AdminMemberRegisterContainer from '../logic/AdminMemberRegisterContainer';
import { getMembers } from 'community/service/useMemberList/useMemberList';
import {
  useSearchBox,
  getSearchBox,
  setSearchBox,
} from 'community/store/SearchBoxStore';
import {
  getEmptySearchBox,
  getEmptyGroupDetailSearchBox,
} from 'community/model/SearchBox';
import AdminGroupContainer from '../logic/AdminGroupContainer';
import {
  getAdminGroups,
  getAdminGroup,
} from 'community/service/useGroupList/useGroupList';
import AdminGroupCreateContainer from '../logic/AdminGroupCreateContainer';
import { useParams } from 'react-router-dom';
import { getAllGroupMemberByQuery } from 'community/service/useGroupMemberList/useGroupMember';
import { setCommunityGroupMember } from 'community/store/CommunityGroupMemberStore';
import { setAdminGroupCreateItem } from 'community/store/AdminGroupCreateStore';

interface Params {
  groupId: string;
}

function AdminGroupCreatePage(communityId: string) {
  const { groupId } = useParams<Params>();
  if (groupId === undefined || groupId === '') {
    window.location.href = `/suni-community/admin/${communityId}/memberManagement/group/create`;
  } else {
    window.location.href = `/suni-community/admin/${communityId}/memberManagement/group/${groupId}`;
  }
  useEffect(() => {
    setSearchBox(getEmptyGroupDetailSearchBox(communityId, groupId));
    if (groupId && groupId !== '') {
      getAdminGroup();
      getAllGroupMemberByQuery();
    } else {
      setAdminGroupCreateItem();
    }
  }, [communityId, groupId]);

  return <AdminGroupCreateContainer />;
}

export default AdminGroupCreatePage;
