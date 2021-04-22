/* eslint-disable consistent-return */

import { useEffect, useState } from 'react';
import { countByFeedbackId } from '../api/feedbackApi';
import { onLectureFeedbackContent } from '../store/LectureFeedbackStore';
import LectureFeedbackContent from '../viewModel/LectureFeedbackContent';

type Value = LectureFeedbackContent | undefined;

let subscriberIdRef = 0;
export function useLectureFeedbackContent(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureFeedbackContent-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureFeedbackContent(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
