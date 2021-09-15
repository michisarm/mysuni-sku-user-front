import { reactAlert } from '@nara.platform/accent';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { getQueryId, searchData, initSearchData } from './search.events';
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
import { Area } from 'tracker/model';

export function SearchContentsPage() {
  //
  const params = useParams<SearchParam>();

  const queryId = getQueryId();
  useEffect(() => {
    initSearchData();

    const decodedSearchValue = queryId
      .replace(/'/g, ' ')
      .replace(/&/g, ' ')
      .replace(/%/g, ' ');
    if (decodedSearchValue === '') {
      return;
    }
    if (decodedSearchValue.replace(/ /g, '').length < 2) {
      reactAlert({
        title: getPolyglotText('검색', '통검-필레팝얼-검색2'),
        message: getPolyglotText(
          '두 글자 이상 입력 후 검색하셔야 합니다.',
          '통검-필레팝얼-두글자2'
        ),
      });
      return;
    }
    searchData(queryId);
  }, [queryId]);

  const cards = useDisplayCard();
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
      <>
        {searchInSearchInfo?.checkSearchInSearch && (
          <p
            className="ttl_txt"
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                '{value} 중 <strong class="search_keyword">{value2}</strong>에 대한 검색결과는 총 <strong>{value3}건</strong> 입니다.',
                '통검-요약정보-결과내검색타이틀',
                {
                  value: searchInSearchInfo.parentSearchValue,
                  value2: searchInSearchInfo.searchValue,
                  value3: totalCount.toString(),
                }
              ),
            }}
          />
        )}
        {!searchInSearchInfo?.checkSearchInSearch && (
          <p
            className="ttl_txt"
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                '<strong class="search_keyword">{value}</strong>에 대한 검색결과는 총 <strong>{value2}건</strong>입니다.',
                '통검-요약정보-타이틀2',
                {
                  value: queryId,
                  value2: totalCount.toString(),
                }
              ),
            }}
          />
        )}
      </>
    );
  };

  return (
    <>
      <div className="tab_search_contents" data-area={Area.SEARCH}>
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
