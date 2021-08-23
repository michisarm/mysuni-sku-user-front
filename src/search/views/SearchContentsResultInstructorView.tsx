import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getQueryId } from 'search/search.events';
import { SearchParam } from 'search/search.models';
import { useExpert } from 'search/search.services';
import { Image } from 'semantic-ui-react';

export function SearchContentsResultInstructorView() {
  //
  const params = useParams<SearchParam>();
  const queryId = getQueryId();

  const PUBLIC_URL = process.env.PUBLIC_URL;

  const expert = useExpert();
  console.log('expert', expert);

  return (
    <>
      <div className="result">
        <div className="result_title">
          <strong>강사 (12)</strong>
          {(params === undefined || params.searchType === undefined) && (
            <Link
              to={`/search/instructor?query=${queryId}`}
              className="link_more"
            >
              + 더보기
            </Link>
          )}
        </div>

        {/* 컨텐츠 */}
        <div className="result_contents w50">
          <div className="teacherbox">
            <Link to="/expert/instructor/IS-007Z/Introduce" className="flex">
              <Image
                src={`${PUBLIC_URL}/images/all/profile-110-px-sample-2@3x.png`}
                className="t_thumb"
                alt="강사이미지"
              />
              <div className="t_name">
                <strong className="ellipsis">최선희</strong>
                <span className="ellipsis">대표</span>
              </div>
            </Link>
            <dl className="search_detail flex">
              <dt>소속 기관</dt>
              <dd className="ellipsis">헬로 데이터 마케팅 코리아 </dd>
              <dt>강의 분야</dt>
              <dd className="ellipsis">
                <strong className="search_keyword">데이터</strong> 사이언스
              </dd>
              <dt>주요 경력</dt>
              <dd className="ellipsis">-</dd>
            </dl>
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="result_contents w50">
          <div className="teacherbox">
            <Link to="/expert/instructor/IS-0098/Introduce" className="flex">
              <Image
                src={`${PUBLIC_URL}/images/all/profile-110-px-sample-2@3x.png`}
                className="t_thumb"
                alt="강사이미지"
              />
              <div className="t_name">
                <strong className="ellipsis">
                  송<strong className="search_keyword">데이터</strong>
                </strong>
                <span className="ellipsis">명예교수</span>
              </div>
            </Link>
            <dl className="search_detail flex">
              <dt>소속 기관</dt>
              <dd className="ellipsis">
                서울대학교 경영대학원 서울대학교 경영대학원서울대학교 경영대학원
              </dd>
              <dt>강의 분야</dt>
              <dd className="ellipsis">
                마케팅, 고객관계관리(CRM), 빅{' '}
                <strong className="search_keyword">데이터</strong>혁신 사업본부
                마케팅, 고객관계관리(CRM), 빅
              </dd>
              <dt>주요 경력</dt>
              <dd className="ellipsis">
                서울대학교 경영대학원 학장 입니다 그외 다수 다른 경력들도
                있습니다. 자세한 내용은 링크 이동 해주세요.
              </dd>
            </dl>
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="result_contents w50">
          <div className="teacherbox">
            <Link to="/" className="flex">
              <Image
                src={`${PUBLIC_URL}/images/all/profile-110-px-sample-2@3x.png`}
                className="t_thumb"
                alt="강사이미지"
              />
              <div className="t_name">
                <strong className="ellipsis">
                  ChoiSunHee Sheis SunHee choi
                </strong>
                <span className="ellipsis">명예교수</span>
              </div>
            </Link>
            <dl className="search_detail flex">
              <dt>소속 기관</dt>
              <dd className="ellipsis">
                서울대학교 경영대학원 서울대학교 경영대학원서울대학교 경영대학원
              </dd>
              <dt>강의 분야</dt>
              <dd className="ellipsis">
                마케팅, 고객관계관리(CRM), 빅{' '}
                <strong className="search_keyword">데이터</strong> 혁신 사업본부
                마케팅, 고객관계관리(CRM), 빅
              </dd>
              <dt>주요 경력</dt>
              <dd className="ellipsis">
                서울대학교 경영대학원 학장 입니다 그외 다수 다른 경력들도
                있습니다. 자세한 내용은 링크 이동 해주세요.
              </dd>
            </dl>
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="result_contents w50">
          <div className="teacherbox">
            <Link to="/" className="flex">
              <Image
                src={`${PUBLIC_URL}/images/all/profile-110-px-sample-2@3x.png`}
                className="t_thumb"
                alt="강사이미지"
              />
              <div className="t_name">
                <strong className="ellipsis">
                  최<strong className="search_keyword">데이터</strong>선희최선희
                </strong>
                <span className="ellipsis">명예교수</span>
              </div>
            </Link>
            <dl className="search_detail flex">
              <dt>소속 기관</dt>
              <dd className="ellipsis">
                서울대학교 경영대학원 서울대학교 경영대학원서울대학교 경영대학원
              </dd>
              <dt>강의 분야</dt>
              <dd className="ellipsis">
                마케팅, 고객관계관리(CRM), 빅{' '}
                <strong className="search_keyword">데이터</strong> 혁신 사업본부
                마케팅, 고객관계관리(CRM), 빅
              </dd>
              <dt>주요 경력</dt>
              <dd className="ellipsis">
                서울대학교 경영대학원 학장 입니다 그외 다수 다른 경력들도
                있습니다. 자세한 내용은 링크 이동 해주세요.
              </dd>
            </dl>
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="result_contents w50">
          <div className="teacherbox">
            <Link to="/" className="flex">
              <Image
                src={`${PUBLIC_URL}/images/all/profile-110-px-sample-2@3x.png`}
                className="t_thumb"
                alt="강사이미지"
              />
              <div className="t_name">
                <strong className="ellipsis">
                  최<strong className="search_keyword">데이터</strong>선희최선희
                </strong>
                <span className="ellipsis">명예교수</span>
              </div>
            </Link>
            <dl className="search_detail flex">
              <dt>소속 기관</dt>
              <dd className="ellipsis">
                서울대학교 경영대학원 서울대학교 경영대학원서울대학교 경영대학원
              </dd>
              <dt>강의 분야</dt>
              <dd className="ellipsis">
                마케팅, 고객관계관리(CRM), 빅{' '}
                <strong className="search_keyword">데이터</strong> 혁신 사업본부
                마케팅, 고객관계관리(CRM), 빅
              </dd>
              <dt>주요 경력</dt>
              <dd className="ellipsis">
                서울대학교 경영대학원 학장 입니다 그외 다수 다른 경력들도
                있습니다. 자세한 내용은 링크 이동 해주세요.
              </dd>
            </dl>
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="result_contents w50">
          <div className="teacherbox">
            <Link to="/" className="flex">
              <Image
                src={`${PUBLIC_URL}/images/all/profile-110-px-sample-2@3x.png`}
                className="t_thumb"
                alt="강사이미지"
              />
              <div className="t_name">
                <strong className="ellipsis">
                  최<strong className="search_keyword">데이터</strong>선희최선희
                </strong>
                <span className="ellipsis">명예교수</span>
              </div>
            </Link>
            <dl className="search_detail flex">
              <dt>소속 기관</dt>
              <dd className="ellipsis">
                서울대학교 경영대학원 서울대학교 경영대학원서울대학교 경영대학원
              </dd>
              <dt>강의 분야</dt>
              <dd className="ellipsis">
                마케팅, 고객관계관리(CRM), 빅{' '}
                <strong className="search_keyword">데이터</strong> 혁신 사업본부
                마케팅, 고객관계관리(CRM), 빅
              </dd>
              <dt>주요 경력</dt>
              <dd className="ellipsis">
                서울대학교 경영대학원 학장 입니다 그외 다수 다른 경력들도
                있습니다. 자세한 내용은 링크 이동 해주세요.
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
