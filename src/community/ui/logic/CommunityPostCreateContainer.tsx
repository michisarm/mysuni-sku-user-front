import { useCommunityPostCreate } from 'community/service/useCommunityPostCreate/useCommunityPostCreate';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useCommunityHome } from '../../store/CommunityHomeStore';
import CommunityPostCreateView from '../view/CommunityPostCreateView/CommunityPostCreateView';

interface Params {
  communityId: string;
  menuId?: string;
  postId?: string;
}

function CommunityPostCreateContainer() {
  const { communityId, postId, menuId } = useParams<Params>();
  const communityHome = useCommunityHome();
  const [postCreateItem] = useCommunityPostCreate(communityId, postId);
  return (
    <>
      {postCreateItem !== undefined && communityHome !== undefined && (
        <CommunityPostCreateView
          postItem={postCreateItem}
          communityId={communityId}
          menuId={menuId}
          postId={postId}
          menus={communityHome.menus}
        />
      )}
    </>
  );
}

export default CommunityPostCreateContainer;
