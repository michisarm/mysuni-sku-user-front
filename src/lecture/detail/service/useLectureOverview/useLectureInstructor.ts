import { onLectureInstructor } from '../../store/LectureOverviewStore';
import LectureInstructor from '../../viewModel/LectureOverview/LectureInstructor';
/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';

type Value = LectureInstructor | undefined;

export function useLectureInstructor(): [Value] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureInstructor-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureInstructor(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
