import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminHomeView from '../view/CommunityAdmin/AdminHomeView';

interface Params {
  communityId: string;
}

const AdminHomeContainer = () => {
  const { communityId } = useParams<Params>();
  return (
    <>
      <AdminHomeView communityId={communityId} />
    </>
  );
};

export default AdminHomeContainer;
