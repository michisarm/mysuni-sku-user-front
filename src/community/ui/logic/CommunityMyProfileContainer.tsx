import { useCommunityProfile } from 'community/service/useCommunityProfile/useCommunityProfile';
import React from 'react';
import CommunityProfileView from '../view/CommunityProfile/CommunityProfileView';

function CommunityMyProfileContainer() {
  const [ profileItem ] = useCommunityProfile();
  return (
    <>
      { profileItem !== undefined && (
        <CommunityProfileView profileItem={profileItem}/>
      )}
    </>
  );
}

export default CommunityMyProfileContainer;
