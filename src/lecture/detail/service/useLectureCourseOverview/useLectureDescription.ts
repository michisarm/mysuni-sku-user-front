import { onLectureDescription } from 'lecture/detail/store/LectureOverviewStore';
import LectureDescription from 'lecture/detail/viewModel/LectureOverview/LectureDescription';
/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';

type Value = LectureDescription | undefined;

let subscriberIdRef = 0;
export function useLectureDescription(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureDescription-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureDescription(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
