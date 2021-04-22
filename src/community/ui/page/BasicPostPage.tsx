import React, { useEffect } from 'react';
import { requestProfileBookmarks } from '../../service/useCommunityProfile/utility/requestProfileBookmarks';
import CommunityPostDetailContainer from '../logic/CommunityPostDetailContainer';

function BasicPostPage() {
  useEffect(() => {
    requestProfileBookmarks();
  }, []);

  return <CommunityPostDetailContainer />;
}

export default BasicPostPage;
