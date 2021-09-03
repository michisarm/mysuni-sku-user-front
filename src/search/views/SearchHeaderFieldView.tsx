import React, { useEffect } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { SearchHeaderFieldPopularView } from './SearchHeaderFieldPopularView';
import { search, searchPopularList } from 'search/search.events';
import {
  setSearchRecentList,
  useSearchRecentList,
} from 'search/search.services';
import { StorageModel } from '@nara.platform/accent';

interface Props {
  callback?: (searchValue?: string) => void;
}

export function SearchHeaderFieldView(props: Props) {
  //

  const param = useParams();

  const onClickSearch = (searchValue: string) => {
    if (props.callback !== undefined) {
      props.callback(searchValue);
    }
    search(searchValue);
  };

  // 최근검색어
  const searchRecents = useSearchRecentList();
  if (searchRecents === undefined) {
    const storageSearchRecents =
      JSON.parse(localStorage.getItem('nara.searchRecents') || '[]') || [];
    setSearchRecentList(storageSearchRecents);
  }
  const onClickRemove = (searchValue: string) => {
    const newSearchRecents = searchRecents?.filter(
      (ele) => ele !== searchValue
    );
    new StorageModel('localStorage', 'searchRecents').save(
      newSearchRecents || []
    );
    setSearchRecentList(newSearchRecents);
  };
  const allClear = () => {
    new StorageModel('localStorage', 'searchRecents').save([]);
    setSearchRecentList([]);
  };

  return (
    <>
      {/* 최근검색어 */}
      <div className="w_area recent_list">
        <div className="w_header">
          <strong className="w_tit">최근 검색어</strong>
          <Button className="all_dt" onClick={allClear}>
            전체 삭제
          </Button>
        </div>
        <div className="w_contents">
          {(searchRecents?.length || 0) < 1 && (
            <p className="txt_nodata">최근 검색어가 없습니다.</p>
          )}
          {searchRecents && searchRecents.length > 0 && (
            <ul>
              {searchRecents?.map((searchRecent, index) => (
                <li key={`search-recent-${index}`}>
                  <strong
                    className="rwd"
                    onClick={() => onClickSearch(searchRecent)}
                  >
                    {searchRecent}
                  </strong>
                  <Button
                    className="w_dl"
                    onClick={() => onClickRemove(searchRecent)}
                  >
                    <Icon className="i_dl" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* 인기검색어 */}
      <div className="w_area poplr_list">
        <div className="w_header">
          <strong className="w_tit">인기 검색어</strong>
        </div>
        <div className="w_contents">
          <SearchHeaderFieldPopularView onClickSearch={onClickSearch} />
        </div>
      </div>
    </>
  );
}
