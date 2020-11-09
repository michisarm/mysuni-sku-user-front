/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';
import { onLectureSurvey } from '../../store/LectureSurveyStore';
import LectureSurvey from '../../viewModel/LectureSurvey';

type Value = LectureSurvey | undefined;

let subscriberIdRef = 0;
export function useLectureSurvey(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureSurvey-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureSurvey(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
