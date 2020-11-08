import React from 'react';
import { useLocation } from 'react-router-dom';
import ProfileMenuView from '../view/CommunityProfile/ProfileMenuView';

function CommunityMyProfileMenuContainer() {
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
      <ProfileMenuView menuType={menuType}/>
    </>
  );
}

export default CommunityMyProfileMenuContainer;
