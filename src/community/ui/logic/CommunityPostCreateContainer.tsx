import { useCommunityPostCreate } from 'community/service/useCommunityPostCreate/useCommunityPostCreate';
import React from 'react';
import { useParams } from 'react-router-dom';
import CommunityPostCreateView from '../view/CommunityPostCreateView/CommunityPostCreateView';

interface Params {
  communityId: string;
  postId: string;
}

function CommunityPostCreateContainer() {
  const { communityId, postId } = useParams<Params>();
  const [postCreateItem] = useCommunityPostCreate(communityId, postId);
  return (
    <>
    {postCreateItem !== undefined && (
      <CommunityPostCreateView postItem={postCreateItem} />
    )}
    </>
  );
}

export default CommunityPostCreateContainer;
