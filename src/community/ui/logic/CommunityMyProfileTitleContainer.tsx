import { useCommunityProfile } from 'community/service/useCommunityProfile/useCommunityProfile';
import React from 'react';
import ProfileTitleView from '../view/CommunityProfile/ProfileTitleView';

function CommunityMyProfileTitleContainer() {
  const [ profileItem ] = useCommunityProfile();

  return (
    <>
      { profileItem !== undefined && (
        <ProfileTitleView 
          profileItem={profileItem} 
        />
      )}
    </>
  );
}

export default CommunityMyProfileTitleContainer;
