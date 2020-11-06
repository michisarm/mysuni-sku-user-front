import { useCommunityProfile } from 'community/service/useCommunityProfile/useCommunityProfile';
import React from 'react';
import TitleProfileView from '../view/CommunityProfile/TitleProfileView';

function CommunityMyProfileTitleContainer() {
  const [ profileItem ] = useCommunityProfile();
  return (
    <>
      { profileItem !== undefined && (
        <TitleProfileView profileItem={profileItem}/>
      )}
    </>
  );
}

export default CommunityMyProfileTitleContainer;
