import { patronInfo } from '@nara.platform/dock';
import { useCommunityPostCreate } from 'community/service/useCommunityPostCreate/useCommunityPostCreate';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getCommunityHome,
  useCommunityHome,
} from '../../store/CommunityHomeStore';
import CommunityPostCreateView from '../view/CommunityPostCreateView/CommunityPostCreateView';
import AdminMemberView from '../view/CommunityAdmin/AdminMemberView';
import { useCommunityMember } from 'community/store/CommunityMemberStore';
import { useSearchBox, setSearchBox } from 'community/store/SearchBoxStore';

interface Params {
  communityId: string;
}

function AdminMemberContainer() {
  const { communityId } = useParams<Params>();
  const communityHome = useCommunityHome();
  const communityMembers = useCommunityMember();
  const [adminAuth, setAdminAuth] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>('');
  const [createTime, setCreateTime] = useState<number>(0);
  const searchBox = useSearchBox();

  useEffect(() => {
    if (communityHome === undefined) {
      return;
    }
    const denizenId = patronInfo.getDenizenId();
    //managerId 가져와서 현재 로그인한 계정과 비교
    setAdminAuth(communityHome.community?.managerId! === denizenId);
    setAdminId(communityHome.community?.managerId!);
    setCreateTime(communityHome.community?.createdTime!);
    setSearchBox({
      ...searchBox,
      startDate: communityHome.community?.createdTime!,
    });

  }, [communityHome]);

  return (
    <>
      {communityMembers !== undefined && searchBox !== undefined && createTime !== 0 && (
        <AdminMemberView
          communityId={communityId}
          managerAuth={adminAuth}
          managerId={adminId}
          communityMembers={communityMembers}
          searchBox={searchBox}
        />
      )}
    </>
  );
}

export default AdminMemberContainer;
