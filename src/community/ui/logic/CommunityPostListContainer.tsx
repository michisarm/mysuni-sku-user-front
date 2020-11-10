import { ContentLayout } from 'certification/shared';
import { useCommunityPostList } from 'community/service/useCommunityPostCreate/useCommunityPostList';
import React, { useRef, useState } from 'react';
import CommunityPostListView from '../view/CommunityPostCreateView/CommunityPostListView';
import CommunityPostTopLineView from '../view/CommunityPostCreateView/CommunityPostTopLineView';
import CommunityPostListSearchBox from '../view/CommunityPostCreateView/CommunityPostListSearchBox';
import { getPostListMapFromCommunity } from '../../../community/service/useCommunityPostCreate/utility/getPostListMapFromCommunity';
import PostRdo from 'community/model/PostRdo';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

interface CommunityPostListContainerProps {
  handelOnSearch?: (
    sortType: string,
    pinned: boolean,
    searchType: SearchType,
    searchText: string
  ) => void;
}
interface Params {
  communityId: string;
  menuId: string;
}

export type SortType = 'createdTime' | 'replyCount';
export type SearchType = 'all' | 'title' | 'html' | 'creatorId';

const CommunityPostListContainer: React.FC<CommunityPostListContainerProps> = function LectureTeskView({
  handelOnSearch,
}) {
  const [sortType, setSortType] = useState<SortType>('createdTime');
  const [searchType, setSearchType] = useState<SearchType>('all');
  const [searchText, setsearchText] = useState<string>('');
  const [postItems] = useCommunityPostList();
  const { communityId, menuId } = useParams<Params>();
  const history = useHistory();
  // const { pageMap } = SharedService;

  const handelClickCreatePost = () => {};
  const handleClickRow = (param: any) => {
    history.push({
      pathname: `/community/${param.communityId}/post/${param.postId}`,
    });
  };

  const onChangeSearchType = (name: string, value: SearchType) => {
    setSearchType(value);
  };

  const onChangeSortType = (name: string, value: SortType) => {
    setSortType(value);
    //조회 api 호출
    // onSearch();
    handelOnSearch!(value, false, searchType, searchText);
  };

  const onChangeSearchText = (value: string) => {
    setsearchText(value);
  };

  const onSearch = () => {
    //조회 api 호출
    const param: PostRdo = {
      title: '',
      html: '',
      creatorId: '',
      offset: 0,
      limit: 10,
      searchFilter: '', //얘 안쓰는거 같은데
      menuId: '',
      communityId,
      sort: sortType,
      pinned: false,
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
    // setSearch('searchText')
  };

  return (
    <>
      {postItems !== undefined && (
        <>
          <ContentLayout className="community">
            <div className="ui segment full">
              <div className="course-info-header">
                <div className="survey-header border-none mb30 pt0">
                  <div className="survey-header-left">메뉴명</div>
                </div>
              </div>
              <CommunityPostTopLineView
                sortType={sortType}
                totalCount={postItems.totalCount}
                onChangeSortType={(e, id) => onChangeSortType(e, id)}
                handelClickCreateTask={handelClickCreatePost}
              />
              <div className="mycommunity-list-wrap">
                <div className="su-list notice">
                  <CommunityPostListView
                    postItems={postItems}
                    handleClickRow={param => handleClickRow(param)}
                  />
                </div>
              </div>

              <div className="paging margin-none">
                <div className="lms-paging-holder">
                  {/* <a className="lms-prev">이전10개</a> */}
                  <a className="lms-num lms-on">1</a>
                  {/* <a className="lms-num">2</a>
                <a className="lms-num">3</a>
                <a className="lms-num">4</a>
                <a className="lms-num">5</a>
                <a className="lms-num">6</a>
                <a className="lms-num">7</a>
                <a className="lms-num">8</a>
                <a className="lms-num">9</a>
                <a className="lms-num">10</a> */}
                  {/* <a className="lms-next">이후10개</a> */}
                </div>
              </div>

              <CommunityPostListSearchBox
                searchType={searchType}
                searchText={searchText}
                onChangeSearchType={onChangeSearchType}
                onChangeSearchText={onChangeSearchText}
                onSearch={onSearch}
              />
            </div>
          </ContentLayout>
        </>
      )}
    </>
  );
};

export default CommunityPostListContainer;
