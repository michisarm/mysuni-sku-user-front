import React from 'react';
import { Segment } from 'semantic-ui-react';
import { SearchFilterView } from './SearchFilterView';

interface SearchHeaderViewProps {
  text_idx: string;
}

export function SearchHeaderView(props: SearchHeaderViewProps) {
  const { text_idx } = props;

  return (
    <div className="sort-condition">
      <Segment className="full">
        <div className="keyword">
          <span>{text_idx}</span>에 대한 검색 결과 입니다.
        </div>
        <SearchFilterView text_idx={text_idx} />
      </Segment>
    </div>
  );
}
