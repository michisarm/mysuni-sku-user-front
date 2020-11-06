import { ContentLayout } from 'certification/shared';
import { useCommunityPostList } from 'community/service/useCommunityPostCreate/useCommunityPostList';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pagination, Select } from 'semantic-ui-react';
import CommunityPostListView from '../view/CommunityPostCreateView/CommunityPostListView';
import CommunityPostTopLineView from '../view/CommunityPostCreateView/CommunityPostTopLineView';
import { SharedService } from '../../../shared/stores';
import CommunityPostListSearchBox from '../view/CommunityPostCreateView/CommunityPostListSearchBox';
import { getPostItem, getPostListMapFromCommunity } from '../../../community/service/useCommunityPostCreate/utility/getPostListMapFromCommunity'
import PostRdo from 'community/model/PostRdo';
import { useHistory } from "react-router";

interface Params {
  communityId: string;
  menuId: string;
}

export type SortType = 'createdTime'|'replyCount';
export type SearchType = 'all'|'title'|'html'|'creatorId';


function CommunityPostListContainer() {
  const [sortType, setSortType] = useState<SortType>('createdTime');
  const [searchType, setSearchType] = useState<SearchType>('all');
  const [searchText, setsearchText] = useState<string>('');
  const [ postItems ] = useCommunityPostList();
  const history = useHistory();
  // const { pageMap } = SharedService;


  const handelClickCreatePost = () => {
  }
  const handleClickRow = () => {
    history.push({
      pathname: "/community/cineroom/:cineroomId/college/:collegeId/:communityId/post/:postId"
    })
    
  }

  const onChangeSearchType = (name: string, value: SearchType) => {
    setSearchType(value)
  }

  const onChangeSortType = (name: string, value: SortType) => {
    setSortType(value)
    //조회 api 호출
    onSearch()
  }

  const onChangeSearchText = (value: string) => {
    setsearchText(value)
  }

  const onSearch = () => {
    //조회 api 호출
    const param: PostRdo = {
      'startDate': 1573052400000,
      'endDate': 1604674799999,
      'title': '',
      'html': '',
      'creatorId': '',
      'offset': 0,
      'limit': 10,
      'searchFilter': '', //얘 안쓰는거 같은데
      'menuId': '',
      'communityId': 'CT-1',
      'sort': sortType
    }
    if (searchType === 'all') {
      param.title = ''
    }
    else if (searchType === 'title') {
      param.title = searchText
    } else if (searchType === 'html') {
      param.html = searchText
    } else if (searchType ==='creatorId') {
      param.creatorId = searchText
    }

    getPostListMapFromCommunity(param)
    // setSearch('searchText')
  }

  return (
    <>
    { postItems !== undefined && (
      <>
        <ContentLayout className="community">
          <div className="ui segment full">
            <div className="course-detail-center community-containter">
              <div className="community-home-contants">
                <div className="course-info-header">
                  <div className="survey-header border-none mb30 pt0">
                    <div className="survey-header-left">
                      딥 러닝의 역사
                    </div>
                  </div>
                </div>
                  <CommunityPostTopLineView sortType={sortType} totalCount={postItems.totalCount} onChangeSortType={(e, id) => onChangeSortType(e, id)} handelClickCreateTask={handelClickCreatePost}/>
                <div className="mycommunity-list-wrap">
                  <div className="su-list notice">
                    <CommunityPostListView postItems={postItems} handleClickRow={handleClickRow} />
                  </div>
                </div>

                <div className="paging margin-none">
                  <div className="lms-paging-holder">
                    <a className="lms-prev">이전10개</a>
                    <a className="lms-num lms-on">1</a>
                    <a className="lms-num">2</a>
                    <a className="lms-num">3</a>
                    <a className="lms-num">4</a>
                    <a className="lms-num">5</a>
                    <a className="lms-num">6</a>
                    <a className="lms-num">7</a>
                    <a className="lms-num">8</a>
                    <a className="lms-num">9</a>
                    <a className="lms-num">10</a>
                    <a className="lms-next">이후10개</a>
                  </div>
                </div>

                <CommunityPostListSearchBox searchType={searchType} searchText={searchText} onChangeSearchType={onChangeSearchType} onChangeSearchText={onChangeSearchText} onSearch={onSearch}/>
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
