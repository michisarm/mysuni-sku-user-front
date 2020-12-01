import React from 'react';
import { useCommunityProfileMyCommunity } from '../../store/CommunityProfileMyCommunityStore';
import ContentsMyCommunityView from '../view/CommunityProfile/ContentsMyCommunityView';
import ContentsFeedView from '../view/CommunityProfile/ContentsFeedView';
import ContentsBookmarkView from '../view/CommunityProfile/ContentsBookmarkView';
import { useCommunityProfileBookmark } from 'community/store/CommunityProfileBookmarkStore';

function CommunityProfileBookmarkContainer() {

  const communityProfileBookmark = useCommunityProfileBookmark();
  return (
    <>
      {communityProfileBookmark !== undefined && (
        <ContentsBookmarkView
          communityProfileBookmark={communityProfileBookmark}
        />
      )}
    </>
  );  
}

export default CommunityProfileBookmarkContainer;
