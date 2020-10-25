/* eslint-disable consistent-return */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  onLectureStructure,
  setLectureStructure,
} from '../../store/LectureStructureStore';
import {
  LectureStructure,
  LectureStructureCourseItemParams,
  LectureStructureCubeItemParams,
} from '../../viewModel/LectureStructure';
import { getCourseLectureStructure } from './utility/getCourseLectureStructure';
import { getCubeLectureStructure } from './utility/getCubeLectureStructure';

type Value = LectureStructure | undefined;

export function useLectureStructure(): [Value] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();
  const params = useParams<
    LectureStructureCourseItemParams & LectureStructureCubeItemParams
  >();

  const getCubeItem = useCallback((params: LectureStructureCubeItemParams) => {
    getCubeLectureStructure(params).then(lectureStructure => {
      setLectureStructure(lectureStructure);
    });
  }, []);

  const getCourseItem = useCallback(
    (params: LectureStructureCourseItemParams) => {
      getCourseLectureStructure(params).then(lectureStructure => {
        setLectureStructure(lectureStructure);
      });
    },
    []
  );

  useEffect(() => {
    if (params.cubeId !== undefined) {
      getCubeItem(params);
    } else {
      getCourseItem(params);
    }
  }, [params]);

  useEffect(() => {
    const next = `useLectureStructure-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureStructure(next => {
      setValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
