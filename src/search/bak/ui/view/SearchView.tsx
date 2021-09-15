import React from 'react';
import { SearchHeaderView } from './SearchHeaderView';

interface SearchViewProps {
  text_idx: string;
}

export function SearchView(props: SearchViewProps) {
  const { text_idx } = props;

  return (
    <section className="content">
      <SearchHeaderView text_idx={text_idx} />
    </section>
  );
}
