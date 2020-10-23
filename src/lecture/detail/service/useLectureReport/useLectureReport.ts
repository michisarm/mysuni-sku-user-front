/* eslint-disable consistent-return */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onLectureTest, setLectureTest } from '../../store/LectureTestStore';
import {
  LectureTest,
  LectureStructureCourseItemParams,
  LectureStructureCubeItemParams,
} from '../../viewModel/LectureTest';
import { getCourseLectureStructure } from './utility/getCourseLectureStructure';
import { getCubeLectureReport } from './utility/getCubeLectureReport';

type Value = LectureTest | undefined;

export function useLectureTest(): [Value] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [value, setValue] = useState<Value>();
  const params = useParams<
    LectureStructureCourseItemParams & LectureStructureCubeItemParams
  >();

  const getCubeItem = useCallback((params: LectureStructureCubeItemParams) => {
    // getCubeLectureTest(params).then(lectureTest => {
    //   setLectureTest(lectureTest);
    // });
    // getCubeLectureReport(params).then(lectureTest => {
    //   setLectureTest(lectureTest);
    // });
  }, []);

  const getCourseItem = useCallback(
    (params: LectureStructureCubeItemParams) => {
      getCubeLectureReport(params).then(lectureTest => {
        setLectureTest(lectureTest);
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
    const next = `useLectureTest-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onLectureTest(next => {
      setValue(next);
      console.log('LectureTest', next);
    }, subscriberId);
  }, [subscriberId]);

  return [value];
}
