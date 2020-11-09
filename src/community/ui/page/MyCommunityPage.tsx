import React, { useEffect } from 'react';
import {
  requestMyCommunityList,
  requestMyCommunityPostList,
} from '../../service/useMyCommunityIntro/utility/requestMyCommunityIntro';
import MyCommunityView from '../view/MyCommunityView';

function MyCommunityPage() {
  useEffect(() => {
    requestMyCommunityList();
    requestMyCommunityPostList();
  }, []);
  return <MyCommunityView />;
}

export default MyCommunityPage;
