import { useEffect } from 'react';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { BadgeCategoryService } from '../../lecture/stores';

export function useRequestBadgeCategory(): void {
  useEffect(() => {
    BadgeCategoryService.instance.findAllCategories();
  }, []);
}

export function getBadgeCategoryName(badgeCategoryId: string) {
  const polyglotName = BadgeCategoryService.instance.categories.find(
    (c) => c.id === badgeCategoryId
  );

  if (polyglotName === undefined) {
    return '';
  }

  return parsePolyglotString(polyglotName.name);
}
