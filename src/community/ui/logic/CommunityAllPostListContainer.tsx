import { ContentLayout } from 'certification/shared';
import { useCommunityPostList } from 'community/service/useCommunityPostCreate/useCommunityPostList';
import React, { useEffect, useRef, useState } from 'react';
import CommunityPostListView from '../view/CommunityPostCreateView/CommunityPostListView';
import CommunityPostTopLineView from '../view/CommunityPostCreateView/CommunityPostTopLineView';
import CommunityPostListSearchBox from '../view/CommunityPostCreateView/CommunityPostListSearchBox';
import { getPostListMapFromCommunity } from '../../service/useCommunityPostCreate/utility/getPostListMapFromCommunity';
import PostRdo from 'community/model/PostRdo';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';
import { getAllPostListMapFromCommunity } from 'community/service/useCommunityPostList/getAllPostListMapFromCommunity';
import { findPostMenuName } from 'community/api/communityApi';
import { checkMember } from 'community/service/useMember/useMember';

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

const CommunityAllPostListContainer: React.FC<CommunityPostListContainerProps> = function LectureTeskView({
  handelOnSearch,
  onPaging,
}) {
  const [sortType, setSortType] = useState<SortType>('createdTime');
  const [searchType, setSearchType] = useState<SearchType>('all');
  const [searchText, setsearchText] = useState<string>('');
  const [postItems] = useCommunityPostList();
  const { communityId, menuId } = useParams<Params>();
  const history = useHistory();

  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [menuType, setMenuType] = useState<string>('');
  const [menuName, setMenuName] = useState<string>('');

  useEffect(() => {
    if (postItems === undefined) {
      return;
    }
    const menuData = findPostMenuName(communityId, menuId);
    menuData.then(result => {
      setMenuName(result.name);
      setMenuType(result.type)
    });
    totalPages();
  }, [postItems]);

  const handelClickCreatePost = () => {};
  const handleClickRow = async (param: any) => {
    //멤버 가입 체크
    if(!await checkMember(communityId)){
      return;
    }
    if (param.menuType === 'ANONYMOUS') {
      history.push({
        pathname: `/community/${param.communityId}/ANONYMOUS/post/${param.postId}`,
      });
    }else if (param.menuType === 'DISCUSSION'){
      history.push({
        pathname: `/community/${param.communityId}/discussion/${param.menuId}`,
      });
    }else {
      history.push({
        pathname: `/community/${param.communityId}/post/${param.postId}`,
      });
    }   
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
    if (searchType === 'all') {
      param.title = '';
    } else if (searchType === 'title') {
      param.title = searchText;
    } else if (searchType === 'html') {
      param.html = searchText;
    } else if (searchType === 'creatorId') {
      param.creatorId = searchText;
    }

    getAllPostListMapFromCommunity(param);
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
    getAllPostListMapFromCommunity(param);

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
              <div className="survey-header-left">전체글</div>
            </div>
          </div>
          <CommunityPostTopLineView
            sortType={sortType}
            totalCount={postItems.totalCount}
            onChangeSortType={(e, id) => onChangeSortType(e, id)}
            handelClickCreateTask={handelClickCreatePost}
            pageType="all"
          />
          <div className="mycommunity-list-wrap">
            <div className="su-list notice">
              <CommunityPostListView
                menuType={menuType}
                postItems={postItems}
                handleClickRow={param => handleClickRow(param)}
              />
            </div>
          </div>
          <div className="lms-paging-holder">
            <Pagination
              activePage={activePage}
              totalPages={totalPage}
              firstItem={null}
              lastItem={null}
              onPageChange={(e, data) => onPageChange(data)}
            />
          </div>
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

export default CommunityAllPostListContainer;
