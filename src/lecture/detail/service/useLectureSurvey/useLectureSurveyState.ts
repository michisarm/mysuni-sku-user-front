/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';
import { onLectureSurveyState } from '../../store/LectureSurveyStore';
import LectureSurveyState from '../../viewModel/LectureSurveyState';

type Value = LectureSurveyState | undefined;

let subscriberIdRef = 0;
export function useLectureSurveyState(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureSurveyState-${++subscriberIdRef}`;
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
