import { ContentLayout } from 'certification/shared';
import { useCommunityPostList } from 'community/service/useCommunityPostCreate/useCommunityPostList';
import { createStore } from 'community/store/Store';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pagination, Select } from 'semantic-ui-react';
import CommunityPostListView from '../view/CommunityPostCreateView/CommunityPostListView';
import CommunityPostTopLineView from '../view/CommunityPostCreateView/CommunityPostTopLineView';
import { SharedService } from '../../../shared/stores';
import CommunityPostListSearchBox from '../view/CommunityPostCreateView/CommunityPostListSearchBox';

interface Params {
  communityId: string;
  menuId: string;
}

export type SortType = 'createdTime'|'replyCount';
export type SearchType = '전체'|'제목'|'내용'|'작성자';


function CommunityPostListContainer() {
  const [sortType, setSortType] = useState<SortType>('createdTime');
  const [searchType, setSearchType] = useState<SearchType>('전체');
  const [searchText, setsearchText] = useState<string>('');
  const [ postItems ] = useCommunityPostList(sortType, searchType, searchText);
  // const { pageMap } = SharedService;


  console.log('postItems', postItems)
  const handelClickCreatePost = () => {
    console.log('handelClickCreatePost')
  }
  const handleClickRow = () => {
    console.log('handleClickRow')
  }

  const onChangeSearchType = (name: string, value: SearchType) => {
    console.log('onChangePersonalCubeProps')
    console.log('name', name)
    console.log('value', value)

    setSearchType(value)
  }

  const onChangeSortType = (name: string, value: SortType) => {
    console.log('onChangePersonalCubeProps')
    console.log('name', name)
    console.log('value', value)
    setSortType(value)
    //조회 api 호출
  }

  const onChangeSearchText = (value: string) => {
    setsearchText(value)
  }

  const test = (test: number) => {
    console.log(test)
    console.log('test')
  }

  const onOk = () => {
    //조회 api 호출
    console.log('searchType', searchType)
    console.log('searchText', searchText)
  }

  return (
    <>
    { postItems !== undefined && (
      <>
        <ContentLayout className="community">
          <div className="ui segment full">
            <div className="course-detail-center community-containter">
              <div className="community-home-contants">
                <div className="table-board-title">
                  <CommunityPostTopLineView sortType={sortType} totalCount={postItems.totalCount} onChangeSortType={(e, id) => onChangeSortType(e, id)} handelClickCreateTask={handelClickCreatePost}/>
                </div>
                <div className="mycommunity-list-wrap">
                  <div className="su-list notice">
                    <CommunityPostListView postItems={postItems} handleClickRow={handleClickRow} />
                  </div>
                </div>
                <div className="paging margin-none">
                  <div className="lms-paging-holder">
                    <Pagination
                      activePage={ 1}
                      totalPages={ 10}
                      // onPageChange={(e, data) => this.findAllPanoptos(data.activePage as number)}
                      onPageChange={(e, data) => test(2)}
                    />
                  </div>
                </div>
                <CommunityPostListSearchBox searchText={searchText} onChangeSearchType={onChangeSearchType} onChangeSearchText={onChangeSearchText} onOk={onOk}/>
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
