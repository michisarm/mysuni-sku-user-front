import React, { useEffect } from 'react';
import { requestFollowersModal, requestFollowingsModal } from '../../service/useFollowModal/utility/requestFollowModalIntro';
import FollowModalView from '../view/CommunityFollowModal/FollowModalView';

const FollowModalPage:React.FC = function FollowModalPage () {
  // useEffect(() => {
  //   requestFollowersModal();
  //   requestFollowingsModal();
  // },[]);
  return <FollowModalView />
}

export default FollowModalPage;