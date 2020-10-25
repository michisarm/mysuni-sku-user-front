import { onLectureSubcategory } from '../../store/LectureOverviewStore';
import LectureSubcategory from '../../viewModel/LectureOverview/LectureSubcategory';
/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';

type Value = LectureSubcategory | undefined;

export function useLectureSubcategory(): [Value] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureSubcategory-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureSubcategory(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
