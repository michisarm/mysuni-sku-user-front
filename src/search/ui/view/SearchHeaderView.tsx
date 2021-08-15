import React from 'react';
import { Segment } from 'semantic-ui-react';
import { SearchFilterView } from './SearchFilterView';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

interface SearchHeaderViewProps {
  text_idx: string;
}

export function SearchHeaderView(props: SearchHeaderViewProps) {
  const { text_idx } = props;

  return (
    <div className="sort-condition">
      <Segment className="full">
        <div
          className="keyword"
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              '<span>{text_idx}</span>에 대한 검색 결과 입니다.',
              '서치헤더뷰-검색결과-문구',
              { text_idx: text_idx }
            ),
          }}
        />
        <SearchFilterView text_idx={text_idx} />
      </Segment>
    </div>
  );
}
