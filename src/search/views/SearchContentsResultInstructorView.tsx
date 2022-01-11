import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getQueryId,
  getTitleHtmlSearchKeyword,
} from '../../search/search.events';
import { SearchParam } from '../../search/search.models';
import { getExpert } from '../../search/search.services';
import Image from '../../shared/components/Image';
import { PolyglotText } from '../../shared/ui/logic/PolyglotText';
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
  return (
    <>
      <div className="result">
        <div className="result_title">
          <strong>
            <PolyglotText id="통검-전학강-강사" defaultString="강사" /> (
            {experts?.length || 0})
          </strong>
          {(params === undefined || params.searchType === undefined) && (
            <Link
              to={`/search/instructor?query=${queryId}`}
              className="link_more"
            >
              + <PolyglotText id="통검-필레팝-더보기" defaultString="더보기" />
            </Link>
          )}
        </div>

        {experts?.map((expert, index) => {
          if (index < expertLimit) {
            return (
              <div
                className="result_contents w50"
                key={`result_expert_${index}`}
              >
                <div className="teacherbox">
                  <Link
                    to={`/expert/instructor/${expert.id}/Introduce`}
                    className="flex"
                  >
                    <Image
                      src={
                        expert.photo_id === ''
                          ? profileImg
                          : expert.photo_id.startsWith('http')
                          ? expert.photo_id
                          : `https://image.mysuni.sk.com/suni-asset${expert.photo_id}`
                      }
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
                    <dt>
                      <PolyglotText
                        id="통검-강사소개-소속기관"
                        defaultString="소속 기관"
                      />
                    </dt>
                    <dd
                      className="ellipsis"
                      dangerouslySetInnerHTML={{
                        __html: getTitleHtmlSearchKeyword(expert.department),
                      }}
                    />
                    <dt>
                      <PolyglotText
                        id="통검-강사소개-강의분야"
                        defaultString="강의 분야"
                      />
                    </dt>
                    <dd
                      className="ellipsis"
                      dangerouslySetInnerHTML={{
                        __html: getTitleHtmlSearchKeyword(expert.introduction),
                      }}
                    />
                    <dt>
                      <PolyglotText
                        id="통검-강사소개-주요경력"
                        defaultString="주요 경력"
                      />
                    </dt>
                    <dd
                      className="ellipsis"
                      dangerouslySetInnerHTML={{
                        __html: getTitleHtmlSearchKeyword(expert.career),
                      }}
                    />
                  </dl>
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}
