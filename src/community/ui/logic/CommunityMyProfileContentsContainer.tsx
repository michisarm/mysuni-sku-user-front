import { useCommunityProfile } from 'community/service/useCommunityProfile/useCommunityProfile';
import React from 'react';
import ContentsProfileView from '../view/CommunityProfile/ContentsProfileView';

function CommunityMyProfileContainer() {
  const [ profileItem ] = useCommunityProfile();
  return (
    <>
      { profileItem !== undefined && (
        <ContentsProfileView profileItem={profileItem}/>
      )}
    </>
  );
}

export default CommunityMyProfileContainer;
