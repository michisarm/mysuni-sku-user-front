import React from 'react';
import { useCommunityProfileCommunity } from '../../store/CommunityProfileCommunityStore';
import OtherCommunityView from '../view/CommunityProfile/OtherCommunityView';

function CommunityProfileCommunityContainer() {
  const communityProfileCommunity = useCommunityProfileCommunity();
  return (
    <>
      {communityProfileCommunity !== undefined && (
        <OtherCommunityView
          communityProfileCommunity={communityProfileCommunity}
        />
      )}
    </>
  );
}

export default CommunityProfileCommunityContainer;
