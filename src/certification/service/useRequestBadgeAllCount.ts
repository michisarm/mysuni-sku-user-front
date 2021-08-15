import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BadgeRouteParams } from '../ui/model/BadgeRouteParams';
import { BadgeService } from '../../lecture/stores';

export function useRequestBadgeAllCount(): void {
  const params = useParams<BadgeRouteParams>();

  useEffect(() => {
    BadgeService.instance.findAllBadgeCount();
  }, [params.tab]);
}
