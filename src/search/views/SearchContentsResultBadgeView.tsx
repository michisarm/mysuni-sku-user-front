import BadgeStyle from 'certification/ui/model/BadgeStyle';
import BadgeSize from 'certification/ui/model/BadgeSize';
import BadgeView from 'certification/ui/view/BadgeView';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SearchParam } from 'search/search.models';
import { getQueryId, getTitleHtmlSearchKeyword } from 'search/search.events';
import { useSearchBadgeList } from 'search/search.services';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';

export function SearchContentsResultBadgeView() {
  //
  const [badgeLimit, setBadgeLimit] = useState<Number>(3);

  const params = useParams<SearchParam>();
  const queryId = getQueryId();

  const badges = useSearchBadgeList();
  console.log('badge', badges);
  return (
    <>
      <div className="result">
        <div className="result_title">
          <strong>Badge (4)</strong>
          {(params === undefined || params.searchType === undefined) && (
            <Link to={`/search/badge?query=${queryId}`} className="link_more">
              + 더보기
            </Link>
          )}
        </div>

        <div className="result_contents">
          <div className="badge-list-type">
            <ul>
              {badges?.map((badge, index) => {
                if (index < badgeLimit) {
                  return (
                    <li>
                      <a
                        href={`/certification/badge/badge-detail/${badge.id}`}
                        className="badge-box"
                      >
                        <BadgeView
                          id={badge.id}
                          name={parsePolyglotString(
                            badge.name,
                            getDefaultLang(badge.langSupport)
                          )}
                          level={badge.level}
                          iconUrl={badge.iconUrl}
                          categoryId={badge.categoryId}
                          badgeStyle={BadgeStyle.List}
                          badgeSize={BadgeSize.Small}
                        />
                      </a>
                      {/*뱃지 네임은 뱃지목록에서만 노출*/}
                      <div className="badge-name">
                        {/* <span>{badgeTitle}</span> */}
                        <span
                          dangerouslySetInnerHTML={{
                            __html: getTitleHtmlSearchKeyword(
                              parsePolyglotString(
                                badge.name,
                                getDefaultLang(badge.langSupport)
                              )
                            ),
                          }}
                        />
                        <p>
                          {parsePolyglotString(
                            badge.description,
                            getDefaultLang(badge.langSupport)
                          )}
                        </p>
                      </div>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
