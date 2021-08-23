import React from 'react';
import { reactAlert } from '@nara.platform/accent';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { getCurrentHistory } from 'shared/store/HistoryStore';
import { SearchHeaderView } from './views/SearchHeaderView';

export function SearchHeaderPage() {
  //

  return (
    <>
      <SearchHeaderView />
    </>
  );
}
