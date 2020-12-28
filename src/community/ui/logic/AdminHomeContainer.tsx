import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminHomeView from '../view/CommunityAdmin/AdminHomeView';
import { useCommunityHomeCreateItem } from 'community/store/CommunityHomeCreateStore';
import { getEmptyCommunityHomeCreateItem } from 'community/viewModel/CommunityHomeCreate';

interface Params {
  communityId: string;
}

const AdminHomeContainer = () => {
  const { communityId } = useParams<Params>();
  const communityHome = useCommunityHomeCreateItem()||getEmptyCommunityHomeCreateItem(communityId);
  
  return (
    <>
      {communityHome !== undefined && (
        <AdminHomeView communityId={communityId} communityHome={communityHome} />
      )}
    </>
  );
};

export default AdminHomeContainer;
