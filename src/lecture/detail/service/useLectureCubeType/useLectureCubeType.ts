/* eslint-disable consistent-return */
/* eslint-disable prefer-arrow-callback */

import { useEffect, useRef, useState } from 'react';
import { findPersonalCube } from '../../api/mPersonalCubeApi';
import {
  onLectureCubeType,
  setLectureCubeType,
} from '../../store/LectureCubeTypeStore';
import LectureCubeType from '../../viewModel/LectureCubeType';

type Value = LectureCubeType | undefined;

export function useLectureCubeType(cubeId?: string): [Value] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();

  useEffect(() => {
    const next = `useLectureCubeType-${++subscriberIdRef.current}`;
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
    debugger;
    if (cubeId === undefined) {
      return;
    }
    findPersonalCube(cubeId).then(function(personalCube) {
      if (personalCube !== undefined) {
        setLectureCubeType({
          type: personalCube.contents.type,
        });
      }
    });
  }, [cubeId, subscriberId]);

  return [value];
}
