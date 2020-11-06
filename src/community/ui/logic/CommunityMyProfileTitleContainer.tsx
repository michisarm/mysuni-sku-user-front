import { useCommunityProfile } from 'community/service/useCommunityProfile/useCommunityProfile';
import React from 'react';
import { useLocation } from 'react-router-dom';
import ProfileTitleView from '../view/CommunityProfile/ProfileTitleView';

function CommunityMyProfileTitleContainer() {
  const [ profileItem ] = useCommunityProfile();
  
  const path = useLocation();
  let menuType = 'myProfile';

  if (path.pathname.indexOf('/my-profile/feed') > -1) {
    menuType = 'feed';
  } else if (path.pathname.indexOf('/my-profile/communities') > -1) {
    menuType = 'communities';
  } else if (path.pathname.indexOf('/my-profile/bookmark') > -1) {
    menuType = 'bookmark';
  }

  return (
    <>
      { profileItem !== undefined && (
        <ProfileTitleView 
          profileItem={profileItem} 
          menuType={menuType}
        />
      )}
    </>
  );
}

export default CommunityMyProfileTitleContainer;
