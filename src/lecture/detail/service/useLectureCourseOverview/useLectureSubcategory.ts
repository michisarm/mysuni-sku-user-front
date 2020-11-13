import { onLectureSubcategory } from '../../store/LectureOverviewStore';
import LectureSubcategory from '../../viewModel/LectureOverview/LectureSubcategory';
/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';

type Value = LectureSubcategory | undefined;

let subscriberIdRef = 0;
export function useLectureSubcategory(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureSubcategory-${++subscriberIdRef}`;
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
