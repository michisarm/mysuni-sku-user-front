import { useEffect } from 'react';
import { BadgeCategoryService } from '../../lecture/stores';

export function useRequestBadgeCategory(): void {
  useEffect(() => {
    BadgeCategoryService.instance.findAllCategories();
  }, []);
}

export function getBadgeCategoryName(badgeCategoryId: string) {
  return (
    BadgeCategoryService.instance.categories.find(c => c.id === badgeCategoryId)
      ?.name || ''
  );
}
