/* eslint-disable consistent-return */
/* eslint-disable prefer-arrow-callback */

import { useEffect, useRef, useState } from 'react';
import { cacheableFindPersonalCube } from '../../api/mPersonalCubeApi';
import {
  onLectureCubeType,
  setLectureCubeType,
} from '../../store/LectureCubeTypeStore';
import LectureCubeType from '../../viewModel/LectureCubeType';

type Value = LectureCubeType | undefined;

let subscriberIdRef = 0;
export function useLectureCubeType(cubeId?: string): [Value] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureCubeType-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureCubeType(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  useEffect(() => {
    if (cubeId === undefined) {
      return;
    }
    cacheableFindPersonalCube(cubeId).then(function(personalCube) {
      if (
        personalCube !== undefined &&
        personalCube !== null &&
        (personalCube as unknown) !== ''
      ) {
        setLectureCubeType({
          type: personalCube.contents.type,
        });
      }
    });
  }, [cubeId, subscriberId]);

  return [value];
}
