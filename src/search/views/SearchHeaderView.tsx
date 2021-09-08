import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Icon, Input, Menu, Popup } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { SearchHeaderFieldView } from './SearchHeaderFieldView';
import { SearchParam } from '../../search/search.models';
import { getQueryId, search } from '../../search/search.events';
import classNames from 'classnames';
import { getCurrentHistory } from '../../shared/store/HistoryStore';
import {
  setSearchInSearchInfo,
  useSearchInSearchInfo,
  useSearchRelatedList,
} from '../../search/search.services';
import {
  getPolyglotText,
  PolyglotText,
} from '../../shared/ui/logic/PolyglotText';

export function SearchHeaderView() {
  //
  const [activeItem, setActiveItem] = useState<string>('');
  const [focus, setFocus] = useState<boolean>(false);
  const [write, setWrite] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const queryId = getQueryId();
  const searchInSearchInfo = useSearchInSearchInfo();
  const relatedList = useSearchRelatedList();

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
                  postion="left bottom"
                  className="history_popup navi_popup"
                  positionFixed
                  open={isOpen}
                  onOpen={handleOpen}
                  onClose={handleClose}
                  trigger={
                    <div
                      className={classNames('search show_text', {
                        focus: 'focus',
                        write: 'write',
                        on: isOpen === true, //input이 popup에 맞춰서 모양이 변경됨
                        research:
                          searchInSearchInfo?.checkSearchInSearch === true, //결과내 재검색 체크박스 클릭시, reseach 클래스 추가 .re_text display제어
                      })}
                    >
                      <div className="re_text">
                        <span className="ellipsis">
                          {searchInSearchInfo?.parentSearchValue}
                        </span>
                      </div>
                      <Input
                        type="text"
                        placeholder={getPolyglotText(
                          '검색어를 입력하세요.',
                          'cmm-cfl-검색어'
                        )}
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
              label={getPolyglotText(
                '결과 내 재검색',
                '통검-필레팝-재검색'
              )}
              checked={searchInSearchInfo?.checkSearchInSearch}
              onClick={() => {
                if (!searchInSearchInfo?.checkSearchInSearch) {
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

        {relatedList && relatedList.length > 0 && (
          <div className="relative_box">
            <dl>
              <dt>
                <strong><PolyglotText id="통검-필레팝-연관검색어" defaultString="연관 검색어" /></strong>
              </dt>
              <dd>
                <ul>
                  {relatedList.map((related: string) => (
                    <li>
                      <a
                        href="javascript:void(0);"
                        onClick={() => {
                          searchSetting(related);
                          search(related);
                        }}
                      >
                        {related}
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
          </div>
        )}
      </div>

      <div className="tab_search_inner">
        <Menu className="tab_search_title">
          <Menu.Item
            name="all"
            active={activeItem === 'all'}
            onClick={handleMenuClick}
          >
            <PolyglotText id="cmm-cfl-전체" defaultString="전체" />
          </Menu.Item>
          <Menu.Item
            name="lecture"
            active={activeItem === 'lecture'}
            onClick={handleMenuClick}
          >
            <PolyglotText id="통검-요약정보-과정탭" defaultString="과정" />
          </Menu.Item>
          <Menu.Item
            name="badge"
            active={activeItem === 'badge'}
            onClick={handleMenuClick}
          >
            <PolyglotText id="통검-필레팝-뱃지" defaultString="Badge" />
          </Menu.Item>
          <Menu.Item
            name="community"
            active={activeItem === 'community'}
            onClick={handleMenuClick}
          >
            <PolyglotText id="cmm-prfr-커뮤" defaultString="Community" />
          </Menu.Item>
          <Menu.Item
            name="instructor"
            active={activeItem === 'instructor'}
            onClick={handleMenuClick}
          >
            <PolyglotText id="통검-전학강-강사" defaultString="강사" />
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
}
