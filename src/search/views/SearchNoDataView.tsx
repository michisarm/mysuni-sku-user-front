import React from 'react';
import { getQueryId } from 'search/search.events';
import {
  PolyglotText,
  getPolyglotText,
} from '../../shared/ui/logic/PolyglotText';
import SearchService from 'search/service/SearchService';

export function SearchNoDataView() {
  //
  const queryId = getQueryId();
  const searchInSearchInfo = SearchService.instance.searchInfo;

  return (
    <>
      {searchInSearchInfo?.inAgain && (
        <p
          className="ttl_txt"
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              '{value} 중 <strong class="search_keyword"> ‘{value2}’</strong>에 대한 검색결과가 없습니다.',
              '통검-요약정보-결과내검색없음',
              {
                value: searchInSearchInfo.recentSearchValue,
                value2: searchInSearchInfo.searchValue,
              }
            ),
          }}
        />
      )}
      {!searchInSearchInfo?.inAgain && (
        <p
          className="ttl_txt"
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              '<strong class="search_keyword">‘{value}’</strong>에 대한 검색결과가 없습니다.',
              '통검-요약정보-결과없음',
              { value: queryId }
            ),
          }}
        />
      )}

      <div className="result_nodata">
        <p>
          <PolyglotText
            id="통검-요약정보-결과없음안내1"
            defaultString="검색어의 철자가 정확한지 확인해 보세요."
          />
        </p>
        <p>
          <PolyglotText
            id="통검-요약정보-결과없음안내2"
            defaultString="검색어의 단어 수를 줄이거나, 더욱 일반적인 단어로 검색해 보세요."
          />
        </p>
        <p>
          <PolyglotText
            id="통검-요약정보-결과없음안내3"
            defaultString="키워드에 있는 특수문자를 뺀 후에 검색해 보세요."
          />
        </p>
        <p>
          <PolyglotText
            id="통검-요약정보-결과없음안내4"
            defaultString="검색 옵션을 변경한 후 다시 검색해 보세요."
          />
        </p>
      </div>
    </>
  );
}
