/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';
import { onLectureCubeSummary } from '../../store/LectureOverviewStore';
import LectureCubeSummary from '../../viewModel/LectureOverview/LectureCubeSummary';

type Value = LectureCubeSummary | undefined;

export function useLectureCubeSummary(): [Value] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureCubeSummary-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureCubeSummary(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
