import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FilterBoxService from 'shared/present/logic/FilterBoxService';
import { MyTrainingRouteParams } from './routeParams';

export function useClearFilterBox() {
  const params = useParams<MyTrainingRouteParams>();

  useEffect(() => FilterBoxService.instance.clear(), [params.tab]);
}
