import { patronInfo } from '@nara.platform/dock';
import { useCommunityPostCreate } from 'community/service/useCommunityPostCreate/useCommunityPostCreate';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCommunityHome, useCommunityHome } from '../../store/CommunityHomeStore';
import CommunityPostCreateView from '../view/CommunityPostCreateView/CommunityPostCreateView';
import AdminMemberView from '../view/CommunityAdmin/AdminMemberView';
import { useCommunityMember } from 'community/store/CommunityMemberStore';
import { useSearchBox } from 'community/store/SearchBoxStore';
import AdminGroupCreateView from '../view/CommunityAdmin/AdminGroupCreateView';
import { useCommunityGroup } from 'community/store/CommunityGroupStore';
import { setAdminGroupCreateItem, getAdminGroupCreateItem, useAdminGroupCreateItem } from 'community/store/AdminGroupCreateStore';
import { getEmptyAdminGroupCreate } from 'community/viewModel/AdminGroupCreate';
import { useCommunityGroupMember } from 'community/store/CommunityGroupMemberStore';
import { getEmptyGroupDetailSearchBox } from 'community/model/SearchBox';

interface Params {
  communityId: string;
  groupId?: string;
}

function AdminGroupCreateContainer() {
  const { communityId, groupId} = useParams<Params>();
  const communityHome = useCommunityHome();
  const [adminAuth, setAdminAuth] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>('');
  const searchBox = useSearchBox();
  const adminGroupCreateItem = useAdminGroupCreateItem()||getEmptyAdminGroupCreate(communityId);
  const communityGroupMembers = useCommunityGroupMember();

  useEffect(() => {
    if (communityHome === undefined) {
      return;
    }
    const denizenId = patronInfo.getDenizenId();
    //managerId 가져와서 현재 로그인한 계정과 비교
    setAdminAuth(communityHome.community?.managerId! === denizenId);
    setAdminId(communityHome.community?.managerId!);
  }, [communityHome]);

  return (
    <>
      {searchBox !== undefined && adminGroupCreateItem !== undefined && (
        <AdminGroupCreateView 
          communityId={communityId} 
          managerAuth={adminAuth}
          managerId={adminId}
          searchBox={searchBox}
          adminGroupCreateItem={adminGroupCreateItem}
          groupId={groupId}
          communityGroupMembers={communityGroupMembers}
        />
      )}
    </>
  );
}

export default AdminGroupCreateContainer;
