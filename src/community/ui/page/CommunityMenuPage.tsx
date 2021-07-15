import React, { useEffect } from 'react';
import CommunityMenuContainer from '../logic/CommunityMenuContainer';
import {
  requestCommunityGroups,
  requestCommunityMenu,
} from 'community/service/useCommunityMenu/requestCommunity';
import { setSearchBox } from 'community/store/SearchBoxStore';
import { getEmptySearchBox } from 'community/model/SearchBox';

function CommunityMenuPage(communityId: string) {
  window.location.href = `/suni-community/admin/${communityId}/menu`;
  useEffect(() => {
    setSearchBox(getEmptySearchBox());
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
