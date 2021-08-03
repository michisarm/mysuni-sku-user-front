import React from 'react';
import MyCommunityView from '../view/MyCommunityView';

function MyCommunityPage() {
  window.location.href = '/suni-community/main/my-communities';
  return <MyCommunityView />;
}

export default MyCommunityPage;
