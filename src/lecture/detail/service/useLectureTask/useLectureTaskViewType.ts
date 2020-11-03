import { onLectureTags } from '../../store/LectureOverviewStore';
import LectureTags from '../../viewModel/LectureOverview/LectureTags';
/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';
import LectureTaskViewType from 'lecture/detail/viewModel/LectureTaskViewType';
import { onLectureTaskViewType } from 'lecture/detail/store/LectureTaskStore';

type Value = string | undefined;

export function useLectureTaskViewType(): [Value] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureTaskViewType-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTaskViewType(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
