import { useEffect, useState } from 'react';
import { findBadgeWithCategory } from '../api/BadgeApi';

export function useRequestBadgeColor(badgeId: string) {
  const [badgeColor, setBadgeColor] = useState<string | undefined>('');

  const getBadgeWithCategory = async () => {
    await findBadgeWithCategory(badgeId).then(response =>
      setBadgeColor(response?.badgeCategory.themeColor)
    );
  };

  useEffect(() => {
    getBadgeWithCategory();
  }, []);

  return badgeColor || '#ea012c';
}
