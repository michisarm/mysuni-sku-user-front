import { reactAlert } from '@nara.platform/accent';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  getQueryId,
  initSearchData,
  search,
  searchDataWithErrata,
} from './search.events';
import { SearchParam } from './search.models';
import {
  useDisplayCard,
  useExpert,
  useSearchBadgeList,
  useSearchCommunityList,
  useSearchRelatedList,
} from './search.services';
import { SearchContentsResultBadgeView } from './views/SearchContentsResultBadgeView';
import { SearchContentsResultCommunityView } from './views/SearchContentsResultCommunityView';
import { SearchContentsResultInstructorView } from './views/SearchContentsResultInstructorView';
import { SearchContentsResultLectureView } from './views/SearchContentsResultLectureView';
import { SearchContentsResultSideView } from './views/SearchContentsResultSideView';
import { SearchNoDataView } from './views/SearchNoDataView';
import { Area } from 'tracker/model';
import SearchInfoModel from './model/SeachInfoModel';
import { Button } from 'semantic-ui-react';

interface Props {
  onSearch: (value: string, withOriginal?: boolean) => void;
  searchInfo: SearchInfoModel;
}

export function SearchContentsPage(props: Props) {
  //
  const { onSearch, searchInfo } = props;

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
    search(queryId);
    // searchDataWithErrata(queryId);
  }, [queryId]);

  const cards = useDisplayCard();
  const badges = useSearchBadgeList();
  const communities = useSearchCommunityList();
  const experts = useExpert();
  let totalCount =
    (cards?.length || 0) +
    (badges?.length || 0) +
    (communities?.length || 0) +
    (experts?.length || 0);
  if (params !== undefined) {
    if (params.searchType === 'lecture') {
      totalCount = cards?.length || 0;
    } else if (params.searchType === 'badge') {
      totalCount = badges?.length || 0;
    } else if (params.searchType === 'community') {
      totalCount = communities?.length || 0;
    } else if (params.searchType === 'instructor') {
      totalCount = experts?.length || 0;
    }
  }

  const HeaderTotalCountTitle = () => {
    const relatedList = useSearchRelatedList();

    return (
      <>
        {searchInfo.inAgain && (
          <p
            className="ttl_txt"
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                '{value} 중 <strong class="search_keyword">{value2}</strong>에 대한 검색결과는 총 <strong>{value3}건</strong> 입니다.',
                '통검-요약정보-결과내검색타이틀',
                {
                  value: searchInfo.recentSearchValue,
                  value2: searchInfo.errataValue || searchInfo.searchValue,
                  value3: totalCount.toString(),
                }
              ),
            }}
          />
        )}
        {!searchInfo.inAgain && (
          <p
            className="ttl_txt"
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                '<strong class="search_keyword">{value}</strong>에 대한 검색결과는 총 <strong>{value2}건</strong>입니다.',
                '통검-요약정보-타이틀2',
                {
                  value:
                    (searchInfo.errataValue && searchInfo.errataValue) ||
                    searchInfo.searchValue,
                  value2: totalCount.toString(),
                }
              ),
            }}
          />
        )}
        {(searchInfo.errataValue && (
          <div className="suggest_wrap">
            <Button
              className="b_suggest"
              onClick={() => onSearch(searchInfo.searchValue || queryId, true)}
            >
              <div
                className="tt"
                dangerouslySetInnerHTML={{
                  __html: getPolyglotText(
                    `${searchInfo.searchValue || queryId} 검색결과 보기.`,
                    'result-list-suggest',
                    {
                      searchValue: searchInfo.searchValue || queryId,
                    }
                  ),
                }}
              />
            </Button>
          </div>
        )) ||
          null}
        {relatedList && relatedList.length > 0 && (
          <div className="relative_box">
            <dl>
              <dt>
                <strong>
                  <PolyglotText
                    id="통검-필레팝-연관검색어"
                    defaultString="연관 검색어"
                  />
                </strong>
              </dt>
              <dd>
                <ul>
                  {relatedList.map((related: string, index) => (
                    <li key={`related_${index}`}>
                      <a
                        href="javascript:void(0);"
                        onClick={() => {
                          onSearch(related);
                        }}
                      >
                        {related}
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
          </div>
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
