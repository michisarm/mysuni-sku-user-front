import PostRdo from 'community/model/PostRdo';
import { requestCommunity } from 'community/service/useCommunityHome/requestCommunity';
import { getCommunityPostList } from 'community/service/useCommunityPostCreate/utility/getCommunityPostList';
import { getCommunityNoticePostList } from 'community/service/useCommunityPostList/getCommunityNoticePostList';
import { getNoticePostListMapFromCommunity } from 'community/service/useCommunityPostList/getNoticePostListMapFromCommunity';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommunityNoticePostListContainer from '../logic/CommunityNoticePostListContainer';
import CommunityPostListContainer, {
  SearchType,
} from '../logic/CommunityPostListContainer';

interface Params {
  communityId: string;
  menuId: string;
}

function NoticePostsPage() {
  const { communityId, menuId } = useParams<Params>();
  window.location.href = `/suni-community/community/${communityId}/notice`;
  useEffect(() => {
    requestCommunity(communityId); // 메뉴 클릭시 재호출

    const post: PostRdo = {
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
    getCommunityNoticePostList(post);
  }, [communityId, menuId]);

  const onSearch = (
    sortType: string,
    pinned: boolean,
    searchType: SearchType,
    searchText: string
  ) => {
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

    getNoticePostListMapFromCommunity(param);
  };

  return (
    <CommunityNoticePostListContainer
      handelOnSearch={(sortType, pinned, searchType, searchText) =>
        onSearch(sortType, pinned, searchType, searchText)
      }
    />
  );
}

export default NoticePostsPage;
