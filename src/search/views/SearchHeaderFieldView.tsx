import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Icon, Input, Popup } from 'semantic-ui-react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { SearchHeaderFieldPopularView } from './SearchHeaderFieldPopularView';
import { getQueryId, search } from 'search/search.events';

export function SearchHeaderFieldView() {
  //
  const [focus, setFocus] = useState<boolean>(false);
  const [write, setWrite] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const param = useParams();

  // Get queryID  // 기존 로직
  useEffect(() => {
    handleClose();
    setWrite(getQueryId());
  }, [param]);

  return (
    <>
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
                      onChange={(e) => setWrite(e.target.value)}
                      onKeyDown={(e: any) => {
                        if (e.key === 'Enter') {
                          handleClose();
                          search(write);
                        }
                      }}
                    />
                    <Icon className="clear link" onClick={() => setWrite('')} />
                    {/* <Icon className="search_i"/> */}
                    <Button className="btn_sch">
                      <Icon className="search_i" />
                    </Button>
                  </div>
                }
              >
                <Popup.Content>
                  {/* 최근검색어 */}
                  <div className="w_area recent_list">
                    <div className="w_header">
                      <strong className="w_tit">최근 검색어</strong>
                      <Button className="all_dt">전체 삭제</Button>
                    </div>
                    <div className="w_contents">
                      <ul>
                        <li>
                          <strong
                            className="rwd"
                            onClick={() => search('AI 인공지능 뽀개기')}
                          >
                            AI 인공지능 뽀개기
                          </strong>
                          <Button className="w_dl">
                            <Icon className="i_dl" />
                          </Button>
                        </li>
                        <li>
                          <strong
                            className="rwd"
                            onClick={() => search('ai 인공')}
                          >
                            ai 인공
                          </strong>
                          <Button className="w_dl">
                            <Icon className="i_dl" />
                          </Button>
                        </li>
                        <li>
                          <strong
                            className="rwd"
                            onClick={() => search('데이터 사이언스')}
                          >
                            데이터 사이언스
                          </strong>
                          <Button className="w_dl">
                            <Icon className="i_dl" />
                          </Button>
                        </li>
                        <li>
                          <strong
                            className="rwd"
                            onClick={() => search('데이터')}
                          >
                            데이터
                          </strong>
                          <Button className="w_dl">
                            <Icon className="i_dl" />
                          </Button>
                        </li>
                        <li>
                          <strong
                            className="rwd"
                            onClick={() => search('파이썬')}
                          >
                            파이썬
                          </strong>
                          <Button className="w_dl">
                            <Icon className="i_dl" />
                          </Button>
                        </li>
                      </ul>

                      {/* 최근 검색어가 없을때, 아래 문구 노출됩니다. */}
                      {/* <p className="txt_nodata">최근 검색어가 없습니다.</p> */}
                    </div>
                  </div>
                  {/* 인기검색어 */}
                  <div className="w_area poplr_list">
                    <div className="w_header">
                      <strong className="w_tit">인기 검색어</strong>
                    </div>
                    <div className="w_contents">
                      <SearchHeaderFieldPopularView />
                    </div>
                  </div>
                </Popup.Content>
              </Popup>
            </div>
          </div>
          <Checkbox className="again_chk" label="결과 내 재검색" />
        </div>
      </div>
    </>
  );
}
