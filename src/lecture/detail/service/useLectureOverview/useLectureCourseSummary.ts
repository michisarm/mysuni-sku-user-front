import LectureSummary from 'lecture/detail/viewModel/LectureOverview/LectureSummary';
/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';
import { onLectureCourseSummary } from '../../store/LectureOverviewStore';
import LectureCourseSummary from '../../viewModel/LectureOverview/LectureCourseSummary';

type Value = LectureCourseSummary | undefined;

export function useLectureCourseSummary(): [Value] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureCourseSummary-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureCourseSummary(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
