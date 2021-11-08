import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import BadgeSize from '../../certification/ui/model/BadgeSize';
import BadgeStyle from '../../certification/ui/model/BadgeStyle';
import BadgeView from '../../certification/ui/view/BadgeView';
import { getDefaultLang } from '../../lecture/model/LangSupport';
import {
  getQueryId,
  getTitleHtmlSearchKeyword,
} from '../../search/search.events';
import { SearchParam } from '../../search/search.models';
import { getSearchBadgeList } from '../../search/search.services';
import { parsePolyglotString } from '../../shared/viewmodel/PolyglotString';

export function SearchContentsResultBadgeView() {
  //
  const [badgeLimit, setBadgeLimit] = useState<Number>(3);

  const params = useParams<SearchParam>();
  const queryId = getQueryId();

  useEffect(() => {
    if (params && params.searchType === 'badge') {
      setBadgeLimit(999);
    }
  }, [params]);

  const badges = getSearchBadgeList();
  return (
    <>
      <div className="result">
        <div className="result_title">
          <strong>
            <PolyglotText id="통검-필레팝-뱃지" defaultString="Badge" /> (
            {(badges && badges.length) || 0})
          </strong>
          {(params === undefined || params.searchType === undefined) && (
            <Link to={`/search/badge?query=${queryId}`} className="link_more">
              + <PolyglotText id="통검-필레팝-더보기" defaultString="더보기" />
            </Link>
          )}
        </div>

        <div className="result_contents">
          <div className="badge-list-type">
            <ul>
              {badges?.map((badge, index) => {
                if (index < badgeLimit) {
                  return (
                    <li key={`result_badge_${index}`}>
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
                        {/*<p>
                          {getTextFromHtml(
                            parsePolyglotString(
                              badge.description,
                              getDefaultLang(badge.langSupport)
                            )
                          )}
                            </p>*/}
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
