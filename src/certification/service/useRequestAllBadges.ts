import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BadgeRouteParams } from '../ui/model/BadgeRouteParams';
import { BadgeCategoryService, BadgeService } from '../../lecture/stores';
import { BadgeRdo } from '../model/BadgeRdo';

const PAGE_SIZE = 12;

export function useRequestAllBadges() {
  const params = useParams<BadgeRouteParams>();
  const currentPageNo = parseInt(params.pageNo);

  const selectedCategoryId = BadgeCategoryService.instance.selectedCategoryId;
  const selectedLevel = BadgeService.instance.selectedLevel;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    return () => {
      BadgeService.instance.clearBadges();
    };
  }, [selectedLevel, params.tab]);

  useEffect(() => {
    const offset = (currentPageNo - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;

    const badgeRdo: BadgeRdo = {
      categoryId: selectedCategoryId,
      level: selectedLevel,
      offset,
      limit,
    };

    setIsLoading(true);
    BadgeService!.instance.findAllBadges(badgeRdo).then(() => {
      setIsLoading(false);
    });
  }, [selectedCategoryId, selectedLevel, params.pageNo]);

  return isLoading;
}
