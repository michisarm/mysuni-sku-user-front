import { patronInfo } from '@nara.platform/dock';
import { useCommunityPostCreate } from 'community/service/useCommunityPostCreate/useCommunityPostCreate';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCommunityHome, useCommunityHome } from '../../store/CommunityHomeStore';
import CommunityPostCreateView from '../view/CommunityPostCreateView/CommunityPostCreateView';
import AdminMemberView from '../view/CommunityAdmin/AdminMemberView';
import { useCommunityMember } from 'community/store/CommunityMemberStore';
import { useSearchBox } from 'community/store/SearchBoxStore';
import AdminMemberRegisterView from '../view/CommunityAdmin/AdminMemberRegisterView';

interface Params {
  communityId: string;
}

function AdminMemberRegisterContainer() {
  const { communityId} = useParams<Params>();
  const communityHome = useCommunityHome();
  const [adminAuth, setAdminAuth] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>('');

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
      <AdminMemberRegisterView 
        communityId={communityId} 
        managerAuth={adminAuth}
        managerId={adminId}
      />
    </>
  );
}

export default AdminMemberRegisterContainer;
