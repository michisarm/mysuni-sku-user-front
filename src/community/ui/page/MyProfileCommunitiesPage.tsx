import React, { useEffect } from 'react';
import CommunityMyProfileMyCommunityContainer from '../logic/CommunityMyProfileMyCommunityContainer';
import CommunityMyProfileMenuContainer from '../logic/CommunityMyProfileMenuContainer';
import { requestMyCommunityList } from '../../service/useMyCommunityIntro/utility/requestMyCommunityIntro';

function MyProfileCommunitiesPage() {
  useEffect(() => {
    requestMyCommunityList();
  }, []);
  return (
    <>
      <div>
        <CommunityMyProfileMyCommunityContainer />
      </div>
    </>
  );
}

export default MyProfileCommunitiesPage;
