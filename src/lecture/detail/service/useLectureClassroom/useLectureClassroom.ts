/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';
import { onLectureClassroom } from '../../store/LectureClassroomStore';
import LectureClassroom from '../../viewModel/LectureClassroom';
import { useLectureRouterParams } from '../useLectureRouterParams';
import { getClassroomFromCube } from './utility/getClassroomFromCube';

type Value = LectureClassroom | undefined;

export function useLectureClassroom(notRequest?: boolean): [Value] {
  const params = useLectureRouterParams();
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureClassroom-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureClassroom(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  useEffect(() => {
    if (notRequest === true) {
      return;
    }
    if (params === undefined) {
      return;
    }
    getClassroomFromCube(params);
  }, [params]);

  return [value];
}
