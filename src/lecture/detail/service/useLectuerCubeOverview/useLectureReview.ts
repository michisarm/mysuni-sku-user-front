/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';
import { onLectureReview } from '../../store/LectureOverviewStore';
import LectureReview from '../../viewModel/LectureOverview/LectureReview';

type Value = LectureReview | undefined;

let subscriberIdRef = 0;
export function useLectureReview(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureReview-${++subscriberIdRef}`;
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
