import { onLectureSummary } from 'lecture/detail/store/LectureOverviewStore';
import LectureSummary from 'lecture/detail/viewModel/LectureOverview/LectureSummary';
/* eslint-disable consistent-return */

import { useCallback, useEffect, useRef, useState } from 'react';

type Value = LectureSummary | undefined;

export function useLectureSummary(): [Value] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureSummary-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureSummary(next => {
      setValue(next);
      console.log('useLectureSummary', next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
