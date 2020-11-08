import { useCommunityProfileMyCommunity } from 'community/service/useCommunityProfile/useCommunityProfileMyCommunity';
import { getCommunityProfileMyCommunity } from 'community/service/useCommunityProfile/utility/getCommunityProfile';
import React, { useEffect } from 'react';
import { useMyCommunityIntro } from '../../store/CommunityMainStore';
import ContentsMyCommunityView from '../view/CommunityProfile/ContentsMyCommunityView';

function CommunityMyProfileMyCommunityContainer() {
  const myCommunityIntro = useMyCommunityIntro();
  return (
    <>
      {myCommunityIntro !== undefined && (
        <ContentsMyCommunityView myCommunityIntro={myCommunityIntro} />
      )}
    </>
  );
}

export default CommunityMyProfileMyCommunityContainer;
