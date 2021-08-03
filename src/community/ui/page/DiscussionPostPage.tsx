import React from 'react';
import { useParams } from 'react-router-dom';
import CommunityDiscussionContainer from '../logic/CommunityDiscussionContainer';

interface Params {
  communityId: string;
  menuId?: string;
  postId?: string;
  menuType?: string;
}
function DiscussionPostPage() {
  const { communityId, postId, menuId, menuType } = useParams<Params>();
  window.location.href = `/suni-community/community/${communityId}/post/${postId}`;
  return <CommunityDiscussionContainer />;
}

export default DiscussionPostPage;
