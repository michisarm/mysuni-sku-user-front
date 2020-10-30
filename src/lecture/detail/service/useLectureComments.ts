/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';
import { onLectureComment } from '../store/LectureOverviewStore';
import LectureComment from '../viewModel/LectureComment/LectureComment';

type Value = LectureComment | undefined;

export function useLectureComment(): [Value] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureComment-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureComment(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
