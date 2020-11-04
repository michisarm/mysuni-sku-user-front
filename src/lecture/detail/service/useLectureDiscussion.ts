/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';
import { onLectureDiscussion } from '../store/LectureDiscussionStore';
import LectureDiscussion from '../viewModel/LectureDiscussion';

type Value = LectureDiscussion | undefined;

export function useLectureDiscussion(): [Value] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureDiscussion-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureDiscussion(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
