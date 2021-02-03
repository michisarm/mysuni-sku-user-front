/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';
import { onLectureSurveySummary } from '../../store/LectureSurveyStore';
import LectureSurveySummary from 'lecture/detail/viewModel/LectureSurveySummary';

type Value = LectureSurveySummary | undefined;

let subscriberIdRef = 0;
export function useLectureSurveySummary(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureSurveySummary-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureSurveySummary(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
