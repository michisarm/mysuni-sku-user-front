import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BadgeRouteParams } from '../ui/model/BadgeRouteParams';
import { BadgeService } from '../../lecture/stores';
import { MyBadgeRdo } from '../model/MyBadgeRdo';

const PAGE_SIZE = 4;

export function useRequestChallengeBadges() {
  const params = useParams<BadgeRouteParams>();
  const currentPageNo = parseInt(params.pageNo);

  const selectedLevel = BadgeService.instance.selectedLevel;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    return () => {
      BadgeService.instance.clearChallengeBadges();
    };
  }, [selectedLevel, params.tab]);

  useEffect(() => {
    const offset = (currentPageNo - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;

    const myBadgeRdo: MyBadgeRdo = {
      level: selectedLevel,
      offset,
      limit,
    };

    setIsLoading(true);
    BadgeService.instance
      .findAllChallengeBadges(myBadgeRdo)
      .then(() => setIsLoading(false));
  }, [selectedLevel, params.pageNo]);

  return isLoading;
}
