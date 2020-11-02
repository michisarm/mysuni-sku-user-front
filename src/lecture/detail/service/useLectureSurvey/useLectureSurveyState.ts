/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';
import { onLectureSurveyState } from '../../store/LectureSurveyStore';
import LectureSurveyState from '../../viewModel/LectureSurveyState';

type Value = LectureSurveyState | undefined;

export function useLectureSurveyState(): [Value] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureSurveyState-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureSurveyState(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
