import { getDefaultLang } from 'lecture/model/LangSupport';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getQueryId,
  getTagsHtml,
  getTitleHtmlSearchKeyword,
} from 'search/search.events';
import { SearchParam } from 'search/search.models';
import { useDisplayCard } from 'search/search.services';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

export function SearchContentsResultLectureView() {
  //
  const [lectureLimit, setLectureLimit] = useState<Number>(5);

  const params = useParams<SearchParam>();
  const queryId = getQueryId();

  useEffect(() => {
    if (params && params.searchType === 'lecture') {
      setLectureLimit(999);
    }
  }, [params]);

  const cards = useDisplayCard();
  console.log('cards', cards);

  return (
    <>
      <div className="result">
        <div className="result_title">
          <strong>과정 ({(cards && cards.length) || 0})</strong>
          {(params === undefined || params.searchType === undefined) && (
            <Link to={`/search/lecture?query=${queryId}`} className="link_more">
              + 더보기
            </Link>
          )}
        </div>

        {cards?.map((card, index) => {
          if (index < lectureLimit) {
            return (
              <div className="result_contents">
                <div className="sortbox">
                  <span>
                    {parsePolyglotString(
                      JSON.parse(JSON.parse(card.categories)[0].collegeName),
                      getDefaultLang(card.langSupport)
                    )}
                  </span>
                  <span>
                    {parsePolyglotString(
                      JSON.parse(JSON.parse(card.categories)[0].channelName),
                      getDefaultLang(card.langSupport)
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
                            getDefaultLang(card.langSupport)
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
                          getDefaultLang(card.langSupport)
                        )
                      ),
                    }}
                  />
                </div>
                {parsePolyglotString(
                  JSON.parse(card.tags),
                  getDefaultLang(card.langSupport)
                ) !== null && (
                  <div className="tagbox">
                    <strong>태그</strong>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: getTagsHtml(
                          parsePolyglotString(
                            JSON.parse(card.tags),
                            getDefaultLang(card.langSupport)
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
      </div>
    </>
  );
}
