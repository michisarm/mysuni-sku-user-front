import { onLectureInstructor } from '../../store/LectureOverviewStore';
import LectureInstructor from '../../viewModel/LectureOverview/LectureInstructor';
/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';

type Value = LectureInstructor | undefined;

let subscriberIdRef = 0;
export function useLectureInstructor(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureInstructor-${++subscriberIdRef}`;
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
