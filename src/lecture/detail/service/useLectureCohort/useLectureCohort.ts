import { onLectureWebpage } from 'lecture/detail/store/LectureWebpageStore';
import LectureWebpage from 'lecture/detail/viewModel/LectureWebpage';
/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';
import { useLectureRouterParams } from '../useLectureRouterParams';
import { getCohortFromCube } from './utility/getCohortFromCube';

type Value = LectureWebpage | undefined;

let subscriberIdRef = 0;
export function useLectureCohort(): [Value] {
  const params = useLectureRouterParams();
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureWebpage-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureWebpage(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  useEffect(() => {
    if (params === undefined) {
      return;
    }
    getCohortFromCube(params);
  }, [params]);

  return [value];
}
