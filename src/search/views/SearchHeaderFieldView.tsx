import React, { useEffect, useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { SearchHeaderFieldPopularView } from './SearchHeaderFieldPopularView';
import { search } from '../search.events';
import {
  setSearchInSearchInfo,
  setSearchRecentList,
  useSearchRecentList,
} from '../search.services';
import { PolyglotText } from '../../shared/ui/logic/PolyglotText';
import { StorageModel } from '@nara.platform/accent';

interface Props {
  callback?: (searchValue?: string) => void;
  setSearchValue: (value: string) => void;
}

export function SearchHeaderFieldView(props: Props) {
  //
  // const [write, setWrite] = useState<string>();
  // const [isSearchOpen, setIsSearchOpen] = useState<boolean>();

  // const setSearchOpen = () => {
  //   setWrite('');
  //   // this.setState({ isSearchOpen: !isSearchOpen });
  //   setIsSearchOpen(!isSearchOpen);
  //   document.getElementById('btnSearchPopup')?.click();
  //   setSearchInSearchInfo({
  //     checkSearchInSearch: false,
  //     parentSearchValue: '',
  //     searchValue: '',
  //   }); // 초기화
  // };

  const onClickSearch = (searchValue: string) => {
    props.setSearchValue(searchValue);
    search(searchValue);
  };

  const searchRecents = useSearchRecentList();

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
    <div className="g-search-field">
      <div className="w_wrap">
        <div className="w_inner">
          <div className="w_area recent_list">
            <div className="w_header">
              <strong>
                <PolyglotText
                  id="통검-필레팝-최근검색어"
                  defaultString="최근 검색어"
                />
              </strong>
              {searchRecents && searchRecents.length > 0 && (
                <Button className="all_dt" onClick={allClear}>
                  <PolyglotText
                    id="통검-필레팝-전체삭제"
                    defaultString="전체 삭제"
                  />
                </Button>
              )}
            </div>
            <div className="w_contents">
              {(searchRecents?.length || 0) < 1 && (
                <p className="txt_nodata">
                  <PolyglotText
                    id="통검-필레팝-최근검색어없음"
                    defaultString="최근 검색어가 없습니다."
                  />
                </p>
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
          <div className="w_area poplr_list">
            <div className="w_header">
              <strong className="w_tit">인기 검색어</strong>
            </div>
            <div className="w_contents">
              <SearchHeaderFieldPopularView onClickSearch={onClickSearch} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
