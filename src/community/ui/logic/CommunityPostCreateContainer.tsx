import { patronInfo } from '@nara.platform/dock';
import { useCommunityPostCreate } from 'community/service/useCommunityPostCreate/useCommunityPostCreate';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCommunityHome, useCommunityHome } from '../../store/CommunityHomeStore';
import CommunityPostCreateView from '../view/CommunityPostCreateView/CommunityPostCreateView';

interface Params {
  communityId: string;
  menuId?: string;
  postId?: string;
  menuType?: string;
}

function CommunityPostCreateContainer() {
  const { communityId, postId, menuId, menuType } = useParams<Params>();
  const communityHome = useCommunityHome();
  const [postCreateItem] = useCommunityPostCreate(postId);
  const [adminAuth, setAdminAuth] = useState<boolean>(false);
  const [communityAdminAuth, setCommunityAdminAuth] = useState<boolean>(false);

  useEffect(() => {
    if (postCreateItem === undefined || communityHome === undefined) {
      return;
    }
    const denizenId = patronInfo.getDenizenId();
    //managerId 가져와서 현재 로그인한 계정과 비교
    setAdminAuth(communityHome.community?.managerId! === denizenId);

    if (communityHome.community?.memberType === 'ADMIN') {
      setCommunityAdminAuth(communityHome.community?.memberType === 'ADMIN');
    }

  }, [postCreateItem, communityHome]);

  console.log(communityHome?.community?.memberType)
  return (
    <>
      {postCreateItem !== undefined && communityHome !== undefined && (
        <CommunityPostCreateView
          postItem={postCreateItem}
          communityId={communityId}
          menuId={menuId}
          postId={postId}
          menuType={menuType}
          menus={communityHome.menus}
          managerAuth={adminAuth}
          communityAdminAuth={communityAdminAuth}
        />
      )}
    </>
  );
}

export default CommunityPostCreateContainer;
