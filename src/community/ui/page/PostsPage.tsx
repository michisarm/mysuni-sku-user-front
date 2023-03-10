import { requestCommunityMenus } from 'community/service/useCommunityHome/requestCommunity';
import { getPostListMapFromCommunity } from 'community/service/useCommunityPostCreate/utility/getPostListMapFromCommunity';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostRdo from '../../model/PostRdo';
import { getCommunityPostList } from '../../service/useCommunityPostCreate/utility/getCommunityPostList';
import CommunityPostListContainer, {
  SearchType,
} from '../logic/CommunityPostListContainer';

interface Params {
  communityId: string;
  menuId: string;
}

function PostsPage() {
  const { communityId, menuId } = useParams<Params>();
  window.location.href = `/suni-community/community/${communityId}/board/${menuId}`;
  useEffect(() => {
    requestCommunityMenus(communityId); // 메뉴 클릭시 재호출

    const params: PostRdo = {
      title: '',
      html: '',
      creatorId: '',
      offset: 0,
      limit: 20,
      searchGubun: 'all',
      menuId,
      communityId,
      sort: 'createdTime',
      pinned: false,
    };
    getCommunityPostList(params);
  }, [communityId, menuId]);

  const onSearch = (
    sortType: string,
    pinned: boolean,
    searchType: SearchType,
    searchText: string,
    offset?: number,
    limit?: number
  ) => {
    const param: PostRdo = {
      title: '',
      html: '',
      creatorId: '',
      offset: 0,
      limit: 10,
      searchGubun: '', //얘 안쓰는거 같은데
      menuId,
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
  };

  return (
    <CommunityPostListContainer
      handelOnSearch={(sortType, pinned, searchType, searchText) =>
        onSearch(sortType, pinned, searchType, searchText)
      }
    />
  );
}

export default PostsPage;
