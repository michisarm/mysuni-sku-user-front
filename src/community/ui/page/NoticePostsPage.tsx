import PostRdo from 'community/model/PostRdo';
import { getCommunityPostList } from 'community/service/useCommunityPostCreate/utility/getCommunityPostList';
import { getPostListMapFromCommunity } from 'community/service/useCommunityPostCreate/utility/getPostListMapFromCommunity';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import CommunityPostListContainer, { SearchType } from '../logic/CommunityPostListContainer';

interface Params {
  communityId: string;
  menuId: string;
}

function NoticePostsPage() {
  const { communityId, menuId } = useParams<Params>();
  useEffect(() => {
    const test: PostRdo = {
      title: '',
      html: '',
      creatorId: '',
      offset: 0,
      limit: 20,
      searchFilter: '',
      menuId: '',
      communityId,
      sort: 'createdTime',
      pinned: true,
    };

    getCommunityPostList(test);
  }, [communityId, menuId]);

  const onSearch = (sortType: string, pinned: boolean, searchType: SearchType, searchText: string) => {
    const param: PostRdo = {
      title: '',
      html: '',
      creatorId: '',
      offset: 0,
      limit: 20,
      searchFilter: '', //얘 안쓰는거 같은데
      menuId: '',
      communityId,
      sort: sortType,
      pinned,
    };
    if (searchType === 'all') {
      param.title = '';
    } else if (searchType === 'title') {
      param.title = searchText;
    } else if (searchType === 'html') {
      param.html = searchText;
    } else if (searchType === 'creatorId') {
      param.creatorId = searchText;
    }

    getPostListMapFromCommunity(param);
  }

  return (
    <CommunityPostListContainer handelOnSearch={(sortType, pinned, searchType, searchText)=> onSearch(sortType, pinned, searchType, searchText)}/>
  );
}

export default NoticePostsPage