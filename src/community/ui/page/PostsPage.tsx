import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostRdo from '../../model/PostRdo';
import { getCommunityPostList } from '../../service/useCommunityPostCreate/utility/getCommunityPostList';
import CommunityPostListContainer from '../logic/CommunityPostListContainer';

interface Params {
  communityId: string;
  menuId: string;
}

function PostsPage() {
  const { communityId, menuId } = useParams<Params>();
  useEffect(() => {
    const test: PostRdo = {
      startDate: 1573052400000,
      endDate: 1604674799999,
      title: '',
      html: '',
      creatorId: '',
      offset: 0,
      limit: 20,
      searchFilter: '',
      menuId,
      communityId,
      sort: 'createdTime',
    };

    getCommunityPostList(test);
  }, [communityId, menuId]);

  return (
    <div className="course-detail-center community-containter">
      <div className="community-home-contants">
        <CommunityPostListContainer />
      </div>
    </div>
  );
}

export default PostsPage;
