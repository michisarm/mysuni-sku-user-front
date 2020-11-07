import { onLectureRelations } from '../../store/LectureOverviewStore';
import LectureRelations from '../../viewModel/LectureOverview/LectureRelations';
/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';

type Value = LectureRelations | undefined;

let subscriberIdRef = 0;
export function useLectureRelations(): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureRelations-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureRelations(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
