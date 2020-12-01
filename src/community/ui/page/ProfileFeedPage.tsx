import React, { useEffect } from 'react';
import CommunityProfileFeedContainer from '../logic/CommunityProfileFeedContainer';
import { requestProfileBookmarks } from 'community/service/useCommunityProfile/utility/requestProfileBookmarks';

function ProfileFeedPage() {
  useEffect(() => {
    requestProfileBookmarks();
  }, []);
  
  return (   
  <div>
    <CommunityProfileFeedContainer />
  </div>
  );
}
export default ProfileFeedPage;
