import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Segment, Radio, Button } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';
import SearchFilter from '../Components/SearchFilter';
import { useParams } from 'react-router-dom';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

const ContentsHeader: React.FC = () => {
  //
  const [isOnFilter, setIsOnFilter] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const onClickFilter = () => {
    setIsOnFilter(!isOnFilter);
  };

  const closeOnFilter = () => {
    setIsOnFilter(false);
  };

  const param = useParams();

  // Get queryID
  useEffect(() => {
    const queryId: string = window.location.search.slice(
      window.location.search.indexOf('=') + 1,
      window.location.search.length
    );
    if (queryId.endsWith('%')) {
      let decodedQueryId = queryId;
      while (decodedQueryId.endsWith('%')) {
        decodedQueryId = decodedQueryId.substring(0, decodedQueryId.length - 1);
      }
      if (decodedQueryId.includes('%%')) {
        while (decodedQueryId.includes('%%')) {
          decodedQueryId = decodedQueryId.replace(/%%/, '%25%');
        }
        setSearchValue(decodeURI(decodedQueryId));
        return;
      }
      setSearchValue(decodeURI(decodedQueryId));
      return;
    }
    if (queryId.includes('%%')) {
      let decodedQueryId = queryId;
      while (decodedQueryId.includes('%%')) {
        decodedQueryId = decodedQueryId.replace(/%%/, '%25%');
      }
      setSearchValue(decodeURI(decodedQueryId));
      return;
    }
    setSearchValue(decodeURI(queryId));
  }, [param]);

  return (
    <>
      <div className="sort-condition">
        <Segment className="full">
          <div className="keyword">
            <span>{`${searchValue}`}</span>
            <PolyglotText
              id="통검-요약정보-타이틀"
              defaultString="에 대한 검색 결과 입니다."
            />
          </div>
          <div className="right-area">
            {/* <div className="sort">
              <Radio
                className="base"
                label="과정명으로 검색"
                name="search01"
                defaultChecked
              />
              <Radio className="base" label="상세 검색" name="search01" />
              <Radio className="base" label="Tag 검색" name="search01" />
            </div> */}
            <Button
              className={classNames('btn-filter-blue', isOnFilter ? 'on' : '')}
              onClick={onClickFilter}
            >
              <span>
                <PolyglotText id="통검-요약정보-필터" defaultString="Filter" />
              </span>
            </Button>
          </div>
          {/*Filter*/}
          <SearchFilter
            isOnFilter={isOnFilter}
            searchValue={searchValue}
            closeOnFilter={closeOnFilter}
          />
        </Segment>
      </div>
    </>
  );
};

export default ContentsHeader;
