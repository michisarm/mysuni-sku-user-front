import React from 'react';
import { useCommunityProfileMyCommunity } from '../../store/CommunityProfileMyCommunityStore';
import { useCommunityProfileFeed } from '../../store/CommunityProfileFeedStore';
import ContentsMyCommunityView from '../view/CommunityProfile/ContentsMyCommunityView';
import ContentsFeedView from '../view/CommunityProfile/ContentsFeedView';

function CommunityProfileFeedContainer() {

  const communityProfileFeed = useCommunityProfileFeed();
  return (
    <>
      {communityProfileFeed !== undefined && (
        <ContentsFeedView
          communityProfileFeed={communityProfileFeed}
        />
      )}
    </>
  );  
}

export default CommunityProfileFeedContainer;
