import { onLectureWebpage } from 'lecture/detail/store/LectureWebpageStore';
import LectureWebpage from 'lecture/detail/viewModel/LectureWebpage';
/* eslint-disable consistent-return */

import { useEffect, useState } from 'react';
import { useLectureParams } from '../../store/LectureParamsStore';
import { getWebpageFromCube } from './utility/getWebpageFromCube';

type Value = LectureWebpage | undefined;

let subscriberIdRef = 0;
export function useLectureWebpage(): [Value] {
  const params = useLectureParams();
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
  }, [params?.cubeId]);

  return [value];
}
