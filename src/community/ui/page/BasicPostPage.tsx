import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { requestProfileBookmarks } from '../../service/useCommunityProfile/utility/requestProfileBookmarks';
import CommunityPostDetailContainer from '../logic/CommunityPostDetailContainer';
interface Params {
  communityId: string;
  postId: string;
  menuType?: string;
}

function BasicPostPage() {
  const { communityId, postId, menuType } = useParams<Params>();
  window.location.href = `/suni-community/community/${communityId}/post/${postId}`;
  useEffect(() => {
    requestProfileBookmarks();
  }, []);

  return <CommunityPostDetailContainer />;
}

export default BasicPostPage;
