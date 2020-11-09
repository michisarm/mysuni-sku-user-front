import { onLecturePrecourse } from '../../store/LectureOverviewStore';
import LecturePrecourse from '../../viewModel/LectureOverview/LecturePrecourse';
/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';

type Value = LecturePrecourse | undefined;

let subscriberIdRef = 0;
export function useLecturePrecourse(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLecturePrecourse-${++subscriberIdRef}`;
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
