import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getQueryId, getTitleHtmlSearchKeyword } from 'search/search.events';
import { SearchParam } from 'search/search.models';
import { getExpert } from 'search/search.services';
import Image from 'shared/components/Image';
import profileImg from 'style/../../public/images/all/img-profile-56-px.png';

export function SearchContentsResultInstructorView() {
  //
  const [expertLimit, setExpertLimit] = useState<Number>(6);

  const params = useParams<SearchParam>();
  const queryId = getQueryId();

  const PUBLIC_URL = process.env.PUBLIC_URL;

  useEffect(() => {
    if (params && params.searchType === 'instructor') {
      setExpertLimit(999);
    }
  }, [params]);

  const experts = getExpert();
  console.log('experts', experts);

  return (
    <>
      <div className="result">
        <div className="result_title">
          <strong>강사 ({experts?.length || 0})</strong>
          {(params === undefined || params.searchType === undefined) && (
            <Link
              to={`/search/instructor?query=${queryId}`}
              className="link_more"
            >
              + 더보기
            </Link>
          )}
        </div>

        {experts?.map((expert, index) => {
          if (index < expertLimit) {
            return (
              <>
                {/* 컨텐츠 */}
                <div className="result_contents w50">
                  <div className="teacherbox">
                    <Link
                      to={`/expert/instructor/${expert.id}/Introduce`}
                      className="flex"
                    >
                      <Image
                        src={expert.photo_id || profileImg}
                        alt="강사이미지"
                        className="t_thumb"
                      />
                      <div className="t_name">
                        <strong
                          className="ellipsis"
                          dangerouslySetInnerHTML={{
                            __html: getTitleHtmlSearchKeyword(expert.name),
                          }}
                        />
                        <span
                          className="ellipsis"
                          dangerouslySetInnerHTML={{
                            __html: getTitleHtmlSearchKeyword(expert.position),
                          }}
                        />
                      </div>
                    </Link>
                    <dl className="search_detail flex">
                      <dt>소속 기관</dt>
                      <dd
                        className="ellipsis"
                        dangerouslySetInnerHTML={{
                          __html: getTitleHtmlSearchKeyword(expert.department),
                        }}
                      />
                      <dt>강의 분야</dt>
                      <dd
                        className="ellipsis"
                        dangerouslySetInnerHTML={{
                          __html: getTitleHtmlSearchKeyword(
                            expert.lectureField
                          ),
                        }}
                      />
                      <dt>주요 경력</dt>
                      <dd
                        className="ellipsis"
                        dangerouslySetInnerHTML={{
                          __html: getTitleHtmlSearchKeyword(expert.career),
                        }}
                      />
                    </dl>
                  </div>
                </div>
              </>
            );
          }
        })}
      </div>
    </>
  );
}
