import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Icon, Input, Popup } from 'semantic-ui-react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { SearchHeaderFieldPopularView } from './SearchHeaderFieldPopularView';
import { getQueryId, search } from 'search/search.events';

interface Props {
  callback?: () => void;
}

export function SearchHeaderFieldView(props: Props) {
  //

  const param = useParams();

  const onClickSearch = (searchValue: string) => {
    if (props.callback !== undefined) {
      props.callback();
    }
    search(searchValue);
  };
  return (
    <>
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
                onClick={() => onClickSearch('AI 인공지능 뽀개기')}
              >
                AI 인공지능 뽀개기
              </strong>
              <Button className="w_dl">
                <Icon className="i_dl" />
              </Button>
            </li>
            <li>
              <strong className="rwd" onClick={() => onClickSearch('ai 인공')}>
                ai 인공
              </strong>
              <Button className="w_dl">
                <Icon className="i_dl" />
              </Button>
            </li>
            <li>
              <strong className="rwd" onClick={() => search('데이터 사이언스')}>
                데이터 사이언스
              </strong>
              <Button className="w_dl">
                <Icon className="i_dl" />
              </Button>
            </li>
            <li>
              <strong className="rwd" onClick={() => onClickSearch('데이터')}>
                데이터
              </strong>
              <Button className="w_dl">
                <Icon className="i_dl" />
              </Button>
            </li>
            <li>
              <strong className="rwd" onClick={() => onClickSearch('파이썬')}>
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
          <SearchHeaderFieldPopularView onClickSearch={onClickSearch} />
        </div>
      </div>
    </>
  );
}
