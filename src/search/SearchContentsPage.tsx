import React from 'react';
import { useParams } from 'react-router-dom';
import { getQueryId } from './search.events';
import { SearchParam } from './search.models';
import { SearchContentsResultBadgeView } from './views/SearchContentsResultBadgeView';
import { SearchContentsResultCommunityView } from './views/SearchContentsResultCommunityView';
import { SearchContentsResultInstructorView } from './views/SearchContentsResultInstructorView';
import { SearchContentsResultLectureView } from './views/SearchContentsResultLectureView';
import { SearchContentsResultSideView } from './views/SearchContentsResultSideView';

export function SearchContentsPage() {
  //
  const params = useParams<SearchParam>();

  const queryId = getQueryId();

  return (
    <>
      <div className="tab_search_contents">
        <SearchContentsResultSideView />

        <div className="result_list rContents">
          <div className="inner">
            {/* NoData */}
            {/*<p className="ttl_txt">
              <strong className="search_keyword">‘{queryId}’</strong>에 대한
              검색결과가 없습니다.
            </p>

            <div className="result_nodata">
              <p>검색어의 철자가 정확한지 확인해 보세요.</p>
              <p>
                검색어의 단어 수를 줄이거나, 더욱 일반적인 단어로 검색해 보세요.
              </p>
              <p>키워드에 있는 특수문자를 뺀 후에 검색해 보세요.</p>
              <p>검색 옵션을 변경한 후 다시 검색해 보세요.</p>
            </div>
            */}
            
            <p className="ttl_txt">
              <strong className="search_keyword">{queryId}</strong>에 대한
              검색결과는 총 <strong>39건</strong>입니다.
            </p>

            {params && params.searchType === 'lecture' && (
              <SearchContentsResultLectureView />
            )}
            {params && params.searchType === 'badge' && (
              <SearchContentsResultBadgeView />
            )}
            {params && params.searchType === 'community' && (
              <SearchContentsResultCommunityView />
            )}
            {params && params.searchType === 'instructor' && (
              <SearchContentsResultInstructorView />
            )}

            {(params === undefined || params.searchType === undefined) && (
              <>
                <SearchContentsResultLectureView />
                <SearchContentsResultBadgeView />
                <SearchContentsResultCommunityView />
                <SearchContentsResultInstructorView />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
