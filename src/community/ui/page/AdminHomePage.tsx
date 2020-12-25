import React, { useEffect } from 'react';
import AdminHomeContainer from '../logic/AdminHomeContainer';
import { findHomeContents } from '../../service/useCommunityHome/requestCommunityHome'

const AdminHomePage = (communityId: string) => {
  useEffect(() => {
    findHomeContents(communityId);
  }, [communityId]);

  return <AdminHomeContainer />;
};

export default AdminHomePage;
