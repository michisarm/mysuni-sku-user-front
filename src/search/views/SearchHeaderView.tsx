import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Icon, Input, Menu, Popup } from 'semantic-ui-react';
import { Link, useParams } from 'react-router-dom';
import { SearchHeaderFieldView } from './SearchHeaderFieldView';
import { SearchParam } from 'search/search.models';
import { getQueryId, search } from 'search/search.events';
import classNames from 'classnames';
import { getCurrentHistory } from 'shared/store/HistoryStore';
import {
  setSearchInSearchInfo,
  useSearchInSearchInfo,
} from 'search/search.services';

export function SearchHeaderView() {
  //
  const [activeItem, setActiveItem] = useState<string>('');
  const [focus, setFocus] = useState<boolean>(false);
  const [write, setWrite] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const queryId = getQueryId();
  const searchInSearchInfo = useSearchInSearchInfo();

  const handleMenuClick = (e: any, { name }: any) => {
    //search(queryId, name === 'all' ? undefined : name);
    const history = getCurrentHistory();
    if (name === 'all') {
      history?.push(`/search?query=${queryId}`);
    } else {
      history?.push(`/search/${name}?query=${queryId}`);
    }
  };

  const params = useParams<SearchParam>();
  useEffect(() => {
    if (params !== undefined && params.searchType !== undefined) {
      setActiveItem(params.searchType);
    } else {
      setActiveItem('all');
    }
    handleClose();

    if (searchInSearchInfo?.checkSearchInSearch) {
      setWrite(searchInSearchInfo.searchValue);
    } else {
      setWrite(getQueryId());
    }
  }, [params]);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const searchSetting = (searchValue?: string) => {
    if (searchValue !== undefined) {
      setWrite(searchValue);
      setSearchInSearchInfo({
        checkSearchInSearch: searchInSearchInfo?.checkSearchInSearch || false,
        parentSearchValue: queryId,
        searchValue,
      });
    }
    handleClose();
  };

  return (
    <>
      <div className="top_search_area">
        <div className="search_area">
          <div className="search_inner">
            {/* 검색어 입력필드 */}
            <div className="field">
              <div className="search_input">
                <Popup
                  on="click"
                  postion="bottom center"
                  className="history_popup navi_popup"
                  open={isOpen}
                  positionFixed
                  onOpen={handleOpen}
                  onClose={handleClose}
                  trigger={
                    <div
                      className={classNames('search show_text', {
                        focus: 'focus',
                        write: 'write',
                        on: isOpen === true, //input이 popup에 맞춰서 모양이 변경됨
                      })}
                    >
                      <Input
                        type="text"
                        placeholder="검색어를 입력하세요."
                        value={write}
                        onClick={() => setFocus(true)}
                        onChange={(e) => {
                          setWrite(e.target.value);
                          setSearchInSearchInfo({
                            checkSearchInSearch:
                              searchInSearchInfo?.checkSearchInSearch || false,
                            parentSearchValue: queryId,
                            searchValue: e.target.value,
                          });
                        }}
                        onKeyDown={(e: any) => {
                          if (e.key === 'Enter') {
                            handleClose();
                            search(write);
                          }
                        }}
                      />
                      <Icon
                        className="clear link"
                        onClick={() => setWrite('')}
                      />
                      {/* <Icon className="search_i"/> */}
                      <Button className="btn_sch">
                        <Icon className="search_i" />
                      </Button>
                    </div>
                  }
                >
                  <Popup.Content>
                    <SearchHeaderFieldView callback={searchSetting} />
                  </Popup.Content>
                </Popup>
              </div>
            </div>
            <Checkbox
              className="again_chk"
              label="결과 내 재검색"
              checked={searchInSearchInfo?.checkSearchInSearch}
              onClick={() => {
                if (searchInSearchInfo?.checkSearchInSearch) {
                  setWrite('');
                }
                setSearchInSearchInfo({
                  checkSearchInSearch: !searchInSearchInfo?.checkSearchInSearch,
                  parentSearchValue: queryId,
                  searchValue: write,
                });
              }}
            />
          </div>
        </div>

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
                    onClick={() => {
                      searchSetting('데이터 길라잡이');
                      search('데이터 길라잡이');
                    }}
                  >
                    데이터 길라잡이
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      searchSetting('데이터 분석');
                      search('데이터 분석');
                    }}
                  >
                    데이터 분석
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      searchSetting('데이터 뽀개기');
                      search('데이터 뽀개기');
                    }}
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
            onClick={handleMenuClick}
          >
            전체
          </Menu.Item>
          <Menu.Item
            name="lecture"
            active={activeItem === 'lecture'}
            onClick={handleMenuClick}
          >
            과정
          </Menu.Item>
          <Menu.Item
            name="badge"
            active={activeItem === 'badge'}
            onClick={handleMenuClick}
          >
            Badge
          </Menu.Item>
          <Menu.Item
            name="community"
            active={activeItem === 'community'}
            onClick={handleMenuClick}
          >
            Community
          </Menu.Item>
          <Menu.Item
            name="instructor"
            active={activeItem === 'instructor'}
            onClick={handleMenuClick}
          >
            강사
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
}
