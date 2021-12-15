import React, { useEffect } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { SearchHeaderFieldPopularView } from './SearchHeaderFieldPopularView';
import { setSearchRecentList, useSearchRecentList } from '../search.services';
import { PolyglotText } from '../../shared/ui/logic/PolyglotText';
import { StorageModel } from '@nara.platform/accent';
import SearchInfoModel from '../model/SeachInfoModel';
import SearchService from '../service/SearchService';
import { getQueryId } from '../search.events';
import { Area } from 'tracker/model';
import { useParams } from 'react-router-dom';
import { requestSearchRecentList } from 'search/search.events';

interface Props {
  callback?: (searchValue?: string) => void;
  setSearchValue: (name: string, value: any) => void;
  searchInfo: SearchInfoModel;
  onSearch: (value: string) => void;
  autoCompleteValues: string[];
}

export function SearchHeaderFieldView(props: Props) {
  //
  const param = useParams();

  useEffect(() => {
    requestSearchRecentList();
  }, [param]);

  const searchRecents = useSearchRecentList();

  const onClickRemove = (searchValue: string) => {
    const newSearchRecents = searchRecents?.filter(
      (ele) => ele !== searchValue
    );
    new StorageModel('localStorage', 'searchRecents').save(
      newSearchRecents || []
    );
    setSearchRecentList(newSearchRecents);
  };

  const allClear = () => {
    new StorageModel('localStorage', 'searchRecents').save([]);
    setSearchRecentList([]);
  };

  return (
    <div className="g-search-field" data-area={Area.SEARCH}>
      <div className="w_wrap">
        <div
          className={
            props.autoCompleteValues.length > 0 ? 'w_inner off' : 'w_inner'
          }
        >
          <div className="w_area recent_list">
            <div className="w_header">
              <strong>
                <PolyglotText
                  id="통검-필레팝-최근검색어"
                  defaultString="최근 검색어"
                />
              </strong>
              {searchRecents && searchRecents.length > 0 && (
                <Button className="all_dt" onClick={allClear}>
                  <PolyglotText
                    id="통검-필레팝-전체삭제"
                    defaultString="전체 삭제"
                  />
                </Button>
              )}
            </div>
            <div className="w_contents">
              {(searchRecents?.length || 0) < 1 && (
                <p className="txt_nodata">
                  <PolyglotText
                    id="통검-필레팝-최근검색어없음"
                    defaultString="최근 검색어가 없습니다."
                  />
                </p>
              )}
              {searchRecents && searchRecents.length > 0 && (
                <ul>
                  {searchRecents?.map((searchRecent, index) => (
                    <li key={`search-recent-${index}`}>
                      <strong
                        className="rwd"
                        onClick={() => props.onSearch(searchRecent)}
                      >
                        {searchRecent}
                      </strong>
                      <Button
                        className="w_dl"
                        onClick={() => onClickRemove(searchRecent)}
                      >
                        <Icon className="i_dl" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="w_area poplr_list">
            <div className="w_header">
              {/*<strong className="w_tit">인기 검색어</strong>*/}
              <strong className="w_tit">
                <PolyglotText
                  id="통검-필레팝-인기검색어"
                  defaultString="인기 검색어"
                />
              </strong>
            </div>
            <div className="w_contents">
              <SearchHeaderFieldPopularView onClickSearch={props.onSearch} />
            </div>
          </div>
        </div>
        {(props.autoCompleteValues && props.autoCompleteValues.length > 0 && (
          <div
            className={
              props.autoCompleteValues.length > 0
                ? 'w_inner_auto on'
                : 'w_inner_auto'
            }
          >
            <ul className="auto_list">
              {props.autoCompleteValues.map((value, idx) => {
                // return AutoCompleteText(props.searchInfo.searchValue, value);
                return (
                  <React.Fragment key={idx}>
                    <AutoCompleteText
                      onClickText={props.onSearch}
                      searchValue={props.searchInfo.searchValue}
                      completeValue={value}
                    />
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        )) ||
          null}
      </div>
    </div>
  );
}

interface AutoCompleteTextProps {
  onClickText: (value: string) => void;
  searchValue: string;
  completeValue: string;
}

function AutoCompleteText(props: AutoCompleteTextProps) {
  //
  return (
    <li
      className="auto_item"
      onClick={() => props.onClickText(props.completeValue)}
    >
      <a
        dangerouslySetInnerHTML={{
          __html: getTitleHtmlSearchKeyword(
            props.completeValue,
            props.searchValue.trim()
          ),
        }}
      />
    </li>
  );
}

function getTitleHtmlSearchKeyword(title: string, keyword: string) {
  if (title === null || title === undefined) {
    return '';
  }

  let htmlTitle = title;

  if (keyword.indexOf(' ') > -1) {
    const keywords = keyword.split(' ');
    let htmlTitles = htmlTitle;

    keywords.map((item) => {
      htmlTitles = escapeRegex(item, htmlTitles);
      return htmlTitles;
    });
    return htmlTitles;
  }

  htmlTitle = escapeRegex(keyword, htmlTitle);

  return htmlTitle;
}

function escapeRegex(item: string, target: string): string {
  //
  const ESCAPE_REGEX = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
  const regExpItem = item.replace(ESCAPE_REGEX, '');
  let replacedText = '';
  const splitTags = target.split('</strong>');
  const changedValues = splitTags.map((splitValue, index) => {
    const splitTargetValue =
      splitTags.length !== index + 1 ? splitValue + '</strong>' : splitValue;
    if (splitTargetValue.includes('</strong>')) {
      return splitTargetValue;
    } else {
      if (item.match(ESCAPE_REGEX)) {
        return splitTargetValue.replace(
          item,
          `<strong class="a_text">${item}</strong>`
        );
      } else {
        return splitTargetValue.replace(
          new RegExp(regExpItem),
          `<strong class="a_text">${regExpItem}</strong>`
        );
      }
    }
  });

  replacedText = changedValues.join('');

  // if (item.match(ESCAPE_REGEX)) {
  //   replacedText = target.replace(
  //     item,
  //     `<strong class="a_text">${item}</strong>`
  //   );
  // } else {
  //   replacedText = target.replace(
  //     new RegExp(regExpItem, 'gi'),
  //     `<strong class="a_text">${regExpItem}</strong>`
  //   );
  // }

  return replacedText;
}
