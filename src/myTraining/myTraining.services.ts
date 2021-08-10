import { useEffect } from 'react';
import FilterBoxService from 'shared/present/logic/FilterBoxService';

export function useClearFilterBox() {
  useEffect(() => {
    return () => {
      FilterBoxService.instance.clear();
    };
  }, []);
}
