/* eslint-disable consistent-return */

import { useEffect, useState } from 'react';
import { onLectureTestAnswerItem } from '../../store/LectureTestStore';
import { LectureTestAnswerItem } from '../../viewModel/LectureTest';

type AnswerValue = LectureTestAnswerItem | undefined;

let subscriberIdRef = 0;
export function useLectureTestAnswer(): [AnswerValue] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [answerValue, setAnswerValue] = useState<AnswerValue>();

  useEffect(() => {
    const next = `useLectureTestAnswer-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTestAnswerItem(next => {
      setAnswerValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [answerValue];
}
