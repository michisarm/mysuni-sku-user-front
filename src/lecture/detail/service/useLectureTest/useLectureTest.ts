/* eslint-disable consistent-return */

import { useEffect, useState } from 'react';
import { onLectureTestItem } from '../../store/LectureTestStore';
import { LectureTestItem } from '../../viewModel/LectureTest';

type TestValue = LectureTestItem | undefined;

let subscriberIdRef = 0;
export function useLectureTest(): [TestValue] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [testValue, setTestValue] = useState<TestValue>();

  useEffect(() => {
    const next = `useLectureTest-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTestItem(next => {
      setTestValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [testValue];
}
