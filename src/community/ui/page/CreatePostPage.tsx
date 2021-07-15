import React from 'react';
import { useParams } from 'react-router-dom';
import CommunityPostCreateContainer from '../logic/CommunityPostCreateContainer';

interface Params {
  communityId: string;
  menuId?: string;
  postId?: string;
  menuType?: string;
}
function CreatePostPage() {
  const { communityId, postId, menuId, menuType } = useParams<Params>();
  if (menuId === 'noticeCreate') {
    window.location.href = `/suni-community/community/${communityId}/notice/create`;
  } else {
    window.location.href = `/suni-community/community/${communityId}/board/${menuId}/create`;
  }
  return <CommunityPostCreateContainer />;
}

export default CreatePostPage;
