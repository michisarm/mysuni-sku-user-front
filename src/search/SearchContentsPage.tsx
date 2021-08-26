import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQueryId, search, searchData } from './search.events';
import { SearchParam } from './search.models';
import {
  getSearchInSearchInfo,
  useDisplayCard,
  useExpert,
  useSearchBadgeList,
  useSearchCommunityList,
} from './search.services';
import { SearchContentsResultBadgeView } from './views/SearchContentsResultBadgeView';
import { SearchContentsResultCommunityView } from './views/SearchContentsResultCommunityView';
import { SearchContentsResultInstructorView } from './views/SearchContentsResultInstructorView';
import { SearchContentsResultLectureView } from './views/SearchContentsResultLectureView';
import { SearchContentsResultSideView } from './views/SearchContentsResultSideView';
import { SearchNoDataView } from './views/SearchNoDataView';

export function SearchContentsPage() {
  //
  const params = useParams<SearchParam>();

  const queryId = getQueryId();
  useEffect(() => {
    searchData(queryId);
  }, [queryId]);

  const cards = useDisplayCard();
  console.log('displayCards', cards);
  const badges = useSearchBadgeList();
  const communities = useSearchCommunityList();
  const experts = useExpert();
  const totalCount =
    (cards?.length || 0) +
    (badges?.length || 0) +
    (communities?.length || 0) +
    (experts?.length || 0);

  const HeaderTotalCountTitle = () => {
    const searchInSearchInfo = getSearchInSearchInfo();

    return (
      <p className="ttl_txt">
        {searchInSearchInfo?.checkSearchInSearch && (
          <>
            {searchInSearchInfo.parentSearchValue} 중{' '}
            <strong className="search_keyword">
              {searchInSearchInfo.searchValue}
            </strong>
            에 대한 검색결과는 총 <strong>{totalCount}건</strong>
            입니다.
          </>
        )}
        {!searchInSearchInfo?.checkSearchInSearch && (
          <>
            <strong className="search_keyword">{queryId}</strong>에 대한
            검색결과는 총 <strong>{totalCount}건</strong>
            입니다.
          </>
        )}
      </p>
    );
  };

  return (
    <>
      <div className="tab_search_contents">
        <SearchContentsResultSideView />

        <div className="result_list rContents">
          <div className="inner">
            {totalCount < 1 && <SearchNoDataView />}

            {totalCount >= 1 && (
              <>
                {params && params.searchType === 'lecture' && (
                  <>
                    {(cards?.length || 0) < 1 && <SearchNoDataView />}
                    {(cards?.length || 0) >= 1 && (
                      <>
                        <HeaderTotalCountTitle />
                        <SearchContentsResultLectureView />
                      </>
                    )}
                  </>
                )}
                {params && params.searchType === 'badge' && (
                  <>
                    {(badges?.length || 0) < 1 && <SearchNoDataView />}
                    {(badges?.length || 0) >= 1 && (
                      <>
                        <HeaderTotalCountTitle />
                        <SearchContentsResultBadgeView />
                      </>
                    )}
                  </>
                )}
                {params && params.searchType === 'community' && (
                  <>
                    {(communities?.length || 0) < 1 && <SearchNoDataView />}
                    {(communities?.length || 0) >= 1 && (
                      <>
                        <HeaderTotalCountTitle />
                        <SearchContentsResultCommunityView />
                      </>
                    )}
                  </>
                )}
                {params && params.searchType === 'instructor' && (
                  <>
                    {(experts?.length || 0) < 1 && <SearchNoDataView />}
                    {(experts?.length || 0) >= 1 && (
                      <>
                        <HeaderTotalCountTitle />
                        <SearchContentsResultInstructorView />
                      </>
                    )}
                  </>
                )}

                {(params === undefined || params.searchType === undefined) && (
                  <>
                    <HeaderTotalCountTitle />
                    {(cards?.length || 0) >= 1 && (
                      <SearchContentsResultLectureView />
                    )}
                    {(badges?.length || 0) >= 1 && (
                      <SearchContentsResultBadgeView />
                    )}
                    {(communities?.length || 0) >= 1 && (
                      <SearchContentsResultCommunityView />
                    )}
                    {(experts?.length || 0) >= 1 && (
                      <SearchContentsResultInstructorView />
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
