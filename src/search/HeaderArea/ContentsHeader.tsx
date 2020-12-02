import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Segment, Radio, Button } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import classNames from 'classnames';
import SearchFilter from '../Components/SearchFilter';
import { useParams } from 'react-router-dom';

const ContentsHeader: React.FC = () => {
  //
  const [isOnFilter, setIsOnFilter] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const onClickFilter = () => {
    setIsOnFilter(!isOnFilter);
  };

  const param = useParams();

  // Get queryID
  useEffect(() => {
    const queryId: string = window.location.search.slice(
      window.location.search.indexOf('=') + 1,
      window.location.search.length
    );
    setSearchValue(decodeURI(queryId));
  }, [param]);

  return (
    <>
      <div className="sort-condition">
        <Segment className="full">
          <div className="keyword">
            <span>{`${searchValue}`}</span>에 대한 검색 결과 입니다.
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
              <span>Filter</span>
            </Button>
          </div>
          {/*Filter*/}
          <SearchFilter isOnFilter={isOnFilter} searchValue={searchValue} />
        </Segment>
      </div>
    </>
  );
};

export default ContentsHeader;