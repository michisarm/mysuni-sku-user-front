import React, { useEffect } from 'react';
import CommunityProfileBookmarkContainer from '../logic/CommunityProfileBookmarkContainer';
import { requestProfileBookmarks } from 'community/service/useCommunityProfile/utility/requestProfileBookmarks';

function MyProfileBookmarkPage() {

  useEffect(() => {
    requestProfileBookmarks();
  }, []);

  return (   
    <div>
      <CommunityProfileBookmarkContainer />
    </div>
    );
}

export default MyProfileBookmarkPage;
