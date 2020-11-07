/**
 * http://localhost:3000/api/action-log-collector/events/study
 * http://localhost:3000/api/lecture/students/flow
 */

import { onLectureWebpage } from 'lecture/detail/store/LectureWebpageStore';
import LectureWebpage from 'lecture/detail/viewModel/LectureWebpage';
/* eslint-disable consistent-return */

import { useEffect, useRef, useState } from 'react';
import { useLectureRouterParams } from '../useLectureRouterParams';
import { getWebpageFromCube } from './utility/getWebpageFromCube';

type Value = LectureWebpage | undefined;

let subscriberIdRef = 0;
export function useLectureWebpage(): [Value] {
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
    getWebpageFromCube(params);
  }, [params]);

  return [value];
}
