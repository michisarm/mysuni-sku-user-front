import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import {
  getQueryId,
  getTitleHtmlSearchKeyword,
} from '../../search/search.events';
import { SearchParam } from '../../search/search.models';
import { getSearchCommunityList } from '../../search/search.services';

export function SearchContentsResultCommunityView() {
  //
  const [communityLimit, setCommunityLimit] = useState<Number>(3);

  const params = useParams<SearchParam>();
  const queryId = getQueryId();

  useEffect(() => {
    if (params && params.searchType === 'community') {
      setCommunityLimit(999);
    }
  }, [params]);

  const communities = getSearchCommunityList();
  return (
    <>
      <div className="result">
        <div className="result_title">
          <strong>
            <PolyglotText id="cmm-prfr-커뮤" defaultString="Community" /> (
            {(communities && communities.length) || 0})
          </strong>
          {(params === undefined || params.searchType === undefined) && (
            <Link
              to={`/search/community?query=${queryId}`}
              className="link_more"
            >
              + <PolyglotText id="통검-필레팝-더보기" defaultString="더보기" />
            </Link>
          )}
        </div>

        {communities?.map((community, index) => {
          if (index < communityLimit) {
            return (
              <div
                className="result_contents"
                key={`result_community_${index}`}
              >
                <div className="search_title">
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      window.open(
                        `${window.location.origin}/suni-community/community/${community.communityId}`,
                        '_blank'
                      );
                    }}
                    dangerouslySetInnerHTML={{
                      __html: getTitleHtmlSearchKeyword(community.name),
                    }}
                  />
                  <p
                    className="search_detail"
                    dangerouslySetInnerHTML={{
                      __html: getTitleHtmlSearchKeyword(community.description),
                    }}
                  />
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}
