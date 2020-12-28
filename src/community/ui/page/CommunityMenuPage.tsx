import React, { useEffect } from 'react';
import CommunityProfileBookmarkContainer from '../logic/CommunityProfileBookmarkContainer';
import { requestProfileBookmarks } from 'community/service/useCommunityProfile/utility/requestProfileBookmarks';
import CommunityMenuContainer from '../logic/CommunityMenuContainer';
import { requestCommunityGroups, requestCommunityMenu } from 'community/service/useCommunityMenu/requestCommunity';

function CommunityMenuPage(communityId:string) {

  useEffect(() => {
    requestCommunityMenu(communityId);
    requestCommunityGroups(communityId);
  }, []);

  return (   
    <div>
      <CommunityMenuContainer />
    </div>
    );
}

export default CommunityMenuPage;
