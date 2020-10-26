import { onLectureTags } from '../../store/LectureOverviewStore';
import LectureTags from '../../viewModel/LectureOverview/LectureTags';
/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';

type Value = LectureTags | undefined;

export function useLectureTags(): [Value] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureTags-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTags(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
