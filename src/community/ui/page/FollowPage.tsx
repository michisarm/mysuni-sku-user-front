import React, { useEffect } from 'react';
import {
  requestFollowCommunityList,
  requestFollowCommunityPostList,
} from '../../service/useFollowCommunityIntro/utility/requestFollowCommunityIntro';
import FollowView from '../view/FollowView';

function FollowPage() {
  useEffect(() => {
    requestFollowCommunityList();
    requestFollowCommunityPostList();
  }, []);
  return <FollowView />;
}

export default FollowPage;
