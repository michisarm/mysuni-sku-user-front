import { patronInfo } from '@nara.platform/dock';
import { useCommunityPostCreate } from 'community/service/useCommunityPostCreate/useCommunityPostCreate';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCommunityHome, useCommunityHome } from '../../store/CommunityHomeStore';
import CommunityPostCreateView from '../view/CommunityPostCreateView/CommunityPostCreateView';
import AdminMemberView from '../view/CommunityAdmin/AdminMemberView';
import { useCommunityMember } from 'community/store/CommunityMemberStore';

interface Params {
  communityId: string;
}

function AdminMemberContainer() {
  const { communityId} = useParams<Params>();
  const communityHome = useCommunityHome();
  const communityMembers = useCommunityMember();
  const [adminAuth, setAdminAuth] = useState<boolean>(false);

  useEffect(() => {
    if (communityHome === undefined) {
      return;
    }
    const denizenId = patronInfo.getDenizenId();
    //managerId 가져와서 현재 로그인한 계정과 비교
    setAdminAuth(communityHome.community?.managerId! === denizenId);
  }, [communityHome]);

  return (
    <>
      {communityMembers !== undefined && (
        <AdminMemberView 
          communityId={communityId} 
          managerAuth={adminAuth}
          communityMembers={communityMembers}
        />
      )}
    </>
  );
}

export default AdminMemberContainer;
