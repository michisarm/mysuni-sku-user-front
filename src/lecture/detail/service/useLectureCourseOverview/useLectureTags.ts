import { onLectureTags } from '../../store/LectureOverviewStore';
import LectureTags from '../../viewModel/LectureOverview/LectureTags';
/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';

type Value = LectureTags | undefined;

let subscriberIdRef = 0;
export function useLectureTags(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureTags-${++subscriberIdRef}`;
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
