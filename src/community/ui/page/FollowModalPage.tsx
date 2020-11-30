import React, { useEffect } from 'react';
import { requestFollowModal } from '../../service/useFollowModal/utility/requestFollowModalIntro';
import FollowModalView from '../view/CommunityFollowModal/FollowModalView';

interface ModalOpenProps {
  open: boolean;
}

const FollowModalPage:React.FC<ModalOpenProps> = function FollowModalPage ({
  open
}) {
  useEffect(() => {
    requestFollowModal();
  },[]);
  return <FollowModalView open={open}/>
}

export default FollowModalPage;