import { getFollowCommunityIntro } from 'community/store/CommunityMainStore';
import React, { useEffect } from 'react';
import {
  requestFollowCommunityList,
  requestFollowCommunityPostList,
} from '../../service/useFollowCommunityIntro/utility/requestFollowCommunityIntro';
import FollowView from '../view/FollowView';

function FollowPage() {
  window.location.href = '/suni-community/main/follow-feed';
  useEffect(() => {
    requestFollowCommunityList();
    getFollowCommunityIntro()?.posts.length! === 0 &&
      requestFollowCommunityPostList();
  }, []);
  return <FollowView />;
}

export default FollowPage;
