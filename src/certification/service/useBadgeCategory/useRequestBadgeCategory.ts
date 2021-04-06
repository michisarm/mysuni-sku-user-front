import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BadgeRouteParams } from '../../ui/model/BadgeRouteParams';
import { BadgeCategoryService } from '../../../lecture/stores';
import MyBadgeContentType from '../../ui/model/MyBadgeContentType';

export function useRequestBadgeCategory(): void {
  const params = useParams<BadgeRouteParams>();
  const categories = BadgeCategoryService.instance.categories;

  useEffect(() => {
    return () => {
      BadgeCategoryService.instance.clearSelectedCategoryId();
    };
  }, []);

  useEffect(() => {
    if (params.tab === MyBadgeContentType.AllBadgeList) {
      if (categories && categories.length > 0) {
        return;
      }

      BadgeCategoryService.instance.findAllCategories();
    }
  }, [params.tab]);
}
