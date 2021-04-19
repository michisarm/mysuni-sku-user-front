import { useEffect, useState } from 'react';
import { findBadgeWithCategory } from '../api/BadgeApi';
import { BadgeCategory } from '../model/BadgeCategory';

export function useRequestBadgeWIthCategory(badgeId: string) {
  const [badgeCategory, setBadgeCategory] = useState<
    BadgeCategory | undefined
  >();

  const getBadgeWithCategory = async () => {
    await findBadgeWithCategory(badgeId).then(response =>
      setBadgeCategory(response?.badgeCategory)
    );
  };

  useEffect(() => {
    getBadgeWithCategory();
  }, []);

  return badgeCategory;
}
