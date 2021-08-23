import React, { useEffect, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, useParams } from 'react-router-dom';
import { SearchHeaderFieldView } from './SearchHeaderFieldView';
import { SearchParam } from 'search/search.models';
import { getQueryId, search } from 'search/search.events';

export function SearchHeaderView() {
  //
  const [activeItem, setActiveItem] = useState<string>('');

  const queryId = getQueryId();

  const handleItemClick = (e: any, { name }: any) => {
    search(queryId, name === 'all' ? undefined : name);
  };

  const params = useParams<SearchParam>();

  useEffect(() => {
    if (params !== undefined && params.searchType !== undefined) {
      setActiveItem(params.searchType);
    } else {
      setActiveItem('all');
    }
  }, [params]);

  return (
    <>
      <div className="top_search_area">
        <SearchHeaderFieldView />

        <div className="relative_box">
          <dl>
            <dt>
              <strong>연관 검색어</strong>
            </dt>
            <dd>
              <ul>
                <li>
                  <a
                    href="javascript:void(0);"
                    onClick={() => search('데이터 길라잡이')}
                  >
                    데이터 길라잡이
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    onClick={() => search('데이터 분석')}
                  >
                    데이터 분석
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    onClick={() => search('데이터 뽀개기')}
                  >
                    데이터 뽀개기
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    onClick={() => search('데이터 시각화 청각화그리고 다각화')}
                  >
                    데이터 시각화 청각화그리고 다각화
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    onClick={() => search('데이터 통계와분석을 한꺼번에')}
                  >
                    데이터 통계와분석을 한꺼번에
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    onClick={() => search('데이터 마케팅')}
                  >
                    데이터 마케팅
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    onClick={() => search('데이터 광고')}
                  >
                    데이터 광고
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    onClick={() => search('Data 기반 Deep Change')}
                  >
                    Data 기반 Deep Change
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    onClick={() => search('데이터 통계 분석')}
                  >
                    데이터 통계 분석
                  </a>
                </li>
              </ul>
            </dd>
          </dl>
        </div>
      </div>

      <div className="tab_search_inner">
        <Menu className="tab_search_title">
          <Menu.Item
            name="all"
            active={activeItem === 'all'}
            onClick={handleItemClick}
          >
            전체
          </Menu.Item>
          <Menu.Item
            name="lecture"
            active={activeItem === 'lecture'}
            onClick={handleItemClick}
          >
            과정
          </Menu.Item>
          <Menu.Item
            name="badge"
            active={activeItem === 'badge'}
            onClick={handleItemClick}
          >
            Badge
          </Menu.Item>
          <Menu.Item
            name="community"
            active={activeItem === 'community'}
            onClick={handleItemClick}
          >
            Community
          </Menu.Item>
          <Menu.Item
            name="instructor"
            active={activeItem === 'instructor'}
            onClick={handleItemClick}
          >
            강사
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
}
