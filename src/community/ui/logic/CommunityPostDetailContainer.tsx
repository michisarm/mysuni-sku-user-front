import { ContentLayout } from 'certification/shared';
import { useCommunityPostList } from 'community/service/useCommunityPostCreate/useCommunityPostList';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pagination, Select } from 'semantic-ui-react';
import CommunityPostListView from '../view/CommunityPostCreateView/CommunityPostListView';
import CommunityPostTopLineView from '../view/CommunityPostCreateView/CommunityPostTopLineView';
import { SharedService } from '../../../shared/stores';
import CommunityPostListSearchBox from '../view/CommunityPostCreateView/CommunityPostListSearchBox';
import { getPostItem, getPostListMapFromCommunity } from '../../service/useCommunityPostCreate/utility/getPostListMapFromCommunity'
import PostRdo from 'community/model/PostRdo';
import { useHistory } from "react-router";

interface Params {
  communityId: string;
  menuId: string;
}

export type SortType = 'createdTime'|'replyCount';
export type SearchType = 'all'|'title'|'html'|'creatorId';


function CommunityPostDetailContainer() {
  
  // const [ postItems ] = useCommunityPostList(sortType, searchType, searchText);

  return (
    <>
    <span>상세보기</span>
    </>
  );
}

export default CommunityPostDetailContainer;
