import React, { useCallback, useState } from 'react';
import { Button } from 'semantic-ui-react';
import SearchFilter from '../../Components/SearchFilter';

interface SearchFilterViewProps {
  text_idx: string;
}

export function SearchFilterView(props: SearchFilterViewProps) {
  const { text_idx } = props;
  const [isOnFilter, setIsOnFilter] = useState<boolean>(false);
  const toggleIsOnFilter = useCallback(() => {
    setIsOnFilter(!isOnFilter);
  }, [isOnFilter]);
  return (
    <>
      <div className="right-area">
        <Button
          className={`btn-filter-blue ${isOnFilter ? 'on' : ''}`}
          onClick={toggleIsOnFilter}
        >
          <span>Filter</span>
        </Button>
      </div>
      <SearchFilter isOnFilter={isOnFilter} searchValue={text_idx} />
    </>
  );
}
