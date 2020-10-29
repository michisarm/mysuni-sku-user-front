/**
 * http://localhost:3000/api/action-log-collector/events/study
 * http://localhost:3000/api/lecture/students/flow
 */

import {
  onLectureState,
  setLectureState,
} from 'lecture/detail/store/LectureStateStore';
import LectureState from 'lecture/detail/viewModel/LectureState';
/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';
import { useLectureRouterParams } from '../useLectureRouterParams';
import { getStateFromCube } from './utility/getStateFromCube';

type Value = LectureState | undefined;

export function useLectureState(): [Value] {
  const params = useLectureRouterParams();
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureState-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureState(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  useEffect(() => {
    if (params === undefined) {
      return;
    }
    getStateFromCube(params);
  }, [params]);

  return [value];
}
