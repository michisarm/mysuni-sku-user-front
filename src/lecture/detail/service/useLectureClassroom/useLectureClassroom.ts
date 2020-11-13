/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';
import { onLectureClassroom } from '../../store/LectureClassroomStore';
import LectureClassroom from '../../viewModel/LectureClassroom';
import { useLectureRouterParams } from '../useLectureRouterParams';
import { getClassroomFromCube } from './utility/getClassroomFromCube';

type Value = LectureClassroom | undefined;

let subscriberIdRef = 0;
export function useLectureClassroom(notRequest?: boolean): [Value] {
  const params = useLectureRouterParams();
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureClassroom-${++subscriberIdRef}`;
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
