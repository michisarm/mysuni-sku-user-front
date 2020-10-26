import { onLecturePrecourse } from '../../store/LectureOverviewStore';
import LecturePrecourse from '../../viewModel/LectureOverview/LecturePrecourse';
/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';

type Value = LecturePrecourse | undefined;

export function useLecturePrecourse(): [Value] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLecturePrecourse-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLecturePrecourse(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
