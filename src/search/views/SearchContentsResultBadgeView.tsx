import BadgeStyle from 'certification/ui/model/BadgeStyle';
import BadgeSize from 'certification/ui/model/BadgeSize';
import BadgeView from 'certification/ui/view/BadgeView';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { SearchParam } from 'search/search.models';
import { getQueryId } from 'search/search.events';

export function SearchContentsResultBadgeView() {
  //
  const params = useParams<SearchParam>();
  const queryId = getQueryId();

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
              <li>
                <a
                  href="/certification/badge/badge-detail/BADGE-4b"
                  className="badge-box"
                >
                  {/*<BadgeView
                  id={badge.id}
                  name={parsePolyglotString(
                    badge.name,
                    getDefaultLang(badge.langSupport)
                  )}
                  level={badge.level}
                  iconUrl={badge.iconUrl}
                  categoryId={categoryId}
                  badgeStyle={BadgeStyle.List}
                  badgeSize={BadgeSize.Small}
                  />*/}
                  <BadgeView
                    id="BADGE-5q"
                    name="ZH BADGE"
                    level="Level1"
                    iconUrl="/badge/20210812/61151714ec10fe0001998260.png"
                    categoryId="BDGCAT_BIZ"
                    badgeStyle={BadgeStyle.List}
                    badgeSize={BadgeSize.Small}
                  />
                </a>
                {/*뱃지 네임은 뱃지목록에서만 노출*/}
                <div className="badge-name">
                  {/* <span>{badgeTitle}</span> */}
                  <span>
                    반도체 <strong className="search_keyword">Data</strong>{' '}
                    Essential
                  </span>
                  <p>[시각화 자료] Tableau Basic (태블로 베이직)</p>
                </div>
              </li>
              <li>
                <a
                  href="/certification/badge/badge-detail/BADGE-4a"
                  className="badge-box"
                >
                  {/*<BadgeView
                  id={badge.id}
                  name={parsePolyglotString(
                    badge.name,
                    getDefaultLang(badge.langSupport)
                  )}
                  level={badge.level}
                  iconUrl={badge.iconUrl}
                  categoryId={categoryId}
                  badgeStyle={BadgeStyle.List}
                  badgeSize={BadgeSize.Small}
                  />*/}
                  <BadgeView
                    id="BADGE-5q"
                    name="ZH BADGE"
                    level="Level1"
                    iconUrl="/badge/20210812/61151714ec10fe0001998260.png"
                    categoryId="BDGCAT_BIZ"
                    badgeStyle={BadgeStyle.List}
                    badgeSize={BadgeSize.Small}
                  />
                </a>
                {/*뱃지 네임은 뱃지목록에서만 노출*/}
                <div className="badge-name">
                  {/* <span>{badgeTitle}</span> */}
                  <span>
                    반도체 <strong className="search_keyword">Data</strong>{' '}
                    Essential
                  </span>
                  <p>[시각화 자료] Tableau Basic (태블로 베이직)</p>
                </div>
              </li>
              <li>
                <a
                  href="/certification/badge/badge-detail/BADGE-4b"
                  className="badge-box"
                >
                  {/*<BadgeView
                  id={badge.id}
                  name={parsePolyglotString(
                    badge.name,
                    getDefaultLang(badge.langSupport)
                  )}
                  level={badge.level}
                  iconUrl={badge.iconUrl}
                  categoryId={categoryId}
                  badgeStyle={BadgeStyle.List}
                  badgeSize={BadgeSize.Small}
                  />*/}
                  <BadgeView
                    id="BADGE-5q"
                    name="ZH BADGE"
                    level="Level1"
                    iconUrl="/badge/20210812/61151714ec10fe0001998260.png"
                    categoryId="BDGCAT_BIZ"
                    badgeStyle={BadgeStyle.List}
                    badgeSize={BadgeSize.Small}
                  />
                  {/*뱃지 네임은 뱃지목록에서만 노출*/}
                  <div className="badge-name">
                    {/* <span>{badgeTitle}</span> */}
                    <span>
                      반도체 <strong className="search_keyword">Data</strong>{' '}
                      Essential
                    </span>
                    <p>[시각화 자료] Tableau Basic (태블로 베이직)</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
