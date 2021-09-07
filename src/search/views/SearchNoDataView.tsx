import React from 'react';
import { getQueryId } from 'search/search.events';
import { getSearchInSearchInfo } from 'search/search.services';

export function SearchNoDataView() {
  //

  const queryId = getQueryId();
  const searchInSearchInfo = getSearchInSearchInfo();

  return (
    <>
      <p className="ttl_txt">
        {searchInSearchInfo?.checkSearchInSearch && (
          <>
            {searchInSearchInfo.parentSearchValue} 중{' '}
            <strong className="search_keyword">
              ‘{searchInSearchInfo.searchValue}’
            </strong>
            에 대한 검색결과가 없습니다.
          </>
        )}
        {!searchInSearchInfo?.checkSearchInSearch && (
          <>
            <strong className="search_keyword">‘{queryId}’</strong>에 대한
            검색결과가 없습니다.
          </>
        )}
      </p>

      <div className="result_nodata">
        <p>검색어의 철자가 정확한지 확인해 보세요.</p>
        <p>검색어의 단어 수를 줄이거나, 더욱 일반적인 단어로 검색해 보세요.</p>
        <p>키워드에 있는 특수문자를 뺀 후에 검색해 보세요.</p>
        <p>검색 옵션을 변경한 후 다시 검색해 보세요.</p>
      </div>
    </>
  );
}
