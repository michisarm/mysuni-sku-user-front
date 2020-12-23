import React from 'react';
import { useParams } from 'react-router-dom';
import AdminHomeView from '../view/CommunityAdmin/AdminHomeView';
import { useCommunityAdminHome } from '../../service/useAdminHome/useHome';

interface Params {
  communityId: string;
}

const AdminHomeContainer = () => {
  const { communityId } = useParams<Params>();
  const save = useCommunityAdminHome();

  console.log('api save', save);
  return (
    <>
      <AdminHomeView communityId={communityId} />
    </>
  );
};

export default AdminHomeContainer;
