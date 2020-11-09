import { onLectureFile } from 'lecture/detail/store/LectureOverviewStore';
import LectureFile from 'lecture/detail/viewModel/LectureOverview/LectureFile';
/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';

type Value = LectureFile | undefined;
let subscriberIdRef = 0;
export function useLectureFile(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureFile-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureFile(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
