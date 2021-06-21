import React, { useEffect } from 'react';
import CommunityProfileFeedContainer from '../logic/CommunityProfileFeedContainer';
import { requestProfileBookmarks } from 'community/service/useCommunityProfile/utility/requestProfileBookmarks';
import { requestProfileFeeds } from 'community/service/useCommunityProfile/utility/requestProfileFeeds';

function ProfileFeedPage(profileId:string) {
  useEffect(() => {
    requestProfileFeeds(profileId);
  }, [profileId]);
  
  return (   
    CommunityProfileFeedContainer(profileId)
  );
}
export default ProfileFeedPage;