import { ContentLayout } from 'certification/shared';
import { useCommunityPostList } from 'community/service/useCommunityPostCreate/useCommunityPostList';
import React, { useEffect, useRef, useState } from 'react';
import CommunityPostListView from '../view/CommunityPostCreateView/CommunityPostListView';
import CommunityPostTopLineView from '../view/CommunityPostCreateView/CommunityPostTopLineView';
import CommunityPostListSearchBox from '../view/CommunityPostCreateView/CommunityPostListSearchBox';
import { getPostListMapFromCommunity } from '../../../community/service/useCommunityPostCreate/utility/getPostListMapFromCommunity';
import PostRdo from 'community/model/PostRdo';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';
import { findPostMenuName } from 'community/api/communityApi';
import { getCommunityHome } from 'community/store/CommunityHomeStore';
import { patronInfo } from '@nara.platform/dock';

interface CommunityPostListContainerProps {
  handelOnSearch?: (
    sortType: string,
    pinned: boolean,
    searchType: SearchType,
    searchText: string
  ) => void;
  onPaging?: (page: number) => void;
}
interface Params {
  communityId: string;
  menuId: string;
}

export type SortType = 'createdTime' | 'replyCount';
export type SearchType = 'all' | 'title' | 'html' | 'creatorId';

const CommunityPostListContainer: React.FC<CommunityPostListContainerProps> = function LectureTeskView({
  handelOnSearch,
  onPaging,
}) {
  const [sortType, setSortType] = useState<SortType>('createdTime');
  const [searchType, setSearchType] = useState<SearchType>('all');
  const [searchText, setsearchText] = useState<string>('');
  const [menuName, setMenuName] = useState<string>('');
  const [menuType, setMenuType] = useState<string>('');
  const [postItems] = useCommunityPostList();
  const { communityId, menuId } = useParams<Params>();
  const history = useHistory();
  const [adminAuth, setAdminAuth] = useState<boolean>(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // const { pageMap } = SharedService;
  useEffect(() => {
    if (postItems === undefined) {
      return;
    }
    totalPages();

    const menuData = findPostMenuName(communityId, menuId);
    menuData.then(result => {
      setMenuName(result.name);
      setMenuType(result.type)
    });

    const denizenId = patronInfo.getDenizenId();
    //managerId 가져와서 현재 로그인한 계정과 비교
    if (
      getCommunityHome() &&
      getCommunityHome()?.community &&
      getCommunityHome()?.community?.managerId
    ) {
      setAdminAuth(getCommunityHome()?.community?.managerId! === denizenId);
    }
  }, [postItems]);

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
      searchGubun: searchType, //얘 안쓰는거 같은데
      searchTitle: searchText,
      menuId,
      communityId,
      sort: sortType,
      pinned: false,
    };

    getPostListMapFromCommunity(param);
    // setSearch('searchText')
  };

  const onPageChange = (data: any) => {
    const param: PostRdo = {
      title: '',
      html: '',
      creatorId: '',
      offset: (data.activePage - 1) * 10,
      limit: 10,
      searchFilter: '', //얘 안쓰는거 같은데
      menuId,
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

    setActivePage(data.activePage);
  };

  const totalPages = () => {
    let totalpage = Math.ceil(postItems!.totalCount / 10);
    if (postItems!.totalCount % 10 < 0) {
      totalpage++;
    }
    setTotalPage(totalpage);
  };

  return (
    <>
      {postItems !== undefined && (
        <>
          <div className="course-info-header">
            <div className="survey-header border-none mb30 pt0">
              <div className="survey-header-left">{menuName}</div>
            </div>
          </div>
          <CommunityPostTopLineView
            sortType={sortType}
            totalCount={postItems.totalCount}
            menuType={menuType}
            managerId={adminAuth}
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

          {/* <div className="paging margin-none">
            <div className="lms-paging-holder">
              <a className="lms-num lms-on">1</a>
            </div>
          </div> */}

          {/* <div className="center"> */}
          <div className="lms-paging-holder">
            <Pagination
              activePage={activePage}
              totalPages={totalPage}
              firstItem={null}
              lastItem={null}
              onPageChange={(e, data) => onPageChange(data)}
            />
          </div>
          {/* </div> */}

          <CommunityPostListSearchBox
            searchType={searchType}
            searchText={searchText}
            onChangeSearchType={onChangeSearchType}
            onChangeSearchText={onChangeSearchText}
            onSearch={onSearch}
          />
        </>
      )}
    </>
  );
};

export default CommunityPostListContainer;
