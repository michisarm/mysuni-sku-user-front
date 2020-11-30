import React from 'react';
import { useCommunityProfileMyCommunity } from '../../store/CommunityProfileMyCommunityStore';
import ContentsMyCommunityView from '../view/CommunityProfile/ContentsMyCommunityView';

function CommunityMyProfileMyCommunityContainer() {
  const communityProfileMyCommunity = useCommunityProfileMyCommunity();
  return (
    <>
      {communityProfileMyCommunity !== undefined && (
        <ContentsMyCommunityView
          communityProfileMyCommunity={communityProfileMyCommunity}
        />
      )}
    </>
  );
}

export default CommunityMyProfileMyCommunityContainer;
