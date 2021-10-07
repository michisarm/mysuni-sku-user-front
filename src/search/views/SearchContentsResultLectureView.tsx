import { getDefaultLang } from '../../lecture/model/LangSupport';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getQueryId,
  getTagsHtml,
  getTitleHtmlSearchKeyword,
} from '../../search/search.events';
import { SearchCard, SearchParam } from '../../search/search.models';
import { getDisplayCard } from '../../search/search.services';
import { parsePolyglotString } from '../../shared/viewmodel/PolyglotString';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import { Pagination, PaginationProps } from 'semantic-ui-react';

export function SearchContentsResultLectureView() {
  //
  const [lectureLimit, setLectureLimit] = useState<Number>(5);
  const [pageNo, setPageNo] = useState<string>('1');
  const [pagingCards, setPagingCards] = useState<SearchCard[]>([]);
  const pageLimit = 10;

  const params = useParams<SearchParam>();
  const queryId = getQueryId();

  const cards = getDisplayCard();

  useEffect(() => {
    setPagingCards(cards?.slice(0, pageLimit) || []);
    if (params && params.searchType === 'lecture') {
      setLectureLimit(999);
    }
  }, [params, cards]);

  const onChangePage = useCallback(
    (_: React.MouseEvent, data: PaginationProps) => {
      const currentPageNo = String(pageNo);
      const nextPageNo = String(data.activePage || 1);

      setPageNo(nextPageNo);
      setPagingCards(
        cards?.slice(
          (Number(nextPageNo) - 1) * pageLimit,
          (Number(nextPageNo) - 1) * pageLimit + pageLimit
        ) || []
      );
    },
    [cards]
  );

  const getTotalPage = useCallback((totalCount: number, limit: number) => {
    let totalPageCount = Math.ceil(totalCount / limit);
    if (totalCount % limit < 0) {
      totalPageCount++;
    }

    return totalPageCount;
  }, []);

  return (
    <>
      <div className="result">
        <div className="result_title">
          <strong>
            <PolyglotText id="통검-요약정보-과정탭" defaultString="과정" /> (
            {(cards && cards.length) || 0})
          </strong>
          {(params === undefined || params.searchType === undefined) && (
            <Link to={`/search/lecture?query=${queryId}`} className="link_more">
              +
              <PolyglotText id="통검-필레팝-더보기" defaultString="더보기" />
            </Link>
          )}
        </div>

        {pagingCards?.map((card, index) => {
          if (index < lectureLimit) {
            return (
              <div className="result_contents" key={`result_card_${index}`}>
                <div className="sortbox">
                  <span>
                    {parsePolyglotString(
                      JSON.parse(JSON.parse(card.categories)[0].collegeName),
                      getDefaultLang(JSON.parse(card.lang_supports))
                    )}
                  </span>
                  <span>
                    {parsePolyglotString(
                      JSON.parse(JSON.parse(card.categories)[0].channelName),
                      getDefaultLang(JSON.parse(card.lang_supports))
                    )}
                  </span>
                </div>
                <div className="search_title">
                  <Link to={`/lecture/card/${card.id}/view`}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: getTitleHtmlSearchKeyword(
                          parsePolyglotString(
                            JSON.parse(card.name),
                            getDefaultLang(JSON.parse(card.lang_supports))
                          )
                        ),
                      }}
                    />
                  </Link>
                  <p
                    className="search_detail"
                    dangerouslySetInnerHTML={{
                      __html: getTitleHtmlSearchKeyword(
                        parsePolyglotString(
                          JSON.parse(card.simple_description),
                          getDefaultLang(JSON.parse(card.lang_supports))
                        )
                      ),
                    }}
                  />
                </div>
                {parsePolyglotString(
                  JSON.parse(card.tags),
                  getDefaultLang(JSON.parse(card.lang_supports))
                ) !== '' && (
                  <div className="tagbox">
                    <strong>
                      <PolyglotText
                        id="Course-Contents-태그"
                        defaultString="태그"
                      />
                    </strong>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: getTagsHtml(
                          parsePolyglotString(
                            JSON.parse(card.tags),
                            getDefaultLang(JSON.parse(card.lang_supports))
                          )
                        ),
                      }}
                    />
                  </div>
                )}
              </div>
            );
          }
        })}
        {(cards?.length || 0) > 10 && lectureLimit > 5 && (
          <div className="lms-paging-holder">
            <Pagination
              activePage={pageNo}
              totalPages={getTotalPage(cards?.length || 0, 10)}
              firstItem={null}
              lastItem={null}
              onPageChange={onChangePage}
            />
          </div>
        )}
      </div>
    </>
  );
}
