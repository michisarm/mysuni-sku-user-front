import { ContentLayout } from 'certification/shared';
import { useCommunityPostList } from 'community/service/useCommunityPostCreate/useCommunityPostList';
import { createStore } from 'community/store/Store';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommunityPostListView from '../view/CommunityPostCreateView/CommunityPostListView';
import CommunityPostTopLineView from '../view/CommunityPostCreateView/CommunityPostTopLineView';

interface Params {
  communityId: string;
  menuId: string;
}

export type SortType = 'TIME'|'TITLE';

function CommunityPostListContainer() {
  const [sortType, setSortType] = useState<SortType>('TIME');
  const [ postItems ] = useCommunityPostList(sortType);
  console.log('postItems', postItems)
  const handelClickCreatePost = () => {
    console.log('handelClickCreatePost')
  }
  const handleClickRow = () => {
    console.log('handleClickRow')
  }
  return (
    <>
    <span>게시판</span>
    { postItems !== undefined && (
      <>
        <ContentLayout className="community">
          <div className="ui segment full">
            <div className="course-detail-center community-containter">
              <div className="community-home-contants">
                <div className="table-board-title">
                  <CommunityPostTopLineView totalCount={postItems.totalCount} handelClickCreateTask={handelClickCreatePost}/>
                </div>
                <div className="mycommunity-list-wrap">
                  <div className="su-list notice">
                    <CommunityPostListView postItems={postItems} handleClickRow={handleClickRow} />
                  </div>
                </div>
                <div className="paging margin-none">
                  <span>pagination</span>
                </div>
              </div>
            </div>
          </div>
        </ContentLayout>
      </>
    )}
    </>
  );
}

export default CommunityPostListContainer;
