import { ContentLayout } from 'certification/shared';
import { useCommunityPostList } from 'community/service/useCommunityPostCreate/useCommunityPostList';
import { createStore } from 'community/store/Store';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pagination, Select } from 'semantic-ui-react';
import CommunityPostListView from '../view/CommunityPostCreateView/CommunityPostListView';
import CommunityPostTopLineView from '../view/CommunityPostCreateView/CommunityPostTopLineView';

interface Params {
  communityId: string;
  menuId: string;
}

export type SortType = 'TIME'|'TITLE';
export type SearchType = '제목'|'내용'|'작성자';


function CommunityPostListContainer() {
  const [sortType, setSortType] = useState<SortType>('TIME');
  const [searchType, setSearchType] = useState<SearchType>('제목');
  const [ postItems ] = useCommunityPostList(sortType, searchType);

  const questionType = [{'text': '제목', 'value': 1}, {'text': '내용', 'value': 2}, {'text': '작성자', 'value': 3}]


  console.log('postItems', postItems)
  const handelClickCreatePost = () => {
    console.log('handelClickCreatePost')
  }
  const handleClickRow = () => {
    console.log('handleClickRow')
  }

  const onChangeSearchPost = (name: string, value: string | {}) => {
    console.log('onChangePersonalCubeProps')
    setSearchType('작성자')
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
                {/* <Pagination
                      activePage={pageMap.get('panopto') ? pageMap.get('panopto').page : 1}
                      totalPages={pageMap.get('panopto') ? pageMap.get('panopto').totalPages : 1}
                      onPageChange={(e, data) => this.findAllPanoptos(data.activePage as number)}
                    /> */}
                </div>
                <div>
                  <Select placeholder="분류를 선택해주세요"
                    className="s160 small-border"
                    options={questionType}
                    onChange={(e: any, data: any) => onChangeSearchPost('search', {
                    id: data.value,
                    name: e.target.innerText,
                    })}
                  />
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
