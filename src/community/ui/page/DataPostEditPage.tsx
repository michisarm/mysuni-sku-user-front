import React from 'react';
import { useParams } from 'react-router-dom';
import CommunityPostCreateContainer from '../logic/CommunityPostCreateContainer';

interface Params {
  communityId: string;
  menuId?: string;
  postId?: string;
  menuType?: string;
}
function DataPostEditPage() {
  const { communityId, postId, menuId, menuType } = useParams<Params>();
  window.location.href = `/suni-community/community/${communityId}/post/${postId}/edit`;
  return (
    <>
      <CommunityPostCreateContainer />
    </>
  );
}

export default DataPostEditPage;
