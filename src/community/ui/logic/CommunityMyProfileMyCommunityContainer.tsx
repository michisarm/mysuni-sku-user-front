import { useCommunityProfileMyCommunity } from 'community/service/useCommunityProfile/useCommunityProfileMyCommunity';
import { getCommunityProfileMyCommunity } from 'community/service/useCommunityProfile/utility/getCommunityProfile';
import React, { useEffect } from 'react';
import ContentsMyCommunityView from '../view/CommunityProfile/ContentsMyCommunityView';

function CommunityMyProfileMyCommunityContainer() {

  useEffect(() => {
    getCommunityProfileMyCommunity();
  },[]);

  const [ myCommunities ] = useCommunityProfileMyCommunity();
  return (
    <>
      {myCommunities !== undefined && (
        <ContentsMyCommunityView myCommunities={myCommunities} />
      )}
    </>
  );
}

export default CommunityMyProfileMyCommunityContainer;
