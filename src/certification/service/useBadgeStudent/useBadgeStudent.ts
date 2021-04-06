import { useState, useEffect, useCallback } from 'react';
import { findBadgeStudent } from '../../api/BadgeStudentApi';
import { BadgeStudent } from '../../model/BadgeStudent';

interface ReturnValue {
  badgeStudent: BadgeStudent | undefined;
  onSetBadgeStudent: (next: BadgeStudent) => void;
}

export function useBadgeStudent(badgeId: string): ReturnValue {
  const [badgeStudent, setBadgeStudent] = useState<BadgeStudent>();

  useEffect(() => {
    requestBadgeStudent(badgeId);
  }, [badgeId]);

  const requestBadgeStudent = async (badgeId: string) => {
    const foundBadgeStudent = await findBadgeStudent(badgeId);

    if (foundBadgeStudent) {
      setBadgeStudent(foundBadgeStudent);
    }
  };

  const onSetBadgeStudent = useCallback((next: BadgeStudent) => {
    setBadgeStudent(next);
  }, []);

  return { badgeStudent, onSetBadgeStudent };
}
