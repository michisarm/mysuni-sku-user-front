import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Icon, Input, Popup } from 'semantic-ui-react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { SearchHeaderFieldPopularView } from './SearchHeaderFieldPopularView';
import { getQueryId, search } from 'search/search.events';
import {
  setSearchRecentList,
  useSearchRecentList,
} from 'search/search.services';

interface Props {
  callback?: () => void;
}

export function SearchHeaderFieldView(props: Props) {
  //

  const param = useParams();

  const onClickSearch = (searchValue: string) => {
    if (props.callback !== undefined) {
      props.callback();
    }
    search(searchValue);
  };
  const searchRecents = useSearchRecentList();
  const onClickRemove = (searchValue: string) => {
    const newSearchRecents = searchRecents?.filter(
      (ele) => ele !== searchValue
    );
    setSearchRecentList(newSearchRecents);
  };
  const allClear = () => {
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
