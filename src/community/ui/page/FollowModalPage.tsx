import React, { useEffect } from 'react';
import { requestFollowModal } from '../../service/useFollowModal/utility/requestFollowModalIntro';
import FollowModalView from '../view/CommunityFollowModal/FollowModalView';

const FollowModalPage:React.FC = function FollowModalPage () {
  useEffect(() => {
    requestFollowModal();
  },[]);
  return <FollowModalView />
}

export default FollowModalPage;