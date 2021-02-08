/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';
import { onLectureSurveyAnswerSummary } from '../../store/LectureSurveyStore';
import LectureSurveyAnswerSummary from 'lecture/detail/viewModel/LectureSurveyAnswerSummary';

type Value = LectureSurveyAnswerSummary | undefined;

let subscriberIdRef = 0;
export function useLectureSurveyAnswerSummary(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureSurveyAnswerSummary-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureSurveyAnswerSummary(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
