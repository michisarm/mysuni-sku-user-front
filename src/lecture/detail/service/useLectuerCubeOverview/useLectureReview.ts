/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';
import { onLectureReview } from '../../store/LectureOverviewStore';
import LectureReview from '../../viewModel/LectureOverview/LectureReview';

type Value = LectureReview | undefined;

export function useLectureReview(): [Value] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureReview-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureReview(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
