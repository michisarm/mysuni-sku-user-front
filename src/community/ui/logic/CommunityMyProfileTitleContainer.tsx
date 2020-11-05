import { useCommunityProfile } from 'community/service/useCommunityProfile/useCommunityProfile';
import React from 'react';
import CommunityProfileView from '../view/CommunityProfile/CommunityProfileView';
import TitleArea from '../view/CommunityProfile/TitleArea';

function CommunityMyProfileTitleContainer() {
  const [ profileItem ] = useCommunityProfile();
  return (
    <>
      { profileItem !== undefined && (
        <TitleArea profileItem={profileItem}/>
      )}
    </>
  );
}

export default CommunityMyProfileTitleContainer;
